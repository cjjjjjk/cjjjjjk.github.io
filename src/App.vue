<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="header">
    <img alt="Vue logo" class="logo" src="@/assets/logo-192x192.png" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="Hi there 👋" />

      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>
  </header>

  <!-- <RouterView /> -->
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
</style>
