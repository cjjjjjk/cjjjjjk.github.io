<script setup lang="ts">
import HomeBoard from '@/components/HomeBoard.vue';
import IconHeaderOptions from '@/components/icons/IconHeaderOptions.vue';
import TheTaskbar from '@/components/taskbar/TheTaskbar.vue';
</script>


<template>
  <IconHeaderOptions  class="fixed top-5 right-5 opacity-40 hover:opacity-100 hover:cursor-pointer transition-opacity duration-300"/>
  <main class="flex flex-col justify-center items-center">
    <header class="header grid grid-cols-2">
      <img alt="Vue logo" class="logo rounded-4xl" src="@/assets/logo-192x192.png" width="125" height="125" />
      <div class="wrapper">
        <HomeBoard msg="Hi there 👋." />
        <!-- <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav> -->
      </div>
    </header>
    <!-- <RouterView /> -->
    <TheTaskbar/>
  </main>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
