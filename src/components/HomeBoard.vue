<script setup lang="ts">
import {computed, ref} from "vue"


const props = defineProps<{
  msg: string
}>()


// Time handler --------------------------------------------
const isHour12 = ref(false)
const toggleHourFormat = () => {
  isHour12.value = !isHour12.value
}
const time = ref(new Date());
const timeString = computed(()=>{
  return time.value.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: isHour12.value
  })
})
setInterval(() => {
  time.value = new Date();
}, 1000);
// ---------------------------------------------------------

</script>

<template>
  <div class="greeting border border-solid border-white/70 backdrop-blur-sm bg-black/5 rounded-xl shadow-sm py-2 px-3">
    <div class="time-box flex justify-between items-center  text-lg font-bold w-[100%]">
      <span class="time-span text-white transition-all duration-300">{{ timeString}}</span>
      <button class="text-white/30 hover:text-white rounded-lg hover:cursor-pointer 
               p-0 m-0 leading-none w-auto h-auto 
               inline-flex pb-1 border-0"
               @click="toggleHourFormat"
               >₪</button>

    </div>
    <h1 class="green select-none">{{ msg }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: bolder;
}

h1:hover {
  color: black;
  transition: all;
  transition-duration: 1s;
}

.greeting {
  width: 10rem;
  aspect-ratio: calc(10/7);
}

.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}
</style>
