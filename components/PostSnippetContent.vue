<template>
	<div>
    <UserAvatar :user="post.author"></UserAvatar>
    <div> {{post.name}} </div>
    <div> {{post.text.substring(0,30)}}... </div>
	</div>
</template>
<script setup lang="ts">
import type { Post, User } from '~/server/db/schema';

defineProps<{
  post: Post & {author: User}
}>()
</script>

