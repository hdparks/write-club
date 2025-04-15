<template>
	<div>
    <UModal title="New Challenge" v-model:open="open">
      <UButton icon="i-lucide-plus">New Challenge</UButton>
      <template #body>
        <NewChallengeCard @done="open = !open"></NewChallengeCard>
      </template>
    </UModal>
    <ChallengeCard v-for="challenge in challenges" :challenge="challenge" class="my-4"></ChallengeCard>
	</div>
</template>
<script setup lang="ts">

const open = ref<boolean>(false)
const challenges = await getChallenges()
</script>

