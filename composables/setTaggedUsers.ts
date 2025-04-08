export default function(promptId: number, userIds: number[]) {
  return $fetch(`/api/prompts/${promptId}/tagged-users`, {
    method: "POST",
    body: userIds
  })
}
