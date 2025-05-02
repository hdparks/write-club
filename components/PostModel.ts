import type { Post, User } from "~/server/db/schema"

export type PostModel = Post & {
  author: User
}
