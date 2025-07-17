<script setup lang="ts">
import {computed, ref} from "vue"
import TimeBox from "./timebox/TimeBox.vue";


const props = defineProps<{
  msg: string
}>()




</script>

<template>
  <div class="greeting ms-3 ps-3">
    <TimeBox />
    <h1 class="select-none bg-white/10 rounded-sm p-1 text-white font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">{{ msg }}</h1>
  </div>
</template>

<style scoped>

.greeting {
  aspect-ratio: calc(10/7);
}

.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}
</style>
