<template>
	<div>
    <h1>New Challenge</h1>
    <NewChallengeCard @done="refresh()"></NewChallengeCard>
    <br/>
    <h1>Issued Challenges</h1>
    <ChallengeCard v-for="challenge in challenges" :challenge="challenge"></ChallengeCard>
	</div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"]
})
const {data:challenges, refresh} = await useFetch('/api/outbox/challenges')
</script>

