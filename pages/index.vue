<template>
	<div v-if="!loggedIn">
    Welcome! Sign in with <a href="/auth/google">Google</a>
	</div>
  <div v-else>
    Welcome, {{user?.name}}
  </div>
</template>
<script setup lang="ts">
const { loggedIn, user } = useUserSession()
</script>

