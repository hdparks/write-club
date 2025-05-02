<template>
  <UModal>
    <template #content>
      <NewPostCard @done="done()" :challengeId="challengeId"></NewPostCard>
    </template>
  </UModal>
</template>
<script setup lang="ts">

const props = defineProps<{
  challengeId?: number | null,
  onDone?: () => void
}>()

function done(){

  props.onDone?.() 
  emit('close',true)
}
const emit = defineEmits<{
  close: [boolean]
}>()
</script>

