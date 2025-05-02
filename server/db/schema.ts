import { relations } from "drizzle-orm";
import { int, integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
  }),
  challengesPosts: many(challengesPosts)
}))
export type ChallengeRelations = {
  challengeTaggedUsers: (ChallengeTaggedUser & ChallengeTaggedUserRelations)[],
  challenger: User,
  challengesPosts: (ChallengePost & ChallengePostRelations)[]
}

export const challengeTaggedUsers = sqliteTable("challenges_tagged_users", {
  userId: int().notNull().references(() => users.id),
  challengeId: int().notNull().references(() => challenges.id),
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
export type ChallengeTaggedUserRelations = {
  user: User,
  challenge: Challenge
}

export const posts = sqliteTable("posts", {
  id: int().primaryKey({autoIncrement: true}),
  authorId: int().notNull(),
  name: text().notNull(),
  text: text().notNull()
})

export type Post = typeof posts.$inferSelect
export type PostInsert = typeof posts.$inferInsert

export const postsRelations = relations(posts, ({many, one}) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  }),
  postsChallenges: many(challengesPosts)
}))

export const challengesPosts = sqliteTable("challenges_posts", {
  postId: int().notNull().references(() => posts.id),
  challengeId: int().notNull().references(() => challenges.id)
}, (table) => [
  primaryKey({columns: [table.postId, table.challengeId], name: "challenges_posts_postId_challengeId_pk"})
]);

export type ChallengePost = typeof challengesPosts.$inferSelect
export type ChallengePostInsert = typeof challengesPosts.$inferInsert

export const challengesPostsRelations = relations(challengesPosts, ({one}) => ({
  post: one(posts, {
    fields: [challengesPosts.postId],
    references: [posts.id]
  }),
  challenge: one(challenges, {
    fields: [challengesPosts.challengeId],
    references: [challenges.id]
  })
}))

export type ChallengePostRelations = {
  post: Post
  challenge: Challenge
}
