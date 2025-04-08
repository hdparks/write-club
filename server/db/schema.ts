import { relations } from "drizzle-orm";
import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  picture: text()
});
export type User = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert

export const usersRelations = relations(users, ({many}) => ({
  writingPromptTaggedUsers: many(writingPromptTaggedUsers),
}))

export const writingPrompts = sqliteTable("writing_prompts", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});
export type WritingPrompt = typeof writingPrompts.$inferSelect
export type WritingPromptInsert = typeof writingPrompts.$inferInsert

export const writingPromptRelations = relations(writingPrompts, ({many}) => ({
  writingPromptTaggedUsers: many(writingPromptTaggedUsers),
}))

export const writingPromptTaggedUsers = sqliteTable("writing_prompt_tagged_users", {
  userId: int().references(() => users.id),
  promptId: int().references(() => writingPrompts.id),
},
  (t) => [primaryKey({columns: [t.userId, t.promptId]})],
)

export type WritingPromptTaggedUser = typeof writingPromptTaggedUsers.$inferSelect
export type WritingPromptTaggedUserInsert = typeof writingPromptTaggedUsers.$inferInsert

export const writingPromptTaggedUsersRelations = relations(writingPromptTaggedUsers, ({one}) => ({
  user: one(users, {
    fields: [writingPromptTaggedUsers.userId],
    references: [users.id]
  }),
  writingPrompt: one(writingPrompts, {
    fields: [writingPromptTaggedUsers.promptId],
    references: [writingPrompts.id]
  })
}))

export const stories = sqliteTable("stories", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
})

export type Story = typeof stories.$inferSelect
export type StoryInsert = typeof stories.$inferInsert

export const chapter = sqliteTable("chapter", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
})


