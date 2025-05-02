export default defineEventHandler(async (event) => {
  const {user} = await getUserSession(event)
  return await db().query.challenges.findMany({
    with: {
      challengeTaggedUsers: {
        with: {
          user: true
        }
      },
      challenger: true,
      challengesPosts: {
        with: {
          post: {
            with: {
              author: true
            }
          }
        }
      }
    },
    where: (challenge, {eq}) => eq(challenge.challengerId, user!.id),
    orderBy: (challenge, {desc}) => desc(challenge.id)
  })
})
