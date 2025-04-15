<template>
	<div>
    <ChallengeCard v-for="prompt in prompts" :challenge="prompt"></ChallengeCard>
    <UCard>
      <UInput v-model="newPromptText"/>
      <UButton @click="create(newPromptText)">Create</UButton>
    </UCard>
	</div>
</template>
<script setup lang="ts">
import type { UCard } from '#components';
import type ChallengeCard from '~/components/ChallengeCard.vue';
import { type Challenge } from '~/server/db/schema';

const newPromptText = ref<string>("new prompt")
const prompts = ref<Challenge[]>(await getPrompts())

async function create(name: string) {
  await createPrompt(name)
  prompts.value = await getPrompts()
}

</script>

