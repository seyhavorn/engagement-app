<script setup lang="ts">
import { useMetadata } from './composables/useMetadata';

useMetadata();
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Active View Route (Defaults to V1) -->
    <router-view />
  </div>
</template>
