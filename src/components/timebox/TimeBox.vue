<template>
<div class="timebox-container flex flex-row items-center gap-0.5 text-2xl font-bold text-white hover:cursor-pointer h-12 py-0.5"
    @click="toggleHourFormat" 
>
    <span class="bg-white/10 text-5xl hover:bg-gray/5 px-1.5 rounded-sm text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">{{ getTimeObject().hour }}</span>
    <span class="blink">:</span>
    <span class="bg-white/10 text-5xl hover:bg-gray/5 px-1.5 rounded-sm text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">{{ getTimeObject().min }}</span>
    <span 
      class="time-format text-xl hover:bg-gray/5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] flex self-start rounded-sm"
      v-if="getTimeObject().hour12Format">{{ getTimeObject().hour12Format }}</span>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';


// Component time props -----------------------------------
const props = withDefaults(defineProps<{
  isShowDate?: boolean,
  isShowMessage?: boolean,
  message?: string,
}>(), {
  isShowDate: false,
  isHour12: true,
  isShowMessage: false
})

// REF 
const time = ref(new Date())
const isHour12 = ref(false)

// Time handler --------------------------------------------
const toggleHourFormat = () => {
  isHour12.value = !isHour12.value
}

const getTimeString = computed(()=>{
    return time.value.toLocaleTimeString([],{
        hour: "2-digit",
        minute: "2-digit",
        hour12: isHour12.value
    })
})
const getTimeObject = function(): {
  hour: string,
  min: string,
  hour12Format?: "PM" | "AM" | undefined
} {
  const timeString = getTimeString.value; 
  const parts = timeString.split(" "); 

  const [hourStr, minStr] = timeString.split(":");
  const minute = minStr?.slice(0, 2) || "00";

  let format: "PM" | "AM" | undefined = undefined;
  if (parts.length === 2) {
    format = parts[1] as "PM" | "AM";
  }

  return {
    hour: hourStr,
    min: minute,
    hour12Format: format
  };
};


setInterval(() => {
  time.value = new Date()
}, 1000)

// ---------------------------------------------------------
</script>

<style scoped>
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.blink {
  animation: blink 1s infinite;
}

</style>