<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useGoogleSheet } from '../composables/useGoogleSheet';

const props = withDefaults(
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

const { trackOpen } = useGoogleSheet();
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
  trackOpen(props.guestName, props.theme);
  emit('open');
};
</script>

<template>
  <Transition name="envelope-reveal">
    <div
      v-if="!isOpen"
      @touchmove.prevent
      @wheel.prevent
      class="fixed inset-0 z-50 flex items-center justify-center p-3 select-none touch-none overflow-hidden"
      :class="
        theme === 'v1'
          ? 'bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE]/98 to-[#FFF6E5]/98'
          : 'bg-gradient-to-b from-[#0A1A12] via-[#0B1711] to-[#060E0A]'
      "
    >
      <!-- Floating particles (V2 only) -->
      <template v-if="theme === 'v2'">
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-1/4 left-1/5 w-1 h-1 rounded-full bg-amber-300/30 animate-pulse [animation-duration:3s]" />
          <div class="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-amber-400/20 animate-pulse [animation-duration:4s] [animation-delay:1s]" />
          <div class="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-amber-300/25 animate-pulse [animation-duration:5s] [animation-delay:2s]" />
          <div class="absolute bottom-1/4 right-1/3 w-0.5 h-0.5 rounded-full bg-amber-200/20 animate-pulse [animation-duration:3.5s] [animation-delay:0.5s]" />
        </div>
      </template>

      <!-- ═══ Main Envelope Card ═══ -->
      <div
        class="envelope-card relative w-full max-w-[430px] rounded-[28px] border-2 text-center backdrop-blur-xl overflow-hidden"
        :class="
          theme === 'v1'
            ? 'bg-[#FFFDF8]/95 backdrop-blur-md border-secondary/30 shadow-[0_12px_60px_rgba(197,160,70,0.12),0_4px_25px_rgba(0,0,0,0.04)] text-primary'
            : 'bg-gradient-to-b from-[#14261D]/95 via-[#0F1E16]/98 to-[#0A1610]/98 border-amber-500/40 shadow-[0_20px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(245,158,11,0.12)] text-amber-100'
        "
      >
        <!-- ─── V1 Golden Floral Corner Ornaments (Top Right) ─── -->
        <svg
          v-if="theme === 'v1'"
          class="absolute top-0 right-0 w-28 h-28 text-secondary pointer-events-none z-20 opacity-80 select-none"
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
        >
          <path d="M120 15 C95 15 65 25 45 55 C32 72 25 92 20 120" stroke-width="1.5" stroke-linecap="round" />
          <path d="M120 35 C102 35 78 45 62 70 C50 88 42 102 38 120" stroke-width="1" stroke-linecap="round" opacity="0.6" />
          <path d="M102 18 Q 90 5, 96 26" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
          <path d="M82 28 Q 70 12, 85 36" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
          <path d="M62 42 Q 48 26, 66 52" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
          <path d="M46 64 Q 30 50 50 74" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
          <path d="M112 32 Q 98 38 114 46" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
          <path d="M92 46 Q 78 52 94 62" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
          <circle cx="108" cy="17" r="3.5" fill="currentColor" />
          <circle cx="90" cy="25" r="3" fill="currentColor" />
          <circle cx="70" cy="38" r="2.5" fill="currentColor" />
          <circle cx="100" cy="28" r="6" stroke-width="1" stroke-dasharray="2 2" />
        </svg>

        <!-- ─── V1 Golden Floral Corner Ornaments (Bottom Left) ─── -->
        <svg
          v-if="theme === 'v1'"
          class="absolute bottom-0 left-0 w-28 h-28 text-secondary pointer-events-none z-20 opacity-80 select-none transform rotate-180"
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
        >
          <path d="M120 15 C95 15 65 25 45 55 C32 72 25 92 20 120" stroke-width="1.5" stroke-linecap="round" />
          <path d="M120 35 C102 35 78 45 62 70 C50 88 42 102 38 120" stroke-width="1" stroke-linecap="round" opacity="0.6" />
          <path d="M102 18 Q 90 5, 96 26" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
          <path d="M82 28 Q 70 12, 85 36" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
          <path d="M62 42 Q 48 26, 66 52" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
          <path d="M46 64 Q 30 50 50 74" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
          <path d="M112 32 Q 98 38 114 46" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
          <path d="M92 46 Q 78 52 94 62" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
          <circle cx="108" cy="17" r="3.5" fill="currentColor" />
          <circle cx="90" cy="25" r="3" fill="currentColor" />
          <circle cx="70" cy="38" r="2.5" fill="currentColor" />
          <circle cx="100" cy="28" r="6" stroke-width="1" stroke-dasharray="2 2" />
        </svg>

        <!-- ─── V2 Gold Foil Corner Ornaments ─── -->
        <template v-if="theme === 'v2'">
          <div class="absolute top-3 left-3 w-6 h-6 pointer-events-none z-20 opacity-90">
            <svg viewBox="0 0 40 40" fill="none" class="w-full h-full text-amber-400">
              <path d="M0 0H20V4H4V20H0V0Z" fill="currentColor" />
              <circle cx="6" cy="6" r="2" fill="currentColor" />
            </svg>
          </div>
          <div class="absolute top-3 right-3 w-6 h-6 pointer-events-none z-20 opacity-90">
            <svg viewBox="0 0 40 40" fill="none" class="w-full h-full text-amber-400">
              <path d="M40 0H20V4H36V20H40V0Z" fill="currentColor" />
              <circle cx="34" cy="6" r="2" fill="currentColor" />
            </svg>
          </div>
          <div class="absolute bottom-3 left-3 w-6 h-6 pointer-events-none z-20 opacity-90">
            <svg viewBox="0 0 40 40" fill="none" class="w-full h-full text-amber-400">
              <path d="M0 40H20V36H4V20H0V40Z" fill="currentColor" />
              <circle cx="6" cy="34" r="2" fill="currentColor" />
            </svg>
          </div>
          <div class="absolute bottom-3 right-3 w-6 h-6 pointer-events-none z-20 opacity-90">
            <svg viewBox="0 0 40 40" fill="none" class="w-full h-full text-amber-400">
              <path d="M40 40H20V36H36V20H40V40Z" fill="currentColor" />
              <circle cx="34" cy="34" r="2" fill="currentColor" />
            </svg>
          </div>
        </template>

        <!-- Double Inner Border Frame (matches V1 card) -->
        <div
          class="absolute inset-[8px] rounded-[24px] border-2 pointer-events-none z-10"
          :class="theme === 'v1' ? 'border-secondary/30' : 'border-amber-500/20'"
        />
        <div
          v-if="theme === 'v1'"
          class="absolute inset-[14px] rounded-[18px] border border-secondary/20 pointer-events-none z-10"
        />

        <!-- ─── V1 Four Frame Corner Ornaments (same as InvitationCard) ─── -->
        <template v-if="theme === 'v1'">
          <svg class="absolute top-3 left-3 w-6 h-6 text-secondary pointer-events-none z-20 opacity-80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 2h8v2H4v6H2V2zm4 4h4v2H6v2H4V6h2z" />
            <circle cx="3" cy="3" r="1.5" />
          </svg>
          <svg class="absolute top-3 right-3 w-6 h-6 text-secondary pointer-events-none z-20 opacity-80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 2h-8v2h6v6h2V2zm-4 4h-4v2h4v2h2V6h-2z" />
            <circle cx="21" cy="3" r="1.5" />
          </svg>
          <svg class="absolute bottom-3 left-3 w-6 h-6 text-secondary pointer-events-none z-20 opacity-80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 22h8v-2H4v-6H2v8zm4-4h4v-2H6v-2H4v4h2z" />
            <circle cx="3" cy="21" r="1.5" />
          </svg>
          <svg class="absolute bottom-3 right-3 w-6 h-6 text-secondary pointer-events-none z-20 opacity-80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 22h-8v-2h6v-6h2v8zm-4-4h-4v-2h4v-2h2v4h-2z" />
            <circle cx="21" cy="21" r="1.5" />
          </svg>
        </template>

        <!-- ═══ Card Content ═══ -->
        <div class="relative z-10 px-6 py-8 flex flex-col items-center">

          <!-- Monogram Laurel Wreath Crest (V1 style) -->
          <div class="mb-2 flex flex-col items-center justify-center">
            <div class="relative w-14 h-14 flex items-center justify-center">
              <svg
                class="w-14 h-14"
                :class="theme === 'v1' ? 'text-secondary' : 'text-amber-400'"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
              >
                <path d="M 50 85 C 30 85 15 70 15 50 C 15 30 30 15 45 15" stroke-width="1.5" stroke-linecap="round" />
                <path d="M 22 72 Q 18 64 26 62 M 16 54 Q 10 48 20 44 M 20 36 Q 16 28 26 28 M 30 22 Q 28 14 38 18" stroke-width="1.2" fill="currentColor" fill-opacity="0.2" />
                <path d="M 50 85 C 70 85 85 70 85 50 C 85 30 70 15 55 15" stroke-width="1.5" stroke-linecap="round" />
                <path d="M 78 72 Q 82 64 74 62 M 84 54 Q 90 48 80 44 M 80 36 Q 84 28 74 28 M 70 22 Q 72 14 62 18" stroke-width="1.2" fill="currentColor" fill-opacity="0.2" />
              </svg>
              <!-- Monogram Initials ស & ដ -->
              <span
                class="absolute font-accent font-semibold text-base tracking-tighter"
                :class="theme === 'v1' ? 'text-secondary-dark' : 'text-amber-200'"
              >
                ស<span
                  class="text-xs italic"
                  :class="theme === 'v1' ? 'text-secondary font-sans' : 'text-amber-400 font-sans'"
                >&amp;</span>ដ
              </span>
            </div>
          </div>

          <!-- Main Title -->
          <div class="mb-3">
            <h2
              class="font-heading text-xl font-bold tracking-wide"
              :class="theme === 'v1' ? 'text-primary' : 'text-amber-200'"
            >
              ពិធីភ្ជាប់ពាក្យ
            </h2>
            <!-- Golden Ornament Line -->
            <div class="flex items-center justify-center gap-2 mt-2 opacity-60">
              <div
                class="h-[1px] w-8"
                :class="theme === 'v1' ? 'bg-secondary' : 'bg-amber-400'"
              />
              <div
                class="w-1.5 h-1.5 rounded-full"
                :class="theme === 'v1' ? 'bg-secondary' : 'bg-amber-400'"
              />
              <div
                class="h-[1px] w-8"
                :class="theme === 'v1' ? 'bg-secondary' : 'bg-amber-400'"
              />
            </div>
          </div>

          <!-- Ornate Guest Name Frame (matches V1 InvitationCard) -->
          <div class="relative mx-auto my-4 px-6 py-3 w-full max-w-sm">
            <!-- Double border for guest box -->
            <div
              class="absolute inset-0 border-2 rounded-lg shadow-[0_0_12px_rgba(197,160,70,0.12)]"
              :class="
                theme === 'v1'
                  ? 'border-secondary/40 bg-secondary/5'
                  : 'border-amber-500/40 bg-amber-500/5'
              "
            />
            <div
              class="absolute inset-[3px] border rounded-md"
              :class="
                theme === 'v1'
                  ? 'border-secondary/20'
                  : 'border-amber-500/20'
              "
            />

            <!-- Guest box corner dot ornaments -->
            <div
              class="absolute -top-1 -left-1 w-2 h-2 rounded-full"
              :class="theme === 'v1' ? 'bg-secondary' : 'bg-amber-400'"
            />
            <div
              class="absolute -top-1 -right-1 w-2 h-2 rounded-full"
              :class="theme === 'v1' ? 'bg-secondary' : 'bg-amber-400'"
            />
            <div
              class="absolute -bottom-1 -left-1 w-2 h-2 rounded-full"
              :class="theme === 'v1' ? 'bg-secondary' : 'bg-amber-400'"
            />
            <div
              class="absolute -bottom-1 -right-1 w-2 h-2 rounded-full"
              :class="theme === 'v1' ? 'bg-secondary' : 'bg-amber-400'"
            />

            <p
              class="relative z-10 font-body text-[10px] font-semibold tracking-[0.2em] uppercase mb-1"
              :class="theme === 'v1' ? 'text-secondary-dark' : 'text-amber-300/80'"
            >
              សូមគោរពអញ្ជើញ
            </p>
            <h3
              class="relative z-10 font-heading text-lg font-bold tracking-wide leading-snug"
              :class="theme === 'v1' ? 'text-secondary-dark' : 'text-amber-100'"
            >
              {{ guestName }}
            </h3>
          </div>

          <!-- Couple Names -->
          <div class="my-3 text-center">
            <p
              class="font-heading text-sm font-bold mb-1"
              :class="theme === 'v1' ? 'text-primary' : 'text-amber-200'"
            >
              លោក វន សីហា &amp; កញ្ញា សួង ដាវីត
            </p>
            <p
              class="font-body text-[11px] leading-relaxed px-3"
              :class="theme === 'v1' ? 'text-primary/60' : 'text-emerald-100/50'"
            >
              សូមគោរពអញ្ជើញលោកអ្នកមកចូលរួមអបអរសាទរពិធីភ្ជាប់ពាក្យរបស់យើងខ្ញុំ
            </p>
          </div>

          <!-- Golden Divider before button -->
          <div class="flex items-center justify-center gap-2 mb-5 opacity-60">
            <div
              class="h-[1px] w-8"
              :class="theme === 'v1' ? 'bg-secondary' : 'bg-amber-400'"
            />
            <div
              class="w-1.5 h-1.5 rounded-full"
              :class="theme === 'v1' ? 'bg-secondary' : 'bg-amber-400'"
            />
            <div
              class="h-[1px] w-8"
              :class="theme === 'v1' ? 'bg-secondary' : 'bg-amber-400'"
            />
          </div>

          <!-- Open Invitation Button -->
          <div class="relative w-full">
            <!-- Pulsing glow ring behind button -->
            <div
              class="absolute inset-0 rounded-full btn-glow-pulse"
              :class="
                theme === 'v1'
                  ? 'bg-secondary/30'
                  : 'bg-amber-400/30'
              "
            />
            <button
              @click="handleOpen"
              class="btn-attention relative z-10 group w-full py-3 px-6 rounded-full font-body text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-lg hover:shadow-xl"
              :class="
                theme === 'v1'
                  ? 'bg-gradient-to-r from-secondary-dark via-secondary to-secondary-dark text-white shadow-[0_4px_20px_rgba(197,160,70,0.35)] hover:shadow-[0_6px_30px_rgba(197,160,70,0.5)]'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-emerald-950 shadow-[0_4px_20px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.55)]'
              "
            >
              <svg
                class="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110"
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

          <!-- Tap hint -->
          <div class="mt-3 flex items-center justify-center gap-1.5 tap-hint-bounce">
            <svg
              class="w-3.5 h-3.5"
              :class="theme === 'v1' ? 'text-secondary/50' : 'text-amber-400/50'"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74a4.5 4.5 0 0 0-9 0c0 1.56.79 2.93 2 3.74zm5.21 1.76l-1.96-.32A1.5 1.5 0 0 0 10.5 14v5.5a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.43-1.05l1.34-4A1.5 1.5 0 0 0 18.34 14h-4.13z" />
            </svg>
            <span
              class="font-body text-[10px] tracking-wider"
              :class="theme === 'v1' ? 'text-secondary' : 'text-amber-400/40'"
            >
              ចុចដើម្បីបើក
            </span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.envelope-card {
  animation: envelopeFloat 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes envelopeFloat {
  0% {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

/* Button gentle bounce to draw attention */
.btn-attention {
  animation: btnBounce 2s ease-in-out 1.2s infinite;
}

@keyframes btnBounce {
  0%, 100% { transform: translateY(0); }
  30% { transform: translateY(-4px); }
  50% { transform: translateY(0); }
  70% { transform: translateY(-2px); }
}

/* Pulsing glow ring behind button */
.btn-glow-pulse {
  animation: glowPulse 2s ease-in-out 1.2s infinite;
  filter: blur(10px);
}

@keyframes glowPulse {
  0%, 100% { opacity: 0; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}

/* Tap hint bouncing arrow */
.tap-hint-bounce {
  animation: hintBounce 1.5s ease-in-out 2s infinite;
}

@keyframes hintBounce {
  0%, 100% { opacity: 0.6; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(4px); }
}

.envelope-reveal-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.envelope-reveal-leave-to {
  opacity: 0;
  transform: scale(1.06);
}
</style>
