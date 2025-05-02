import type { Challenge } from "~/server/db/schema"
import type { User } from "~/server/db/schema"
import type { Post } from "~/server/db/schema"

export type ChallengeCardModel = Challenge & {
  challengeTaggedUsers: {
    user: User
  }[],
  challengesPosts: {
    post: Post & {
      author: User
    }
  }[],
  challenger: User
}
