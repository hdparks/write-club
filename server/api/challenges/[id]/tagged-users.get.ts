

import { eq, getTableColumns } from "drizzle-orm"
import { users, challengeTaggedUsers } from "~/server/db/schema"

export default defineEventHandler((event) => {
  const promptId = getRouterParam(event, "id")
    return db()
      .select({...getTableColumns(users)})
      .from(users)
      .innerJoin(challengeTaggedUsers, eq(users.id, challengeTaggedUsers.userId))
      .where(eq(challengeTaggedUsers.challengeId, promptId))
      
})
