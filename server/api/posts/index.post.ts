
import { challengesPosts, type PostInsert, type ChallengePost, posts } from "~/server/db/schema"

export default defineEventHandler(async (event) => {
  const body: PostInsert & { challengeIds: number[] } = await readBody(event)
  const result = await db().transaction(async (tx) => {
    const insertResult = await tx.insert(posts).values(body).returning()
    const challengeLinks = body.challengeIds.map<ChallengePost>(id => ({
      postId: insertResult[0].id,
      challengeId: id
    }))
    await tx.insert(challengesPosts).values(challengeLinks)
    return insertResult[0]
  })
  return result
})
