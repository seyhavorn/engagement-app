<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps<{
  targetDate: string;
}>();

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const isExpired = ref(false);

let timerInterval: number | undefined;

const toKhmerNum = (num: number): string => {
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  const formatted = num.toString().padStart(2, '0');
  return formatted
    .split('')
    .map((digit) => khmerDigits[parseInt(digit)] || digit)
    .join('');
};

const updateTimer = () => {
  const now = new Date().getTime();
  const target = new Date(props.targetDate).getTime();
  const distance = target - now;

  if (distance < 0) {
    isExpired.value = true;
    days.value = 0;
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    if (timerInterval) clearInterval(timerInterval);
    return;
  }

  days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
  hours.value = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((distance % (1000 * 60)) / 1000);
};

onMounted(() => {
  updateTimer();
  timerInterval = window.setInterval(updateTimer, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});

const timerItems = computed(() => [
  { labelKhmer: 'ថ្ងៃ', val: days.value },
  { labelKhmer: 'ម៉ោង', val: hours.value },
  { labelKhmer: 'នាទី', val: minutes.value },
  { labelKhmer: 'វិនាទី', val: seconds.value },
]);
</script>

<template>
  <div class="w-full my-4">
    <div v-if="isExpired" class="flex items-center justify-center gap-2 py-3 text-secondary-dark font-heading text-base">
      <svg class="w-4 h-4 text-secondary animate-pulse" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z" />
      </svg>
      <span>ពិធីបានចាប់ផ្តើមហើយ!</span>
      <svg class="w-4 h-4 text-secondary animate-pulse" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z" />
      </svg>
    </div>
    <div v-else class="grid grid-cols-4 gap-2 sm:gap-3.5 max-w-md mx-auto">
      <div
        v-for="(item, idx) in timerItems"
        :key="idx"
        class="group relative flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FFF6E5] border border-secondary/40 shadow-[0_4px_16px_rgba(197,160,70,0.15)] hover:border-secondary/70 transition-all duration-300 backdrop-blur-sm"
      >
        <!-- Gold foil Corner Accents (V1 Gold color) -->
        <div class="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-secondary/60" />
        <div class="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-secondary/60" />
        <div class="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-secondary/60" />
        <div class="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-secondary/60" />

        <!-- Khmer Number (V1 Secondary Dark Gold Gradient) -->
        <span class="font-heading text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-dark via-amber-800 to-secondary-dark tracking-wider">
          {{ toKhmerNum(item.val) }}
        </span>

        <!-- Label -->
        <div class="mt-1 flex flex-col items-center leading-tight">
          <span class="font-body text-xs sm:text-sm text-primary font-medium">
            {{ item.labelKhmer }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
