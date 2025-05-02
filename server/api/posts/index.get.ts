export default defineEventHandler(async (event) => {
  const {user} = await getUserSession(event)
  const result = await db().query.posts.findMany({
    with: {
      author: true
    },
    where: (post, {eq}) => eq(post.authorId, user!.id)
  }) 
  return result
}) 
