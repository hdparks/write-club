<template>
  <UAvatar :src="user.picture!" :alt="user.name" ></UAvatar>
</template>
<script setup lang="ts">
import type { User } from '~/server/db/schema';
defineProps<{user: User}>()
</script>

