import type { Post, PostInsert } from "~/server/db/schema";

export default async function(name: string, text: string, authorId: number) {
  const post : PostInsert = {
    authorId: authorId,
    name: name,
    text: text
  }
  const result = await $fetch<Post>("/api/posts", {
    method: "POST",
    body: post
  })

  if (result.id) {
    await navigateTo(`/posts/${result.id}`)
  }
  return result
}
