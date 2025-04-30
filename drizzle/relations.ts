import { relations } from "drizzle-orm/relations";
import { stories, stubsToStories, posts, challenges, challengesTaggedUsers, users, newStubsToStories } from "./schema";

export const stubsToStoriesRelations = relations(stubsToStories, ({one}) => ({
	story: one(stories, {
		fields: [stubsToStories.storyId],
		references: [stories.id]
	}),
	post: one(posts, {
		fields: [stubsToStories.stubId],
		references: [posts.id]
	}),
}));

export const storiesRelations = relations(stories, ({many}) => ({
	stubsToStories: many(stubsToStories),
	newStubsToStories: many(newStubsToStories),
}));

export const postsRelations = relations(posts, ({many}) => ({
	stubsToStories: many(stubsToStories),
	newStubsToStories: many(newStubsToStories),
}));

export const challengesTaggedUsersRelations = relations(challengesTaggedUsers, ({one}) => ({
	challenge: one(challenges, {
		fields: [challengesTaggedUsers.challengeId],
		references: [challenges.id]
	}),
	user: one(users, {
		fields: [challengesTaggedUsers.userId],
		references: [users.id]
	}),
}));

export const challengesRelations = relations(challenges, ({many}) => ({
	challengesTaggedUsers: many(challengesTaggedUsers),
}));

export const usersRelations = relations(users, ({many}) => ({
	challengesTaggedUsers: many(challengesTaggedUsers),
}));

export const newStubsToStoriesRelations = relations(newStubsToStories, ({one}) => ({
	story: one(stories, {
		fields: [newStubsToStories.storyId],
		references: [stories.id]
	}),
	post: one(posts, {
		fields: [newStubsToStories.postId],
		references: [posts.id]
	}),
}));