import { eq } from "drizzle-orm"
import { users } from "~/server/db/schema"

export default defineOAuthDiscordEventHandler({
  config: {scope: ['email', 'identify']},
  async onSuccess(event, {user, tokens}) {
    console.log(event, user)
    let userRecord = await db().query.users.findFirst({
      where: eq(users.email, user.email)
    })
    if (userRecord == null) {
      console.log("user record not found, creating")
      userRecord = (await db().insert(users).values({
        name: user.name,
        email: user.email
      }).returning())[0]
      console.log(userRecord)
    }
    await setUserSession(event, {
      user: {
        name: user.name,
        email: user.email,
        pictureURL: user.picture,
        id: userRecord.id
      }, secure: {
        testing: '123'
      },
      loggedInAt: new Date()
    })
    return sendRedirect(event, '/dashboard')
  },
  onError(event, error) {
    console.error("Discord OAuth error:", error)
    return sendRedirect(event, '/')
  }
})
