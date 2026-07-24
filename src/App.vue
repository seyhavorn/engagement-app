<script setup lang="ts">
import { useMetadata } from './composables/useMetadata';
import { Analytics } from '@vercel/analytics/vue';

useMetadata();
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Active View Route (Defaults to V1) -->
    <router-view />
    <Analytics />
  </div>
</template>
