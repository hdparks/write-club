<template>
  <UApp>
  <AuthState v-slot="{ loggedIn, user }">
    <div v-if="loggedIn">
      <UDropdownMenu :items="userDropdownItems">
        <UAvatar icon="i-lucide-user" :src="user?.pictureURL" ></UAvatar>
      </UDropdownMenu>
      {{user?.name}}
    </div>
    <div v-else>Log in with <UBadge @click="openInPopup('/auth/google')"><UIcon name="i-uil-google"></UIcon> Google</UBadge></div>
  </AuthState>
    <NuxtPage/>
  </UApp>
</template>
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';


const { clear, openInPopup } = useUserSession()

const userDropdownItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: "Logout",
      icon: 'i-lucide-log-out',
      onSelect: clear
    }
  ]
])
</script>
