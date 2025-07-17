<template>
  <div
    @click="handleClickIcon" 
    class="bg-transparent text-5xl select-none hover:cursor-pointer hover:text-4xl transition-all duration-200 icon-font">
    {{ title }}
  </div>
</template>

<script setup lang="ts">
import { useLogoIconStore } from '@/stores/logo';

const logoIconStore = useLogoIconStore()

const props = defineProps<{
  title: string
}>()

const emit = defineEmits<{
  (e: 'icon-click', value: string):void
}>()

const handleClickIcon = () => {
  logoIconStore.changeLogoIcon(props.title)
  emit('icon-click', props.title)
}


</script>

<style scoped></style>
