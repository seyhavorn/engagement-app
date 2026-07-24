<script setup lang="ts">
import { ref, computed } from 'vue';

const guestNameInput = ref('');
const copied = ref(false);

const presetNames = [
  'សុជាតិ និង ភរិយា',
  'លោក និងលោកស្រី',
  'ឯកឧត្តម និងលោកជំទាវ',
  'បងប្អូន និងមិត្តភក្តិ',
];

const selectPreset = (name: string) => {
  guestNameInput.value = name;
};

const generatedUrl = computed(() => {
  const origin = window.location.origin;
  const path = window.location.pathname;
  const trimmed = guestNameInput.value.trim();

  let url = `${origin}${path}#/`;
  if (trimmed) {
    url += `?name=${encodeURIComponent(trimmed)}`;
  }
  return url;
});

// Clean unescaped URL for clean copy & display
const cleanUrl = computed(() => {
  return decodeURIComponent(generatedUrl.value);
});

const copyLink = () => {
  navigator.clipboard.writeText(cleanUrl.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2500);
};

const openPreview = () => {
  window.open(cleanUrl.value, '_blank');
};
</script>

<template>
  <div
    class="min-h-screen w-full flex items-center justify-center p-4 bg-[#F7F2E8] font-body select-none relative overflow-hidden"
  >
    <!-- Background Soft Floral Glow -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none"
    />

    <!-- Main V1 Luxury Ivory Generator Card -->
    <div
      class="relative z-10 w-full max-w-[430px] p-6 sm:p-8 rounded-[28px] bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FFF6E5] border-2 border-secondary/40 shadow-[0_12px_60px_rgba(197,160,70,0.15)] text-center overflow-hidden"
    >
      <!-- Double Inner Border Frame Layer -->
      <div
        class="absolute inset-[8px] rounded-[24px] border-2 border-secondary/30 pointer-events-none z-10"
      />
      <div
        class="absolute inset-[14px] rounded-[18px] border border-secondary/20 pointer-events-none z-10"
      />

      <!-- Four Frame Corner Ornaments (Top-Left) -->
      <svg
        class="absolute top-3 left-3 w-6 h-6 text-secondary pointer-events-none z-20 opacity-80"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M2 2h8v2H4v6H2V2zm4 4h4v2H6v2H4V6h2z" />
        <circle cx="3" cy="3" r="1.5" />
      </svg>

      <!-- Four Frame Corner Ornaments (Top-Right) -->
      <svg
        class="absolute top-3 right-3 w-6 h-6 text-secondary pointer-events-none z-20 opacity-80"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M22 2h-8v2h6v6h2V2zm-4 4h-4v2h4v2h2V6h-2z" />
        <circle cx="21" cy="3" r="1.5" />
      </svg>

      <!-- Four Frame Corner Ornaments (Bottom-Left) -->
      <svg
        class="absolute bottom-3 left-3 w-6 h-6 text-secondary pointer-events-none z-20 opacity-80"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M2 22h8v-2H4v-6H2v8zm4-4h4v-2H6v-2H4v4h2z" />
        <circle cx="3" cy="21" r="1.5" />
      </svg>

      <!-- Four Frame Corner Ornaments (Bottom-Right) -->
      <svg
        class="absolute bottom-3 right-3 w-6 h-6 text-secondary pointer-events-none z-20 opacity-80"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M22 22h-8v-2h6v-6h2v8zm-4-4h-4v-2h4v-2h2v4h-2z" />
        <circle cx="21" cy="21" r="1.5" />
      </svg>

      <!-- Main Content -->
      <div class="relative z-20 py-2">
        <!-- Header Badge -->
        <span
          class="inline-block px-3.5 py-1 rounded-full bg-secondary/15 border border-secondary/30 text-secondary-dark text-xs font-semibold tracking-widest uppercase mb-2"
        >
          ប្រព័ន្ធបង្កើតតំណភ្ជាប់អញ្ជើញ
        </span>

        <h1 class="font-heading text-xl text-primary font-bold mb-1">
          បង្កើតតំណភ្ជាប់សម្រាប់ភ្ញៀវ
        </h1>
        <p class="text-xs text-primary/70 mb-5">
          វន សីហា & សួង ដាវីត (ពិធីភ្ជាប់ពាក្យ)
        </p>

        <!-- Guest Name Input -->
        <div class="mb-4 text-left">
          <label class="block text-xs font-semibold text-secondary-dark mb-1.5">
            បញ្ចូលឈ្មោះភ្ញៀវ (Guest Name)
          </label>
          <input
            v-model="guestNameInput"
            type="text"
            placeholder="ឧទាហរណ៍៖ សុជាតិ និង ភរិយា"
            class="w-full px-4 py-3 rounded-xl bg-white border border-secondary/40 text-primary text-sm focus:outline-none focus:border-secondary shadow-xs transition-all placeholder:text-primary/30 select-text"
          />
        </div>

        <!-- Quick Name Presets -->
        <div class="mb-5 text-left">
          <span class="block text-[11px] text-primary/60 mb-1.5"
            >ជ្រើសរើសឈ្មោះគំរូរហ័ស៖</span
          >
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="(name, idx) in presetNames"
              :key="idx"
              @click="selectPreset(name)"
              class="px-2.5 py-1 rounded-lg bg-secondary/10 border border-secondary/30 text-secondary-dark text-xs hover:bg-secondary/20 transition-colors cursor-pointer"
            >
              {{ name }}
            </button>
          </div>
        </div>

        <!-- Single Clean Link Preview Box -->
        <div class="mb-6 text-left">
          <label class="block text-xs font-semibold text-secondary-dark mb-1.5">
            តំណភ្ជាប់ផ្ទាល់សម្រាប់ចម្លង (Clean Guest Link)
          </label>
          <div
            class="p-3.5 rounded-xl bg-white/90 border border-secondary/30 text-xs font-mono text-secondary-dark break-all select-text shadow-xs"
          >
            {{ cleanUrl }}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col gap-3">
          <!-- Copy Link Button Only -->
          <button
            @click="copyLink"
            class="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-secondary-dark via-secondary to-secondary-dark text-white font-body text-xs font-bold tracking-wide uppercase shadow-md shadow-secondary/25 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
              />
            </svg>
            <span>{{
              copied ? 'បានចម្លងតំណភ្ជាប់!' : 'ចម្លងតំណភ្ជាប់ (Copy Link)'
            }}</span>
          </button>

          <!-- Preview Card Button -->
          <button
            @click="openPreview"
            class="w-full py-3 px-6 rounded-full bg-white border-2 border-secondary/40 text-secondary-dark font-body text-xs font-semibold hover:bg-secondary/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg
              class="w-4 h-4 text-secondary-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>បើកមើលលិខិតអញ្ជើញផ្ទាល់ (Preview Invitation)</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
