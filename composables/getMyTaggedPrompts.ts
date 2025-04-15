
import type { Challenge } from "~/server/db/schema";

export default async function(): Promise<Challenge[]> {
  return $fetch("/api/prompts?imTagged=true")
}
