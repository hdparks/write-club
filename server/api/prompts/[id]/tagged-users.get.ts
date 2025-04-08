

import { eq, getTableColumns } from "drizzle-orm"
import { users, writingPromptTaggedUsers } from "~/server/db/schema"

export default defineEventHandler((event) => {
  const promptId = getRouterParam(event, "id")
    return db()
      .select({...getTableColumns(users)})
      .from(users)
      .innerJoin(writingPromptTaggedUsers, eq(users.id, writingPromptTaggedUsers.userId))
      .where(eq(writingPromptTaggedUsers.promptId, promptId))
      
})
