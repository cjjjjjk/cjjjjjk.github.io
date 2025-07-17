<script setup lang="ts">
import HomeBoard from '@/components/HomeBoard.vue';
import IconHeaderOptions from '@/components/icons/IconHeaderOptions.vue';
import TheTaskbar from '@/components/taskbar/TheTaskbar.vue';
import { useLogoIconStore } from '@/stores/logo';

const logoIconStore = useLogoIconStore()
</script>

<template>
  <IconHeaderOptions  class="fixed top-5 right-5 opacity-40 hover:opacity-100 hover:cursor-pointer transition-opacity duration-300"/>
  <main class="flex flex-col justify-center items-center">
    <header class="header grid grid-cols-2">
    <div class="logo-bg relative grid grid-cols-1 items-center">
      <Transition  name="fade-icon" mode="out-in">
        <span
          :key="logoIconStore.getIcon ?? '🫤'"
          class="text-logo text-center flex justify-center">{{ logoIconStore.getIcon }}</span>
      </Transition>
    </div>

      <div class="wrapper">
        <HomeBoard msg="Hi there 👋" />
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
.logo-bg {
  width: 125px;
  height: 125px;
  background-color: #124;
  /* background-image: url('@/assets/logo-192x192-empty.png'); */
  /* background-size: cover;
  background-position: center; */
  border-radius: 2rem; /* tương đương rounded-4xl */
}

.text-logo {
  font-size: 4.75rem;
}

/*[grok ai] Enhanced Logo Transition Animation with Vibration Effect */
.fade-icon-enter-active,
.fade-icon-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-icon-enter-from {
  opacity: 0;
  transform: scale(0.8) rotate(5deg);
  animation: vibrate 0.2s ease-in-out;
}

.fade-icon-enter-to {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.fade-icon-leave-from {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.fade-icon-leave-to {
  opacity: 0;
  transform: scale(1.2) rotate(-5deg);
  animation: vibrate 0.2s ease-in-out;
}

@keyframes vibrate {
  0%, 100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-2px) rotate(2deg);
  }
  40% {
    transform: translateX(2px) rotate(-2deg);
  }
  60% {
    transform: translateX(-1px) rotate(1deg);
  }
  80% {
    transform: translateX(1px) rotate(-1deg);
  }
}
</style>
