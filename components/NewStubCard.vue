<template>
  <UCard :ui="{footer: 'text-right'}" class="w-full">
    <template #header>
      <UInput v-model="newName" placeholder="My New Story..."></UInput>
    </template>
    <UTextarea v-model="newText" placeholder="It was a dark and stormy night..." class="w-full"></UTextarea>
    <template #footer>
      <UTooltip :disabled="loggedIn" :delay-duration="0">
        <template #content>
          Please log in to publish a stub.
        </template>
        <UButton @click="submit" :disabled="!loggedIn">Publish</UButton>
      </UTooltip>
    </template>
	</UCard>
</template>
<script setup lang="ts">
import createStub from '~/composables/createStub';

const newName = ref<string>("")
const newText = ref<string>("")

const { loggedIn } = useUserSession()

async function submit() {
  const result = await createStub(newName.value, newText.value)
  console.log(result)
}

</script>

