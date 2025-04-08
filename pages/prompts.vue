<template>
	<div>
    <WritingPromptCard v-for="prompt in prompts" :prompt="prompt"></WritingPromptCard>
    <UCard>
      <UInput v-model="newPromptText"/>
      <UButton @click="create(newPromptText)">Create</UButton>
    </UCard>
	</div>
</template>
<script setup lang="ts">
import type { UCard } from '#components';
import type WritingPromptCard from '~/components/WritingPromptCard.vue';
import { type WritingPrompt } from '~/server/db/schema';

const newPromptText = ref<string>("new prompt")
const prompts = ref<WritingPrompt[]>(await getPrompts())

async function create(name: string) {
  await createPrompt(name)
  prompts.value = await getPrompts()
}

</script>

