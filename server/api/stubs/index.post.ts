import { StubInsert, stubs } from "~/server/db/schema"

export default defineEventHandler(async (event) => {
  const body: StubInsert = await readBody(event)
  const insertResult = await db().insert(stubs).values(body).returning()
  return insertResult
})
