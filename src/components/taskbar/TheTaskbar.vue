<template>
  <div
    class="taskbar-container fixed bottom-4 h-12 px-3 grid place-items-center border border-solid border-gray-400
           backdrop-blur-sm bg-white/10 rounded-xl shadow-sm"
  >
    <div class="flex flex-row gap-3 justify-center items-center">
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
