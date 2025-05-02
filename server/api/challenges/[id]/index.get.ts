export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id") ?? "")
  
  const result = await db().query.challenges.findFirst({
    where: (challenge, {eq}) => eq(challenge.id, id),
    with: {
      challenger: true,
      challengeTaggedUsers: {
        with: {
          user:true
        }
      },
      challengesPosts: {
        with: {
          post: {
            with: {
              author: true
            }
          }
        },
        orderBy: (challengesPosts, {desc}) => desc(challengesPosts.postId)
      }
    }
  })
  console.log(id, result)
  return result
})
