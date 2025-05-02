export default defineEventHandler(async (event) => {
  const {user} = await getUserSession(event)
  const result = await db().transaction(async (tx) => {
    const userChallenges = await tx.query.challengeTaggedUsers.findMany({
      columns: {
        challengeId: true
      },
      where: (ctu, {eq}) => eq(ctu.userId, user!.id)
    })
    const result = await tx.query.challenges.findMany({
      with: {
        challengeTaggedUsers: {
          with: {
            user: true
          }
        },
        challengesPosts: {
          with: {
            post: {
              with: {
                author: true
              }
            } 
          }
        },
        challenger: true
      },
      where: (challenge, {inArray}) => inArray(challenge.id, userChallenges.map(d => d.challengeId)),
      orderBy: (challenge, {desc}) => desc(challenge.id),
    })
    return result
  })
  console.log(result)
  return result
})
