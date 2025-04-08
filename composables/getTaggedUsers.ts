export default function(id: number) {
  return $fetch(`/api/prompts/${id}/tagged-users`)
}
