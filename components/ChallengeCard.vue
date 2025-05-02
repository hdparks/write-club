<template>
	<UCard>
  <div class="float-right"><NuxtLink :to="`/challenges/${challenge.id}`"><UIcon class="text-gray-500" name="i-lucide:square-arrow-out-up-right" ></UIcon></NuxtLink></div>
    <div class="grid grid-cols-3">
      <label>Challenger</label>
      <UAvatar :src="challenge.challenger.picture!" :alt="challenge.challenger.name"></UAvatar>
    </div>
    <USeparator class="my-2"></USeparator>
    <div class="grid grid-cols-3">
      <label>Description</label>
      <span class="col-span-2">
        {{challenge.name}}
      </span>
    </div>
    <USeparator class="my-2"></USeparator>
    <div class="grid grid-cols-3">
      <label>Participants ({{challenge.challengeTaggedUsers.length}})</label>
      <UAvatarGroup>
        <UserAvatar v-for="taggedUser in challenge.challengeTaggedUsers" :user="taggedUser.user"></UserAvatar>
      </UAvatarGroup>
    </div>
    <template v-if="!hasAnswered">
      <USeparator class="my-2"></USeparator>
      <div class="flex flex-row justify-center mt-4" >
        <UButton @click="openPostModal">Answer the call+</UButton>
      </div>
    </template>
    <USeparator class="my-2"></USeparator>
    <div v-for="post in challenge.challengesPosts.map(cp => cp.post)">
      <UserAvatar :user="post.author"></UserAvatar>
      <div> {{post.name}} </div>
      <div> {{post.text.substring(0,30)}}... </div>
    </div>
    <div v-if="challenge.challengesPosts.length == 0" class="text-center text-gray-500">
      <p>Awful quiet in here so far... </p>
      <p>Be the first to respond!</p>
    </div>
	</UCard>
</template>
<script setup lang="ts">
import { NewPostModal } from '#components';
import type { ChallengeCardModel } from './ChallengeCardModel';
import type UserAvatar from './UserAvatar.vue';

const {user} = useUserSession()
const props = defineProps<{challenge: ChallengeCardModel}>()

const hasAnswered = computed(() => props.challenge.challengesPosts.some(p => p.post.authorId == user.value?.id))

async function openPostModal() {
  const overlay = useOverlay()
  const modal = overlay.create(
    NewPostModal, 
    {
      props: {
        challengeId: props.challenge.id,
        onDone: () => emit('refresh')
      },
    }
  )
  await modal.open()
}

const emit = defineEmits<{
  refresh: []
}>()
</script>

