import type { UserSessionComposable } from "#auth-utils"
import { mockNuxtImport } from "@nuxt/test-utils/runtime"
import type { Mock } from "vitest"
import { vi } from "vitest"
import type { User } from "~/server/db/schema"


export function mockUseUserSession() {
  const { useUserSessionMock } = vi.hoisted(() => {
    return {
       useUserSessionMock: vi.fn(() => {
         return { 
            user: computed(() => null),
            loggedIn: computed(() => false),
            // add additional fields here as become applicable
         } as Partial<UserSessionComposable>
       })
    }
  })
  mockNuxtImport('useUserSession', () => useUserSessionMock)

  return useUserSessionMock
}

export function setUser(useUserSessionMock: Mock<() => Partial<UserSessionComposable>>, user: User) {
  useUserSessionMock.mockImplementation(() => {
    return {
      user: computed(() => user),
      loggedIn: computed(() => true),
    } as Partial<UserSessionComposable>
  })
}
