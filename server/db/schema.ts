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
  stubs: many(stubs),
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
  challengeTaggedUsers: User[],
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
  stubsToStories: many(stubsToStories)
}))

export const stubs = sqliteTable("stubs", {
  id: int().primaryKey({autoIncrement: true}),
  authorId: int().notNull(),
  name: text().notNull(),
  text: text().notNull()
})

export type Stub = typeof stubs.$inferSelect
export type StubInsert = typeof stubs.$inferInsert

export const stubsRelations = relations(stubs, ({many, one}) => ({
  stubsToStories: many(stubsToStories),
  author: one(users, {
    fields: [stubs.authorId],
    references: [users.id]
  })
}))

export const stubsToStories = sqliteTable(
  'stubs_to_stories',
  {
    stubId: int()
      .notNull()
      .references(() => stubs.id),
    storyId: int()
      .notNull()
      .references(() => stories.id)
  },
  (t) => [
    primaryKey({columns: [t.stubId, t.storyId]})
  ]
)

export const stubsToStoriesRelations = relations(stubsToStories, ({one}) => ({
  stub: one(stubs, {
    fields: [stubsToStories.stubId],
    references: [stubs.id]
  }),
  story: one(stories, {
    fields: [stubsToStories.storyId],
    references: [stories.id]
  })
}))
