<template>
	<UCard class="w-full">
    <template #header>
      <div class="flex flex-row justify-between">
        <div>{{post.name}}</div> 
        <UserAvatar :user="post.author"></UserAvatar>
      </div>
    </template>
    <div>{{post.text}}</div>
	</UCard>
</template>
<script setup lang="ts">
import type { PostModel } from './PostModel';

defineProps<{post: PostModel}>()
</script>

