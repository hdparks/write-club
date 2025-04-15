
import { getTableColumns, eq } from 'drizzle-orm'
import { db } from '../utils/drizzle'
import { users, challenges } from '../db/schema'
import { challengeTaggedUsers } from '../db/schema'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
})
