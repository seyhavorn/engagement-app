<script setup lang="ts">
import { useCountdown } from '../composables/useCountdown';

const props = defineProps<{
  targetDate: string;
}>();

const { countdown } = useCountdown(props.targetDate);

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}
</script>

<template>
  <div class="flex items-center justify-center gap-2 sm:gap-4">
    <!-- Days -->
    <div class="flex flex-col items-center">
      <div
        class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm border border-secondary/30 shadow-[0_4px_12px_rgba(197,160,70,0.1)]"
      >
        <span
          class="text-xl sm:text-2xl font-accent font-bold text-secondary-dark"
        >
          {{ pad(countdown.days) }}
        </span>
      </div>
      <span
        class="mt-1.5 text-[9px] sm:text-[11px] font-body font-medium uppercase tracking-[0.12em] text-primary-muted"
      >
        ថ្ងៃ
      </span>
    </div>

    <span class="text-secondary/60 text-lg font-light mt-[-18px]">:</span>

    <!-- Hours -->
    <div class="flex flex-col items-center">
      <div
        class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm border border-secondary/30 shadow-[0_4px_12px_rgba(197,160,70,0.1)]"
      >
        <span
          class="text-xl sm:text-2xl font-accent font-bold text-secondary-dark"
        >
          {{ pad(countdown.hours) }}
        </span>
      </div>
      <span
        class="mt-1.5 text-[9px] sm:text-[11px] font-body font-medium uppercase tracking-[0.12em] text-primary-muted"
      >
        ម៉ោង
      </span>
    </div>

    <span class="text-secondary/60 text-lg font-light mt-[-18px]">:</span>

    <!-- Minutes -->
    <div class="flex flex-col items-center">
      <div
        class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm border border-secondary/30 shadow-[0_4px_12px_rgba(197,160,70,0.1)]"
      >
        <span
          class="text-xl sm:text-2xl font-accent font-bold text-secondary-dark"
        >
          {{ pad(countdown.minutes) }}
        </span>
      </div>
      <span
        class="mt-1.5 text-[9px] sm:text-[11px] font-body font-medium uppercase tracking-[0.12em] text-primary-muted"
      >
        នាទី
      </span>
    </div>

    <span class="text-secondary/60 text-lg font-light mt-[-18px]">:</span>

    <!-- Seconds -->
    <div class="flex flex-col items-center">
      <div
        class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-sm border border-secondary/30 shadow-[0_4px_12px_rgba(197,160,70,0.1)]"
      >
        <span
          class="text-xl sm:text-2xl font-accent font-bold text-secondary-dark"
        >
          {{ pad(countdown.seconds) }}
        </span>
      </div>
      <span
        class="mt-1.5 text-[9px] sm:text-[11px] font-body font-medium uppercase tracking-[0.12em] text-primary-muted"
      >
        វិនាទី
      </span>
    </div>
  </div>
</template>
