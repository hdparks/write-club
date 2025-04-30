import { relations } from "drizzle-orm";
import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  picture: text(),
});
export type User = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert

export const usersRelations = relations(users, ({many}) => ({
  challengeTaggedUsers: many(challengeTaggedUsers),
  posts: many(posts),
  challenges: many(challenges)
}))

export const challenges = sqliteTable("challenges", {
  id: int().primaryKey({ autoIncrement: true }),
  challengerId: int().notNull(),
  name: text().notNull(),
})

export type Challenge = typeof challenges.$inferSelect
export type ChallengeInsert = typeof challenges.$inferInsert

export const challengeRelations = relations(challenges, ({many, one}) => ({
  challengeTaggedUsers: many(challengeTaggedUsers),
  challenger: one(users, {
    fields: [challenges.challengerId],
    references: [users.id]
  })
}))
export type ChallengeRelations = {
  challengeTaggedUsers: ChallengeTaggedUser[],
  challenger: User
}

export const challengeTaggedUsers = sqliteTable("challenges_tagged_users", {
  userId: int().references(() => users.id),
  challengeId: int().references(() => challenges.id),
},
  (t) => [primaryKey({columns: [t.userId, t.challengeId]})],
)

export type ChallengeTaggedUser = typeof challengeTaggedUsers.$inferSelect
export type ChallengeTaggedUserInsert = typeof challengeTaggedUsers.$inferInsert

export const challengeTaggedUsersRelations = relations(challengeTaggedUsers, ({one}) => ({
  user: one(users, {
    fields: [challengeTaggedUsers.userId],
    references: [users.id]
  }),
  challenge: one(challenges, {
    fields: [challengeTaggedUsers.challengeId],
    references: [challenges.id]
  })
}))

export const stories = sqliteTable("stories", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
})

export type Story = typeof stories.$inferSelect
export type StoryInsert = typeof stories.$inferInsert

export const storiesRelations = relations(stories, ({many}) => ({
  postsToStories: many(postsToStories)
}))

export const posts = sqliteTable("posts", {
  id: int().primaryKey({autoIncrement: true}),
  authorId: int().notNull(),
  name: text().notNull(),
  text: text().notNull()
})

export type Post = typeof posts.$inferSelect
export type PostInsert = typeof posts.$inferInsert

export const postsRelations = relations(posts, ({many, one}) => ({
  stubsToStories: many(postsToStories),
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  })
}))

export const postsToStories = sqliteTable(
  'posts_to_stories',
  {
    postId: int()
      .notNull()
      .references(() => posts.id),
    storyId: int()
      .notNull()
      .references(() => stories.id)
  },
  (t) => [
    primaryKey({columns: [t.postId, t.storyId]})
  ]
)

export const postsToStoriesRelations = relations(postsToStories, ({one}) => ({
  post: one(posts, {
    fields: [postsToStories.postId],
    references: [posts.id]
  }),
  story: one(stories, {
    fields: [postsToStories.storyId],
    references: [stories.id]
  })
}))
