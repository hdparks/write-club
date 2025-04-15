export default function(promptId: number, userIds: number[]) {
  console.log("tagging", userIds)
  return $fetch(`/api/challenges/${promptId}/tagged-users`, {
    method: "POST",
    body: userIds
  })
}
