import { db } from '../utils/drizzle'

export default defineEventHandler(async (event) => {
  const { mine }= getQuery<{mine:boolean}>(event) 
  const {user} = await getUserSession(event)
  
  if (mine) {
    if (user == null){ throw new Error("Unauthenticated") }
    return await findMine(user.id)
  } else {
    return await findAll()
  }
})

async function findMine(userId: number) {
  return await db().query.challenges.findMany({
    with: {
      challengeTaggedUsers: {
        with: {
          user: true
        }
      },
      challenger: true
    },
    where: (challenge, {eq}) => eq(challenge.challengerId, userId)
  })
}

async function findAll() {
  return await db().query.challenges.findMany({
    with: {
      challengeTaggedUsers: {
        with: {
          user: true
        }
      },
      challenger: true
    }
  })
}
