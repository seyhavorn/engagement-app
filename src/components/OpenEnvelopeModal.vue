<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

withDefaults(
  defineProps<{
    guestName: string;
    theme?: 'v1' | 'v2';
  }>(),
  {
    theme: 'v1',
  },
);

const emit = defineEmits<{
  (e: 'open'): void;
}>();

const isOpen = ref(false);

const lockScroll = () => {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
};

const unlockScroll = () => {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  document.body.style.touchAction = '';
};

onMounted(() => {
  if (!isOpen.value) {
    lockScroll();
  }
});

onUnmounted(() => {
  unlockScroll();
});

const handleOpen = () => {
  isOpen.value = true;
  unlockScroll();
  emit('open');
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="!isOpen"
      @touchmove.prevent
      @wheel.prevent
      class="fixed inset-0 z-50 flex items-center justify-center p-4 select-none touch-none overflow-hidden"
      :class="
        theme === 'v1'
          ? 'bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE]/98 to-[#FFF6E5]/98'
          : 'bg-gradient-to-b from-[#12241C] via-[#0B1711] to-black'
      "
    >
      <!-- Envelope Container Frame -->
      <div
        class="relative w-full max-w-sm p-8 rounded-3xl border-2 text-center backdrop-blur-xl animate-fade-in shadow-2xl"
        :class="
          theme === 'v1'
            ? 'bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FFF6E5] border-secondary/50 shadow-[0_20px_80px_rgba(197,160,70,0.25),0_4px_30px_rgba(0,0,0,0.06)] text-primary'
            : 'bg-gradient-to-b from-[#1A2E24]/95 via-[#102018]/98 to-[#0B1711]/98 border-amber-500/50 shadow-[0_20px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.2)] text-amber-100'
        "
      >
        <!-- Gold Corner Accents -->
        <div
          class="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2"
          :class="theme === 'v1' ? 'border-secondary/70' : 'border-amber-400'"
        />
        <div
          class="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2"
          :class="theme === 'v1' ? 'border-secondary/70' : 'border-amber-400'"
        />
        <div
          class="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2"
          :class="theme === 'v1' ? 'border-secondary/70' : 'border-amber-400'"
        />
        <div
          class="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2"
          :class="theme === 'v1' ? 'border-secondary/70' : 'border-amber-400'"
        />

        <!-- Envelope Wax Seal Icon -->
        <div
          class="w-16 h-16 mx-auto mb-4 rounded-full border-2 flex items-center justify-center shadow-lg animate-pulse"
          :class="
            theme === 'v1'
              ? 'bg-gradient-to-tr from-secondary-dark via-secondary to-amber-300 border-secondary/60 text-white'
              : 'bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 border-amber-200 text-emerald-950'
          "
        >
          <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            />
          </svg>
        </div>

        <p
          class="font-body text-xs font-semibold tracking-widest uppercase mb-1"
          :class="theme === 'v1' ? 'text-secondary-dark' : 'text-amber-300/80'"
        >
          សូមគោរពអញ្ជើញ
        </p>

        <h3
          class="font-heading text-xl font-bold mb-2 tracking-wide my-4"
          :class="theme === 'v1' ? 'text-primary' : 'text-amber-100'"
        >
          {{ guestName }}
        </h3>

        <p
          class="font-body text-xs leading-relaxed mb-6 px-2"
          :class="theme === 'v1' ? 'text-primary/75' : 'text-emerald-100/70'"
        >
          លោក សីហា &amp; កញ្ញា ដាវីត
          សូមគោរពអញ្ជើញលោកអ្នកមកចូលរួមអបអរសាទរពិធីភ្ជាប់ពាក្យរបស់យើងខ្ញុំ
        </p>

        <!-- Open Invitation Button -->
        <button
          @click="handleOpen"
          class="w-full py-3.5 px-6 rounded-full font-body text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 shadow-md"
          :class="
            theme === 'v1'
              ? 'bg-gradient-to-r from-secondary-dark via-secondary to-secondary-dark text-white shadow-[0_4px_25px_rgba(197,160,70,0.4)] hover:shadow-secondary/60'
              : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-emerald-950 shadow-[0_4px_25px_rgba(245,158,11,0.5)] hover:shadow-amber-400/70'
          "
        >
          <svg
            class="w-5 h-5"
            :class="theme === 'v1' ? 'text-white' : 'text-emerald-950'"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          <span>បើកលិខិតអញ្ជើញ</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.04);
}
</style>
