<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import HomeBoard from './components/HomeBoard.vue'
import TheTaskbar from './components/taskbar/TheTaskbar.vue';
</script>

<template>
  <header class="header">
    <img alt="Vue logo" class="logo rounded-4xl" src="@/assets/logo-192x192.png" width="125" height="125" />
    <div class="wrapper">
      <HomeBoard msg="Hi there 👋" />
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>
  </header>
  <!-- <RouterView /> -->
  <TheTaskbar />
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
