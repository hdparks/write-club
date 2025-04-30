<template>
	<UCard class="w-full">
    <template #header>
      {{stub?.name}}
    </template>
    {{stub?.text}}
	</UCard>
</template>
<script setup lang="ts">
import type { Stub } from '~/server/db/schema';

const route = useRoute()
console.log(route)
const {data:stub} = await useFetch<Stub>(`/api/stubs/${route.params.id as string}`)
</script>

