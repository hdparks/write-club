import { db } from '../utils/drizzle'

export default defineEventHandler(async (event) => {

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

})
