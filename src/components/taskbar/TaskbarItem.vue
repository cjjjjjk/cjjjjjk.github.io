<template>
  <div class="bg-transparent text-2xl select-none hover:cursor-pointer hover:text-3xl transition-all duration-200 icon-font">
    {{ title }}
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string
}>()


</script>

<style scoped></style>
