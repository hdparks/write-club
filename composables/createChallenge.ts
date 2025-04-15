import type { ChallengeInsert } from "~/server/db/schema"

export default async function(name: string, challengerId: number){
  const challenge: ChallengeInsert = {
    challengerId: challengerId,
    name: name
  }
  return await $fetch("/api/challenges", {
    method: "POST",
    body: challenge
  })
} 
