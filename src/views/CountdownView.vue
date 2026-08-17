<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MusicPlayerV2 from '../v2/components/MusicPlayerV2.vue';

const route = useRoute();
const router = useRouter();

// ── Query Parameters ──
const getQueryParam = (key: string): string | null => {
  if (route.query[key] && typeof route.query[key] === 'string') {
    return route.query[key] as string;
  }
  if (window.location.hash.includes('?')) {
    const hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const val = hashParams.get(key);
    if (val) return val;
  }
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(key);
};

const guestName = computed(() => getQueryParam('name') || '');
const youtubeMusicId = computed(
  () => getQueryParam('yt') || getQueryParam('music') || 'XKNgycbj1qo',
);

// Theme: default to 'v1' (Ivory Gold) or 'v2' (Royal Emerald) based on query or user selection
const selectedTheme = ref<'v1' | 'v2'>(
  (getQueryParam('theme') as 'v1' | 'v2') || 'v1',
);

const toggleTheme = () => {
  selectedTheme.value = selectedTheme.value === 'v1' ? 'v2' : 'v1';
};

// ── Wedding Event Info ──
const groomName = 'វន សីហា';
const brideName = 'សួង ដាវីត';
const eventDateKhmer = 'ថ្ងៃសៅរ៍ ទី២២ ខែសីហា ឆ្នាំ២០២៦';
const eventTimeKhmer = 'ម៉ោង ៨:០០ ព្រឹក';
const targetDate = '2026-08-22T08:00:00';
const venueName = 'គេហដ្ឋានខាងស្រី';
const venueAddress = 'ភូមិឬស្សីថ្មី ឃុំចំប៉ា ស្រុកព្រៃកប្បាស ខេត្តតាកែវ';

// ── Live Countdown Logic ──
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const isExpired = ref(false);

const targetTime = new Date(targetDate).getTime();
let timerInterval: number | undefined;

const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
const toKhmerNum = (num: number): string => {
  const formatted = num.toString().padStart(2, '0');
  return formatted
    .split('')
    .map((digit) => khmerDigits[parseInt(digit)] || digit)
    .join('');
};

const updateTimer = () => {
  const now = new Date().getTime();
  const distance = targetTime - now;

  if (distance <= 0) {
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
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
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
  {
    labelKhmer: 'ថ្ងៃ',
    labelEn: 'DAYS',
    val: days.value,
  },
  {
    labelKhmer: 'ម៉ោង',
    labelEn: 'HOURS',
    val: hours.value,
  },
  {
    labelKhmer: 'នាទី',
    labelEn: 'MINUTES',
    val: minutes.value,
  },
  {
    labelKhmer: 'វិនាទី',
    labelEn: 'SECONDS',
    val: seconds.value,
  },
]);

