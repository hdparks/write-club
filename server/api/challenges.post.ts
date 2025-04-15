
import { ChallengeInsert, challenges } from '../db/schema'
import { db } from '../utils/drizzle'

export default defineEventHandler(async (event) => {
  const body: ChallengeInsert = await readBody(event)
  const insertResult = await db().insert(challenges).values(body).returning()
  return insertResult
})
