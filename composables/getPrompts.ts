import type { WritingPrompt } from "~/server/db/schema";

export default async function(): Promise<WritingPrompt[]> {
  return await $fetch("/api/prompts")
}
