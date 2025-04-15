import { eq } from "drizzle-orm"
import { ChallengeTaggedUserInsert, challengeTaggedUsers } from "~/server/db/schema"

export default defineEventHandler(async (event) => {
  const userIds = (await readBody(event)) as number[]
  const challengeId = parseInt(getRouterParam(event, "id") ?? "0")
  console.log("tagging users: ", userIds, "on challenge", challengeId)
  // remove previous tagged users
  await db().delete(challengeTaggedUsers).where(eq(challengeTaggedUsers.challengeId, challengeId))
  const newChallengeUserTags: ChallengeTaggedUserInsert[] = userIds.map(uid => ({
    userId: uid,
    challengeId: challengeId
  }))
  if (newChallengeUserTags?.length > 0){
    await db().insert(challengeTaggedUsers).values(newChallengeUserTags)
  }
})
