<template>
  <div
    class="taskbar-container fixed left-3 bottom-3 h-12 px-3 grid place-items-center border border-solid border-gray-50
           backdrop-blur-sm bg-white/10 rounded-xl shadow-sm"
  >
    <div class="flex flex-row gap-3 items-center">
      <TaskbarItem 
        v-for="(title, index) in icons"
        :key="index"
        :title="title" 
      /> 
    </div>
  </div>
</template>


<script>
import TaskbarItem from './TaskbarItem.vue';

export default {
  name: 'TheTaskbar',
  components: {
    TaskbarItem
  },
  data() {
    return {
      icons: ['🫤', '😕', '😁', '🤔', '😎', '😡']
    };
  }
};
</script>

<style scoped>

</style>
