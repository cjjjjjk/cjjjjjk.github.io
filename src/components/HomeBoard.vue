<script setup lang="ts">
import {computed, ref} from "vue"
import TimeBox from "./timebox/TimeBox.vue";


const props = defineProps<{
  msg: string
}>()




</script>

<template>
  <div class="greeting ms-3 flex flex-col ps-3 gap-3">
    <TimeBox />
    <h1 class="select-none bg-white/5 rounded-sm p-3 text-white text-3xl font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">{{ msg }}</h1>
  </div>
</template>

<style scoped>

.greeting {
  aspect-ratio: calc(10/7);
}
</style>
