<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: bolder;
}

h1:hover {
  color: black;
  transition:all;
  transition-duration: 1s;
}
</style>
