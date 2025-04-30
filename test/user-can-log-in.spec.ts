
import { createPage, setup, type NuxtPage } from "@nuxt/test-utils";
import { afterEach } from "vitest";
import { vi } from "vitest";
import { describe, expect, it } from "vitest";
import type { User } from "~/server/db/schema";
import { mockUseUserSession } from "./utils/useUserSession";
import { setUser } from "./utils/useUserSession";


describe("User can log in", async () => {
  await setup({})

  const useUserSessionMock = mockUseUserSession()

  function setMockUser(user: User) {
    setUser(useUserSessionMock, user)
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("shows google login button when not logged in", async () => {
    const page = await createPage("/")
    expect(await page.getByTestId("google-sign-in").isVisible()).toBe(true)
  })

  it("hides google login button once logged in", async () => {
    setMockUser({id: 1, name: "Hayden", email: "", picture: null})
    const page = await createPage("/")
    expect(() => page.getByTestId("google-sign-in")).toThrowError()
  })
})
