import type { WritingPromptInsert } from "~/server/db/schema"

export default async function(name: string){
  console.log("creating prompt:", name)
  const prompt: WritingPromptInsert = {
    name: name
  }
  await $fetch("/api/prompts", {
    method: "POST",
    body: prompt
  })
} 
