<!-- [GROK AI GEN] -->
<template>
  <div class="h-full max-w-md mx-auto border border-gray-200 rounded-3xl shadow-lg bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-md p-6 transition-all duration-300 hover:shadow-xl">
    <div v-if="profile" class="flex flex-col items-center">
      <!-- Profile Image -->
      <img 
        :src="profile.avatar_url" 
        :alt="`${profile.name || profile.login}'s avatar`"
        class="w-32 h-32 rounded-full border-4 border-white shadow-md mb-4 object-cover"
      >
      
      <!-- Name and Username -->
      <h1 class="text-2xl font-bold text-gray-800">{{ profile.name || profile.login }}</h1>
      <p class="text-gray-500 text-sm">@{{ profile.login }}</p>
      
      <!-- Bio -->
      <p v-if="profile.bio" class="mt-3 text-gray-600 text-center text-sm italic">
        "{{ profile.bio }}"
      </p>
      
      <!-- Location -->
      <div v-if="profile.location" class="mt-3 flex items-center gap-2">
        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span class="text-gray-600 text-sm">{{ profile.location }}</span>
      </div>
      
      <!-- Stats -->
      <div class="mt-4 grid grid-cols-3 gap-4 w-full text-center">
        <div>
          <p class="text-lg font-semibold text-gray-800">{{ profile.followers }}</p>
          <p class="text-xs text-gray-500">Followers</p>
        </div>
        <div>
          <p class="text-lg font-semibold text-gray-800">{{ profile.following }}</p>
          <p class="text-xs text-gray-500">Following</p>
        </div>
        <div>
          <p class="text-lg font-semibold text-gray-800">{{ profile.public_repos }}</p>
          <p class="text-xs text-gray-500">Public repos</p>
        </div>
      </div>
      
      <!-- Links -->
      <div class="mt-4 flex gap-3">
        <a 
          :href="profile.html_url" 
          target="_blank"
          class="px-4 py-2 bg-blue-500/90 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
        >
          View GitHub
        </a>
        <a 
          v-if="profile.blog" 
          :href="profile.blog" 
          target="_blank"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300 transition-colors"
        >
          Website
        </a>
      </div>
      
      <!-- Join Date -->
      <p class="mt-4 text-xs text-gray-400">
        Joined {{ new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) }}
      </p>
    </div>
    
    <div v-else class="flex items-center justify-center h-full">
      <p class="text-gray-500">Loading profile...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getGitHubMainProfile } from '@/services/github-profile';

// Define reactive profile data
const profile = ref<any>(null);

async function getAuthorGithubProfile() {
  try {
    const res = await getGitHubMainProfile();
    profile.value = res.data; // Store the API response data
  } catch (error: any) {
    console.error("ERROR: get author profile", error);
  }
}

onMounted(() => {
  getAuthorGithubProfile();
});
</script>