
export default defineEventHandler(async (event) => {
  return db().query.users.findMany()
})
