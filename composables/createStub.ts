import type { Stub, StubInsert } from "~/server/db/schema";

export default async function(name: string, text: string) {
  const stub : StubInsert = {
    name: name,
    text: text
  }
  const result = await $fetch<Stub>("/api/stubs", {
    method: "POST",
    body: stub
  })

  if (result.id) {
    await navigateTo(`/stubs/${result.id}`)
  }
  return result
}
