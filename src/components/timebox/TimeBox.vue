<template>
<div class="timebox-container flex flex-row items-center gap-0.5 text-2xl font-bold text-white hover:cursor-pointer"
    @click="toggleHourFormat" 
>
    <span class="bg-white/10 hover:bg-gray/5 p-1.5 rounded-sm">{{ getTimeObject().hour }}</span>
    <span class="blink">:</span>
    <span class="bg-white/10 hover:bg-gray/5 p-1.5 rounded-sm">{{ getTimeObject().min }}</span>
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
    hour12Format?: "PM" | "AM" | null
} {
    let timeString:string = getTimeString.value;
    
    return {
        hour: timeString.split(":")[0],
        min: String(time.value.getMinutes()),    
    }  
}

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