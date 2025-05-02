<template>
	<div v-if="challenge">
    <div>
      <label class="mr-2">Challenger</label>
      <UserAvatar :user="challenge.challenger"></UserAvatar>
    </div>
    <div>
      <h1 class="text-3xl">{{challenge.name}}</h1>
      <UAvatarGroup class="my-4">
        <UserAvatar v-for="taggedUser in challenge.challengeTaggedUsers" :user="taggedUser.user"></UserAvatar>
      </UAvatarGroup>
      <div v-for="post in challenge.challengesPosts">
        <UCard>
          <template #header> 
            <div class="flex flex-row justify-between">
              <span class="text-xl"> {{post.post.name}} </span>
              <UserAvatar :user="post.post.author"></UserAvatar>
            </div>
          </template>
          {{post.post.text}}
        </UCard>
      </div>
    </div>
	</div>
  <div v-else>
    <p>Challenge not found.</p>
    <p>(Oof, sowwy bout it)</p>
  </div>
</template>
<script setup lang="ts">
import type { UAvatarGroup } from '#components';
import type UserAvatar from '~/components/UserAvatar.vue';


const route = useRoute()
const {data:challenge, refresh} = await useFetch(`/api/challenges/${route.params.id}`) 
</script>

