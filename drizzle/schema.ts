import { relations } from "drizzle-orm";
import { sqliteTable, uniqueIndex, integer, text, primaryKey } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	email: text().notNull(),
	picture: text(),
},
(table) => [
	uniqueIndex("users_email_unique").on(table.email),
]);

export const posts = sqliteTable("posts", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	text: text().notNull(),
	authorId: integer().notNull(),
});

export const postsRelations = relations(posts, ({one,many}) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  }),
  challenges: many(postsChallenges)
}))

export const postsChallenges = sqliteTable("posts_challenges", {
  postId: integer().notNull().references(() => posts.id),
  challengeId: integer().notNull().references(() => challenges.id)
}, (table) => [
  primaryKey({columns: [table.postId, table.challengeId], name: "posts_challenges_postId_challengeId_pk"})
]);

export const postsChallengesRelations = relations(postsChallenges, ({one}) => ({
  post: one(posts, {
    fields: [postsChallenges.postId],
    references: [posts.id]
  }),
  challenge: one(challenges, {
    fields: [postsChallenges.challengeId],
    references: [challenges.id]
  })
}))

export const challenges = sqliteTable("challenges", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	challengerId: integer().notNull(),
	name: text().notNull(),
});

export const challengesRelations = relations(challenges, ({many}) => ({
  postsChallenges: many(postsChallenges)
}))

export const challengesTaggedUsers = sqliteTable("challenges_tagged_users", {
	userId: integer().references(() => users.id),
	challengeId: integer().references(() => challenges.id),
},
(table) => [
	primaryKey({ columns: [table.userId, table.challengeId], name: "challenges_tagged_users_userId_challengeId_pk"})
]);