// ── Google Calendar URL Generator ──
const googleCalendarUrl = computed(() => {
  const title = encodeURIComponent(
    `សិរីមង្គលពិធីភ្ជាប់ពាក្យ (${groomName} & ${brideName})`,
  );
  // 2026-08-22 08:00 Cambodia (UTC+7) = 2026-08-22 01:00 UTC
  const start = '20260822T010000Z';
  const end = '20260822T050000Z';
  const details = encodeURIComponent(
    `សូមគោរពអញ្ជើញចូលរួមក្នុងសិរីមង្គលពិធីភ្ជាប់ពាក្យ ${groomName} & ${brideName}\nទីកន្លែង: ${venueName} (${venueAddress})`,
  );
  const location = encodeURIComponent(`${venueName}, ${venueAddress}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
});

const goToInvitation = () => {
  const query = guestName.value ? `?name=${encodeURIComponent(guestName.value)}` : '';
  if (selectedTheme.value === 'v2') {
    router.push(`/v2${query}`);
  } else {
    router.push(`/${query}`);
  }
};
</script>

<template>
  <div
    class="relative min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-x-hidden p-3 sm:p-6 transition-colors duration-700"
    :class="
      selectedTheme === 'v1'
        ? 'bg-[#FFFDF8] text-primary'
        : 'bg-[#09140E] text-amber-100'
    "
  >
    <!-- Background Texture -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 pointer-events-none"
      :class="selectedTheme === 'v1' ? 'opacity-45' : 'opacity-25 mix-blend-overlay'"
      style="background-image: url('/bg-silk.png')"
    />

    <!-- Ambient Gradient Overlays -->
    <div
      v-if="selectedTheme === 'v1'"
      class="absolute inset-0 bg-gradient-to-b from-[#FFFDF8]/70 via-[#FFF9EE]/80 to-[#FFF4E0]/90 pointer-events-none"
    />
    <div
      v-else
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-[#0B1A13]/90 to-[#050C08] pointer-events-none"
    />

    <!-- Floating Gold Particle Sparkles (V2 Emerald Theme) -->
    <div
      v-if="selectedTheme === 'v2'"
      class="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      <div
        class="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-amber-400/40 blur-[1px] animate-ping [animation-duration:4s]"
      />
      <div
        class="absolute top-1/2 right-12 w-3 h-3 rounded-full bg-yellow-300/30 blur-[2px] animate-pulse [animation-duration:3s]"
      />
      <div
        class="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-amber-300/50 blur-[1px] animate-pulse [animation-duration:5s]"
      />
    </div>

    <!-- Music Player Component -->
    <MusicPlayerV2
      :youtube-id="youtubeMusicId"
      :theme="selectedTheme"
    />

    <!-- Top Action Toolbar (Theme Toggle & Home Link) -->
    <div
      class="relative z-20 w-full max-w-[440px] flex items-center justify-between mb-4 px-2"
    >
      <!-- Return to Invitation Card Button -->
      <button
        @click="goToInvitation"
        class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-300 backdrop-blur-md shadow-xs active:scale-95 cursor-pointer"
        :class="
          selectedTheme === 'v1'
            ? 'bg-[#FFFDF8]/90 border border-secondary/40 text-secondary-dark hover:bg-secondary/15 hover:border-secondary'
            : 'bg-emerald-950/80 border border-amber-500/40 text-amber-200 hover:bg-amber-500/20 hover:border-amber-400'
        "
      >
        <svg
          class="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>លិខិតអញ្ជើញ</span>
      </button>

      <!-- Theme Switcher Pill -->
      <button
        @click="toggleTheme"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all duration-300 backdrop-blur-md shadow-xs active:scale-95 cursor-pointer"
        :class="
          selectedTheme === 'v1'
            ? 'bg-[#FFFDF8]/90 border border-secondary/40 text-secondary-dark hover:bg-secondary/15'
            : 'bg-emerald-950/80 border border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
        "
      >
        <span
          class="w-2.5 h-2.5 rounded-full"
          :class="selectedTheme === 'v1' ? 'bg-[#09140E]' : 'bg-[#C5A046]'"
        />
        <span>{{ selectedTheme === 'v1' ? 'Royal Emerald' : 'Ivory Gold' }}</span>
      </button>
    </div>

    <!-- ═══ Main Countdown Showcase Card ═══ -->
    <div
      class="relative z-10 w-full max-w-[440px] rounded-[32px] sm:rounded-[40px] border-2 backdrop-blur-xl overflow-hidden transition-all duration-700 shadow-2xl fade-in-up"
      :class="
        selectedTheme === 'v1'
          ? 'bg-[#FFFDF8]/95 border-secondary/40 shadow-[0_16px_70px_rgba(197,160,70,0.18)] text-primary'
          : 'bg-gradient-to-b from-[#14261D]/95 via-[#0F1E16]/98 to-[#0A1610]/98 border-amber-500/40 shadow-[0_20px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(245,158,11,0.15)] text-amber-100'
      "
    >
      <!-- Double Inner Border Frame Layer 1 -->
      <div
        class="absolute inset-[8px] rounded-[26px] sm:rounded-[34px] border-2 pointer-events-none z-10"
        :class="
          selectedTheme === 'v1'
            ? 'border-secondary/25'
            : 'border-amber-500/25'
        "
      />
      <!-- Double Inner Border Frame Layer 2 -->
      <div
        class="absolute inset-[14px] rounded-[20px] sm:rounded-[28px] border pointer-events-none z-10"
        :class="
          selectedTheme === 'v1'
            ? 'border-secondary/15'
            : 'border-amber-500/15'
        "
      />

      <!-- ─── Top-Right Corner Floral / Foil ─── -->
      <svg
        v-if="selectedTheme === 'v1'"
        class="absolute top-0 right-0 w-28 sm:w-36 h-28 sm:h-36 text-secondary pointer-events-none z-20 opacity-80 select-none"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
      >
        <path d="M120 15 C95 15 65 25 45 55 C32 72 25 92 20 120" stroke-width="1.5" stroke-linecap="round" />
        <path d="M120 35 C102 35 78 45 62 70 C50 88 42 102 38 120" stroke-width="1" stroke-linecap="round" opacity="0.6" />
        <path d="M102 18 Q 90 5, 96 26" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
        <path d="M82 28 Q 70 12, 85 36" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
        <path d="M62 42 Q 48 26, 66 52" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
        <circle cx="108" cy="17" r="3.5" fill="currentColor" />
        <circle cx="90" cy="25" r="3" fill="currentColor" />
        <circle cx="70" cy="38" r="2.5" fill="currentColor" />
      </svg>
      <div
        v-else
        class="absolute top-3 right-3 w-7 h-7 pointer-events-none z-20 opacity-90"
      >
        <svg viewBox="0 0 40 40" fill="none" class="w-full h-full text-amber-400">
          <path d="M40 0H20V4H36V20H40V0Z" fill="currentColor" />
          <circle cx="34" cy="6" r="2" fill="currentColor" />
        </svg>
      </div>

      <!-- ─── Bottom-Left Corner Floral / Foil ─── -->
      <svg
        v-if="selectedTheme === 'v1'"
        class="absolute bottom-0 left-0 w-28 sm:w-36 h-28 sm:h-36 text-secondary pointer-events-none z-20 opacity-80 select-none transform rotate-180"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
      >
        <path d="M120 15 C95 15 65 25 45 55 C32 72 25 92 20 120" stroke-width="1.5" stroke-linecap="round" />
        <path d="M120 35 C102 35 78 45 62 70 C50 88 42 102 38 120" stroke-width="1" stroke-linecap="round" opacity="0.6" />
        <path d="M102 18 Q 90 5, 96 26" stroke-width="1.2" fill="currentColor" fill-opacity="0.3" />
        <circle cx="108" cy="17" r="3.5" fill="currentColor" />
      </svg>
      <div
        v-else
        class="absolute bottom-3 left-3 w-7 h-7 pointer-events-none z-20 opacity-90"
      >
        <svg viewBox="0 0 40 40" fill="none" class="w-full h-full text-amber-400">
          <path d="M0 40H20V36H4V20H0V40Z" fill="currentColor" />
          <circle cx="6" cy="34" r="2" fill="currentColor" />
        </svg>
      </div>

      <!-- Card Inner Body -->
      <div class="relative z-10 px-5 py-7 sm:px-8 sm:py-9 text-center">
        <!-- Monogram Laurel Wreath Logo -->
        <div class="flex flex-col items-center justify-center mb-3">
          <div class="relative w-14 h-14 flex items-center justify-center">
            <svg
              class="w-14 h-14"
              :class="selectedTheme === 'v1' ? 'text-secondary' : 'text-amber-400'"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M 50 85 C 30 85 15 70 15 50 C 15 30 30 15 45 15"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M 22 72 Q 18 64 26 62 M 16 54 Q 10 48 20 44 M 20 36 Q 16 28 26 28 M 30 22 Q 28 14 38 18"
                stroke-width="1.2"
                fill="currentColor"
                fill-opacity="0.2"
              />
              <path
                d="M 50 85 C 70 85 85 70 85 50 C 85 30 70 15 55 15"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M 78 72 Q 82 64 74 62 M 84 54 Q 90 48 80 44 M 80 36 Q 84 28 74 28 M 70 22 Q 72 14 62 18"
                stroke-width="1.2"
                fill="currentColor"
                fill-opacity="0.2"
              />
            </svg>
            <span
              class="absolute font-accent font-semibold text-base tracking-tighter"
              :class="
                selectedTheme === 'v1' ? 'text-secondary-dark' : 'text-amber-200'
              "
            >
              ស<span class="text-xs italic font-sans">&amp;</span>ដ
            </span>
          </div>
        </div>

        <!-- Tagline Pill -->
        <div
          class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-body font-semibold tracking-widest uppercase mb-3 shadow-inner"
          :class="
            selectedTheme === 'v1'
              ? 'bg-secondary/15 border border-secondary/30 text-secondary-dark'
              : 'bg-amber-500/15 border border-amber-500/40 text-amber-300'
          "
        >
          <span
            class="w-1.5 h-1.5 rounded-full animate-ping"
            :class="selectedTheme === 'v1' ? 'bg-secondary' : 'bg-amber-400'"
          />
          <span>រាប់ថយក្រោយសិរីមង្គល</span>
        </div>

        <!-- Main Title -->
        <h1
          class="font-heading text-xl sm:text-2xl font-bold tracking-wide leading-relaxed"
          :class="
            selectedTheme === 'v1' ? 'text-primary' : 'text-amber-200 drop-shadow-md'
          "
        >
          សិរីមង្គលពិធីភ្ជាប់ពាក្យ
        </h1>

        <!-- Couple's Names -->
        <div class="my-2.5 flex items-center justify-center gap-2 sm:gap-3">
          <span
            class="font-heading text-lg sm:text-xl font-semibold tracking-wide"
            :class="
              selectedTheme === 'v1' ? 'text-secondary-dark' : 'text-amber-100'
            "
          >
            {{ groomName }}
          </span>
          <span
            class="font-script text-3xl italic"
            :class="
              selectedTheme === 'v1' ? 'text-secondary-dark' : 'text-amber-400'
            "
          >
            &amp;
          </span>
          <span
            class="font-heading text-lg sm:text-xl font-semibold tracking-wide"
            :class="
              selectedTheme === 'v1' ? 'text-secondary-dark' : 'text-amber-100'
            "
          >
            {{ brideName }}
          </span>
        </div>

        <!-- Personalized Guest Greeting (If present) -->
        <div
          v-if="guestName"
          class="my-3 py-1.5 px-4 rounded-xl border text-center max-w-xs mx-auto"
          :class="
            selectedTheme === 'v1'
              ? 'bg-secondary/5 border-secondary/30 text-secondary-dark'
              : 'bg-emerald-950/60 border-amber-500/30 text-amber-200'
          "
        >
          <p class="font-body text-xs font-semibold">
            សូមគោរពអញ្ជើញ <span class="font-heading font-bold text-sm">{{ guestName }}</span>
          </p>
        </div>

        <!-- Gold Divider -->
        <div class="flex items-center justify-center gap-3 my-4 opacity-75">
          <div
            class="h-[1px] w-12 sm:w-16"
            :class="
              selectedTheme === 'v1'
                ? 'bg-gradient-to-r from-transparent to-secondary'
                : 'bg-gradient-to-r from-transparent to-amber-400'
            "
          />
          <span
            class="text-xs"
            :class="selectedTheme === 'v1' ? 'text-secondary' : 'text-amber-400'"
          >
            ❖
          </span>
          <div
            class="h-[1px] w-12 sm:w-16"
            :class="
              selectedTheme === 'v1'
                ? 'bg-gradient-to-l from-transparent to-secondary'
                : 'bg-gradient-to-l from-transparent to-amber-400'
            "
          />
        </div>

        <!-- ═══ High-Impact Countdown Timer Grid ═══ -->
        <div class="my-5">
          <div
            v-if="isExpired"
            class="py-6 px-4 rounded-2xl border flex flex-col items-center justify-center gap-2"
            :class="
              selectedTheme === 'v1'
                ? 'bg-secondary/10 border-secondary/40 text-secondary-dark'
                : 'bg-amber-500/15 border-amber-400/40 text-amber-200'
            "
          >
            <div class="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 animate-bounce">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </div>
            <h3 class="font-heading text-lg font-bold">
              ពិធីសិរីមង្គលបានចាប់ផ្តើមហើយ!
            </h3>
            <p class="font-body text-xs opacity-90">
              សូមស្វាគមន៍លោកអ្នកយ៉ាងកក់ក្តៅបំផុត!
            </p>
          </div>

          <div v-else class="grid grid-cols-4 gap-2 sm:gap-3">
            <div
              v-for="(item, idx) in timerItems"
              :key="idx"
              class="group relative flex flex-col items-center justify-center py-3.5 px-1.5 sm:py-4 sm:px-2 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-md hover:scale-105"
              :class="
                selectedTheme === 'v1'
                  ? 'bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FFF6E5] border-secondary/40 shadow-[0_6px_20px_rgba(197,160,70,0.18)] hover:border-secondary/80'
                  : 'bg-gradient-to-b from-[#1C2C24]/90 to-[#0F1C16]/95 border-amber-500/40 shadow-[0_6px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(251,191,36,0.2)] hover:border-amber-400'
              "
            >
              <!-- Gold foil Corner Accents -->
              <div
                class="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l"
                :class="
                  selectedTheme === 'v1'
                    ? 'border-secondary/60'
                    : 'border-amber-400/60'
                "
              />
              <div
                class="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r"
                :class="
                  selectedTheme === 'v1'
                    ? 'border-secondary/60'
                    : 'border-amber-400/60'
                "
              />
              <div
                class="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l"
                :class="
                  selectedTheme === 'v1'
                    ? 'border-secondary/60'
                    : 'border-amber-400/60'
                "
              />
              <div
                class="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r"
                :class="
                  selectedTheme === 'v1'
                    ? 'border-secondary/60'
                    : 'border-amber-400/60'
                "
              />

              <!-- Khmer Number (Big & Bold) -->
              <span
                class="font-heading text-2xl sm:text-3xl font-bold tracking-wider leading-none"
                :class="
                  selectedTheme === 'v1'
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-secondary-dark via-amber-800 to-secondary-dark'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 drop-shadow-xs'
                "
              >
                {{ toKhmerNum(item.val) }}
              </span>

              <!-- Latin Digits (Sub-counter) -->
              <span
                class="font-mono text-[10px] font-semibold tracking-wider opacity-60 mt-0.5"
                :class="
                  selectedTheme === 'v1' ? 'text-primary' : 'text-amber-200'
                "
              >
                {{ item.val.toString().padStart(2, '0') }}
              </span>

              <!-- Khmer Label -->
              <span
                class="font-body text-xs sm:text-sm font-semibold mt-1"
                :class="
                  selectedTheme === 'v1'
                    ? 'text-secondary-dark'
                    : 'text-amber-100'
                "
              >
                {{ item.labelKhmer }}
              </span>

              <!-- English Label -->
              <span
                class="font-body text-[9px] tracking-widest uppercase font-bold opacity-60 mt-0.5"
                :class="
                  selectedTheme === 'v1'
                    ? 'text-secondary-dark'
                    : 'text-amber-300'
                "
              >
                {{ item.labelEn }}
              </span>
            </div>
          </div>
        </div>

        <!-- ═══ Date & Location Banner ═══ -->
        <div
          class="my-4 p-4 rounded-2xl border text-center transition-all duration-300"
          :class="
            selectedTheme === 'v1'
              ? 'bg-gradient-to-b from-[#FFFDF8] to-[#FFF8EA] border-secondary/40 shadow-sm'
              : 'bg-gradient-to-b from-[#16271E]/90 to-[#0F1E16]/90 border-amber-500/40 shadow-md'
          "
        >
          <!-- Date -->
          <div class="flex items-center justify-center gap-1.5 text-xs font-semibold mb-1">
            <svg
              class="w-4 h-4"
              :class="selectedTheme === 'v1' ? 'text-secondary-dark' : 'text-amber-400'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span
              class="font-heading text-sm"
              :class="selectedTheme === 'v1' ? 'text-secondary-dark' : 'text-amber-200'"
            >
              {{ eventDateKhmer }}
            </span>
          </div>

          <!-- Time & Venue -->
          <p
            class="font-body text-xs opacity-85 mt-1"
            :class="selectedTheme === 'v1' ? 'text-primary' : 'text-amber-100'"
          >
            {{ eventTimeKhmer }} • {{ venueName }}
          </p>
          <p
            class="font-body text-[11px] opacity-70 mt-0.5 max-w-xs mx-auto"
            :class="selectedTheme === 'v1' ? 'text-primary-muted' : 'text-emerald-200'"
          >
            {{ venueAddress }}
          </p>
        </div>

        <!-- ═══ Action Buttons ═══ -->
        <div class="mt-5 space-y-2.5">
          <!-- Add to Google Calendar -->
          <a
            :href="googleCalendarUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs font-body font-semibold tracking-wide shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            :class="
              selectedTheme === 'v1'
                ? 'bg-gradient-to-r from-secondary-dark via-secondary to-secondary-dark text-white hover:shadow-lg'
                : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-emerald-950 font-bold hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]'
            "
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z"
              />
            </svg>
            <span>បន្ថែមទៅក្នុងប្រតិទិន (Add to Calendar)</span>
          </a>

          <!-- View Full Invitation Button -->
          <button
            @click="goToInvitation"
            class="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-xs font-body font-semibold tracking-wide border transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            :class="
              selectedTheme === 'v1'
                ? 'bg-secondary/10 border-secondary/40 text-secondary-dark hover:bg-secondary/20'
                : 'bg-emerald-950/80 border-amber-500/40 text-amber-200 hover:bg-amber-500/20'
            "
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>បើកមើលលិខិតអញ្ជើញពេញលេញ</span>
          </button>
        </div>

        <!-- Footer Note -->
        <div class="mt-6 text-center select-none opacity-70">
          <p
            class="font-body text-[11px] tracking-wider"
            :class="selectedTheme === 'v1' ? 'text-primary/60' : 'text-emerald-200/60'"
          >
            យើងខ្ញុំរង់ចាំទទួលស្វាគមន៍លោកអ្នកដោយក្តីរីករាយ!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped micro-animations for countdown */
</style>
