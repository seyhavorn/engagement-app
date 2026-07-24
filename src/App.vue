<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const switchDesign = (design: string) => {
  const currentQuery = route.query;
  if (design === 'v1') {
    router.push({ path: '/', query: currentQuery });
  } else {
    router.push({ path: '/v2', query: currentQuery });
  }
};
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Top Floating Design Switcher Bar -->
    <div class="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-1 rounded-full bg-black/70 backdrop-blur-lg border border-amber-500/40 shadow-xl select-none">
      <button
        @click="switchDesign('v1')"
        class="px-3.5 py-1.5 rounded-full font-body text-xs font-semibold transition-all duration-300 flex items-center gap-1.5"
        :class="
          route.path !== '/v2' && route.path !== '/royal'
            ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-emerald-950 shadow-md font-bold'
            : 'text-amber-200/70 hover:text-amber-100 hover:bg-white/10'
        "
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z" />
        </svg>
        <span>ម៉ូដទី ១</span>
      </button>
      <button
        @click="switchDesign('v2')"
        class="px-3.5 py-1.5 rounded-full font-body text-xs font-semibold transition-all duration-300 flex items-center gap-1.5"
        :class="
          route.path === '/v2' || route.path === '/royal'
            ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-emerald-950 shadow-md font-bold'
            : 'text-amber-200/70 hover:text-amber-100 hover:bg-white/10'
        "
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
        </svg>
        <span>ម៉ូដទី ២ (រាជមង្គល)</span>
      </button>
    </div>

    <!-- Active View Route -->
    <router-view />
  </div>
</template>
