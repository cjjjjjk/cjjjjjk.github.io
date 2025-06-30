<template>
  <div class="bg-transparent text-2xl select-none hover:cursor-pointer hover:text-4xl transition-all duration-200">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'TaskbarItem',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped></style>
