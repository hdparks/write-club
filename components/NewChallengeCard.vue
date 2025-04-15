<template>
  <UCard :ui="{footer: 'text-right'}" >
    <div>
      <div class="grid grid-cols-3">
        <label>Description</label>
        <UInput class="col-span-2" v-model="challengeText" placeholder="Write a story about a dinosaur who..."></UInput>
      </div>
      <USeparator class="my-3"></USeparator>
      <div class="grid grid-cols-3">
        <label>Challengers</label>
        <USelectMenu multiple :items="userItems" v-model="taggedUsers" class="w-50" placeholder="Challenge your friends!"></USelectMenu>
      </div>
      <USeparator class="my-3"></USeparator>
      <div class="text-right">
        <UButton @click="emit('done')" color="neutral" variant="soft" class="mr-2">Cancel</UButton>
        <UButton @click="send">Send</UButton>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';
import type { Challenge, User } from '~/server/db/schema';

const challengeText = ref<string>('')
const users = ref<User[]>(await getUsers())
const userItems = computed(()=> users.value?.map<SelectItem & {user:User}>(u => ({
  label: u.name,
  avater: {src: u.picture ?? undefined, icon: 'i-lucide:user'}, 
  user: u
})))
const taggedUsers = ref<SelectItem & {user:User}[]>([])

const {user} = useUserSession() 
async function send(){

  const userId = user.value?.id
  if (userId == null) {
    useToast().add({id: "loginToPublish", title: "Please Log In to Publish Challenge"})
    throw new Error("Log In to publish") 
  }
  const challenge = await createChallenge(challengeText.value, userId)
  await setTaggedUsers(challenge[0].id, taggedUsers.value.map(u => u.user.id))

  emit('done')
}

const emit = defineEmits<{
  done: []
}>()

</script>
