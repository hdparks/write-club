import { describe, it, vi, test } from 'vitest'
import { setup, createPage } from '@nuxt/test-utils/e2e'
import { afterEach } from 'vitest'
import { mockUseUserSession, setUser } from './utils/useUserSession'
import type { User } from '~/server/db/schema'

describe("User can challenge friends", async () => {
  await setup({})
  
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const useUserSessionMock = mockUseUserSession()
  const user: User = {
    id: 1,
    name: "hayden",
    email: "asdf",
    picture: null
  }
     
  it("shows a new challenge in user's oubox", async() => {
    // given i am a logged-in user
    setUser(useUserSessionMock, user)
    const page = await createPage("/outbox")
    expect(await page.getByTestId(''))
  })
})
