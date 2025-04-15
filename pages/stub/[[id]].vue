<template>
  <StubCard v-if="route.params.id"></StubCard>
  <NewStubCard v-else></NewStubCard>
</template>
<script setup lang="ts">
const route = useRoute()
</script>


