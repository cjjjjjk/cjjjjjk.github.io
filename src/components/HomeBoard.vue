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
    <h1 class="select-none flex-none self-start bg-[#124]/10 rounded-md p-3 text-white text-3xl font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">{{ msg }} <span class="blink font-extrabold">_</span></h1>
  </div>
</template>

<style scoped>
.greeting {
  aspect-ratio: calc(10/7);
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.blink {
  animation: blink 1s infinite;
}
</style>
