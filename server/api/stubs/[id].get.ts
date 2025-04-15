import { eq } from "drizzle-orm"
import { stubs } from "~/server/db/schema"

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id") ?? "")
  const stub = await db().query.stubs.findFirst({
    where: eq(stubs.id, id)
  })
  if (stub == undefined) {
    throw new Error("Stub not found")
  }
  return stub
})
