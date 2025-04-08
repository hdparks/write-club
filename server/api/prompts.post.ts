
import { WritingPromptInsert, writingPrompts } from '../db/schema'
import { db } from '../utils/drizzle'

export default defineEventHandler(async (event) => {
  const body: WritingPromptInsert = await readBody(event)
  console.log("inserting", body)
  const insertResult = await db().insert(writingPrompts).values(body).returning()
  console.log(insertResult)
  return
})
