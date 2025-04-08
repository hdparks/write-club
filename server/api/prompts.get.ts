import { getTableColumns, eq } from 'drizzle-orm'
import { db } from '../utils/drizzle'
import { users, writingPrompts } from '../db/schema'
import { writingPromptTaggedUsers } from '../db/schema'

export default defineEventHandler(async (event) => {

  console.log("getting prompts")
  const query = getQuery(event)
  console.log("query:", query)
  if (query.imTagged as boolean) {
    console.log("only getting tagged ones!")
    const {user}= await getUserSession(event)
    console.log(user)
    if (user == null) {
      throw new Error("User not found") 
    }
    return db().select({...getTableColumns(writingPrompts)})
               .from(writingPrompts)
               .innerJoin(writingPromptTaggedUsers, eq(writingPrompts.id, writingPromptTaggedUsers.promptId))
               .where(eq(writingPromptTaggedUsers.userId, user.id))
  }
  else {
    return db().query.writingPrompts.findMany()
  }
})
