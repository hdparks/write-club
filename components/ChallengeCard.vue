<template>
	<UCard>
    <div class="grid grid-cols-3">
      <label>Challenger</label>
      <UAvatar :src="challenge.challenger.picture" :alt="challenge.challenger.name"></UAvatar>
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
      <label>Participants</label>
      <UAvatarGroup>
        <UAvatar v-for="user in challenge.challengeTaggedUsers" :src="user.picture" :alt="user.name"></UAvatar>
      </UAvatarGroup>
    </div>
	</UCard>
</template>
<script setup lang="ts">
import type { Challenge, ChallengeRelations } from '~/server/db/schema';

const props = defineProps<{challenge: Challenge & ChallengeRelations}>()


</script>

