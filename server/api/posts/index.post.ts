import { PostInsert, posts } from "~/server/db/schema"

export default defineEventHandler(async (event) => {
  const body: PostInsert = await readBody(event)
  const insertResult = await db().insert(posts).values(body).returning()
  return insertResult
})
