<template>
  <div
    class="taskbar-container fixed bottom-4 h-20 px-5 grid place-items-center border border-solid border-gray-400
           backdrop-blur-sm bg-white/10 rounded-3xl shadow-sm"
  >
    <div class="flex flex-row gap-5 justify-center items-center">
      <TaskbarItem 
        @icon-click="getEmits"
        v-for="(title, index) in icons"
        :key="index"
        :title="title" 
      /> 
    </div>
  </div>
</template>


<script setup lang="ts">
import TaskbarItem from './TaskbarItem.vue';

const icons = ['🫤', '😕', '😁', '😡'] 

const getEmits = (title: string)=> {
  console.log(title)
}
</script>

<style scoped>

</style>
