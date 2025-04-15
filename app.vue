<template>
  <UApp>
    <div class="w-full grid grid-cols-8">
      <AuthState v-slot="{ loggedIn, user }">
        <div class="col-start-7 col-span-2 p-4 text-right">
          <div v-if="loggedIn">
            <UDropdownMenu :items="userDropdownItems">
              <UAvatar icon="i-lucide-user" :src="user?.pictureURL" ></UAvatar>
            </UDropdownMenu>
            {{user?.name}}
          </div>
          <div v-else>Log in with <UBadge @click="openInPopup('/auth/google')"><UIcon name="i-uil-google"></UIcon> Google</UBadge></div>
        </div>
      </AuthState>
    </div>
    <div class="grid grid-cols-6">
      <div class="col-start-1">
        <UNavigationMenu orientation="vertical" :items="navigationItems"></UNavigationMenu>
      </div>
      <NuxtPage class="col-start-2 col-end-6 max-w-150 place-self-center w-full"/>
    </div>
  </UApp>
</template>
<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'
const { clear, openInPopup, session } = useUserSession()

const userDropdownItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: "Logout",
      icon: 'i-lucide-log-out',
      onSelect: clear
    }
  ]
])

const route = useRoute()
const navigationItems = computed<NavigationMenuItem[][]>(() => {
  const sections = [
    [{
      label: "Home",
      icon: "i-lucide:home",
      active: route.path == "/",
      onSelect: async () => await navigateTo("/")
    },{
      label: "Challenges",
      icon: "i-lucide:inbox",
      active: route.path == "/challenges",
      onSelect: async() => await navigateTo("/challenges")
    },{
      label: "Posts",
      icon: "i-lucide:file-plus-2",
      active: route.path == "/stub",
      onSelect: async () => await navigateTo("/stub")
    }]]
  return sections
})
</script>
