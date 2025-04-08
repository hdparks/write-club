<template>
	<div>
    <UCard>
      Stories
    </UCard>
    <UCard>
      Prompts
      <p v-for="prompt in prompts">{{prompt.name }}</p>
    </UCard>
	</div>
</template>
<script setup lang="ts">
import type { WritingPrompt } from '~/server/db/schema';

const prompts = ref<WritingPrompt[]>([])
onMounted(async () => {
  prompts.value = await getMyTaggedPrompts()
})

</script>

