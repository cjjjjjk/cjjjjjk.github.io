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
  aspect-ratio: calc(10/7);
}

.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}
</style>
