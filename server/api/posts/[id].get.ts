import { eq } from "drizzle-orm"
import { posts } from "~/server/db/schema"

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id") ?? "")
  const post = await db().query.posts.findFirst({
    where: eq(posts.id, id)
  })
  if (post == undefined) {
    throw new Error("Post not found")
  }
  return post
})
