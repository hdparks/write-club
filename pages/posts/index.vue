<template>
  <div>
    <PostCard v-for="post in posts" :post="post" class="mt-5"></PostCard>
  </div>
</template>

<script setup lang="ts">
const {data:posts, refresh} = await useFetch("/api/posts")
</script>

