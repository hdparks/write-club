import { eq } from "drizzle-orm"
import { WritingPromptInsert, WritingPromptTaggedUserInsert, writingPromptTaggedUsers } from "~/server/db/schema"

export default defineEventHandler(async (event) => {
  const userIds = (await readBody(event)) as number[]
  const promptId = parseInt(getRouterParam(event, "id") ?? "0")
  // remove previous tagged users
  await db().delete(writingPromptTaggedUsers).where(eq(writingPromptTaggedUsers.promptId, promptId))
  const newPromptUserTags: WritingPromptTaggedUserInsert[] = userIds.map(uid => ({
    userId: uid,
    promptId: promptId
  }))
  if (newPromptUserTags?.length > 0){
    await db().insert(writingPromptTaggedUsers).values(newPromptUserTags)
  }
})
