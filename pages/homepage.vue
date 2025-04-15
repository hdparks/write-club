<template>
	<div>
    <component v-for="post in posts" :is="post.componentType"></component>
	</div>
</template>
<script setup lang="ts">
const posts = []
</script>

