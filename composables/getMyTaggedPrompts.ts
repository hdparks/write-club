
import type { WritingPrompt } from "~/server/db/schema";

export default async function(): Promise<WritingPrompt[]> {
  return $fetch("/api/prompts?imTagged=true")
}
