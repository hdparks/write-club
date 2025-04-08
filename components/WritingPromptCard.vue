<template>
	<UCard>
    <div>
      {{prompt.name}}
    </div>
    <div>
      <USelectMenu class="w-60" multiple :items="userItems" v-model="taggedUsers" ></USelectMenu> 
    </div>
	</UCard>
</template>
<script setup lang="ts">
import type { AvatarProps, SelectMenuItem } from '@nuxt/ui';
import type { WritingPrompt, User } from '~/server/db/schema';

const props = defineProps<{prompt: WritingPrompt}>()

const users = ref<User[]>(await getUsers())
const userItems = computed(() => users.value?.map<SelectMenuItem & {user: User}>(u => ({label: u.name, avatar: {src: u.picture ?? undefined, icon: 'i-lucide-user'}, user: u})) ?? [])
const taggedUsers = ref<SelectMenuItem & {user: User}[]>([])
onMounted(async() => {
  const dbTaggedUsers = await getTaggedUsers(props.prompt.id)
  const dbTaggedUserIds = dbTaggedUsers.map(u => u.id)
  taggedUsers.value = userItems.value.filter(u => dbTaggedUserIds.includes(u.user.id))
})

watch(taggedUsers, () => {
  setTaggedUsers(props.prompt.id, taggedUsers.value.map(u => u.user.id))
})

</script>

