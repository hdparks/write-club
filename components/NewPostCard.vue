<template>
  <UCard :ui="{footer: 'text-right'}" class="w-full">
    <template #header>
      <UInput v-model="newName" placeholder="My New Story..."></UInput>
    </template>
    <UTextarea v-model="newText" placeholder="It was a dark and stormy night..." class="w-full"></UTextarea>
    <template #footer>
      <UTooltip :disabled="loggedIn" :delay-duration="0">
        <template #content>
          Please log in to publish a post.
        </template>
        <UButton @click="submit" :disabled="!loggedIn">Publish</UButton>
      </UTooltip>
    </template>
	</UCard>
</template>
<script setup lang="ts">
import type { PostInsert } from '~/server/db/schema' 

const props = defineProps<{challengeId?: number|null}>()

const newName = ref<string>("")
const newText = ref<string>("")

const { loggedIn, user } = useUserSession()

async function submit() {
  const relatedChallengeIds = []
  if (props.challengeId) {
    relatedChallengeIds.push(props.challengeId)
  }
  const post = {
    authorId: user.value?.id,
    name: newName.value,
    text: newText.value,
    challengeIds: relatedChallengeIds
  } as PostInsert
  const result = await $fetch("/api/posts",{
    method:"POST",
    body: post
  })
  emit("done")
}

const emit = defineEmits<{
  done: []
}>()

</script>

