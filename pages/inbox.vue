<template>
	<div>
    <ChallengeCard v-for="challenge in challenges" :challenge="challenge" @refresh="refresh" class="mt-5"> </ChallengeCard>
	</div>
</template>
<script setup lang="ts">

const {data:challenges, refresh} = await useFetch("/api/inbox/challenges")
</script>

