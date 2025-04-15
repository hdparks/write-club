export default function(id: number) {
  return $fetch(`/api/challenges/${id}/tagged-users`)
}
