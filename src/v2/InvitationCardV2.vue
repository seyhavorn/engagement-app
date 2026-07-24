<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import CountdownTimerV2 from './components/CountdownTimerV2.vue';
import EventScheduleV2 from './components/EventScheduleV2.vue';
import RsvpModalV2 from './components/RsvpModalV2.vue';
import PhotoLightboxModalV2 from './components/PhotoLightboxModalV2.vue';
import MusicPlayerV2 from './components/MusicPlayerV2.vue';

const showRsvp = ref(false);
const showLightbox = ref(false);
const selectedPhotoIndex = ref(0);

// ── Guest Name from URL ──
const route = useRoute();

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

const guestName = computed(() => getQueryParam('name') || 'សុជាតិ និង​អនាគត');
const youtubeMusicId = computed(
  () => getQueryParam('yt') || getQueryParam('music') || 'XKNgycbj1qo',
);

// ── Wedding Event Info ──
const groomName = 'វន សីហា';
const brideName = 'សួង ដាវីត';
const eventDate = 'ថ្ងៃសៅរ៍ ទី២២ ខែសីហា ឆ្នាំ២០២៦';
const eventTime = 'ម៉ោង ៨:០០ ព្រឹក';
const venueName = 'គេហដ្ឋានខាងស្រី';
const venueAddress = 'ឃុំចម្ប៉ា ស្រុកព្រៃកប្បាស ខេត្តតាកែវ';
const invitationMessage =
  'បេះដូងពីរ ស្នេហាមួយ ការចាប់ផ្តើមដ៏ស្រស់ស្អាតមួយ។ យើងខ្ញុំសូមអញ្ជើញលោក លោកស្រី អ្នកនាង កញ្ញា មកចូលរួមអបអរសាទរក្នុងពិធីភ្ជាប់ពាក្យរបស់យើងខ្ញុំ ដើម្បីជាសាក្សីនៃការចាប់ផ្តើមនៃស្នេហាដ៏អស់កល្បរបស់យើង។';
const countdownTarget = '2026-08-22T08:00:00';
const googleMapsUrl = 'https://maps.app.goo.gl/ArXiX3o1sq2NTui99';

// ── Couple Photo Collection ──
const coupleImages = [
  `/images/couple_1.JPG`,
  `/images/couple_2.JPG`,
  `/images/couple_3.JPG`,
  `/images/couple_4.JPG`,
  `/images/couple_5.JPG`,
  `/images/couple_6.JPG`,
  `/images/couple_7.JPG`,
  `/images/couple_8.JPG`,
  `/images/couple_9.JPG`,
  `/images/couple_10.JPG`,
  `/images/couple_11.JPG`,
];

const activeImageIndex = ref(0);
const carouselContainer = ref<HTMLElement | null>(null);

const handleCarouselScroll = (e: Event) => {
  const container = e.target as HTMLElement;
  const width = container.clientWidth;
  if (width > 0) {
    activeImageIndex.value = Math.round(container.scrollLeft / width);
  }
};

const scrollToImage = (idx: number) => {
  activeImageIndex.value = idx;
  if (carouselContainer.value) {
    const width = carouselContainer.value.clientWidth;
    carouselContainer.value.scrollTo({
      left: idx * width,
      behavior: 'smooth',
    });
  }
};

const openLightbox = (index: number) => {
  selectedPhotoIndex.value = index;
  showLightbox.value = true;
};

// ── Gallery Auto-Play Slideshow ──
let galleryAutoplayInterval: number | undefined;

const startGalleryAutoplay = () => {
  stopGalleryAutoplay();
  galleryAutoplayInterval = window.setInterval(() => {
    if (carouselContainer.value) {
      const nextIndex = (activeImageIndex.value + 1) % coupleImages.length;
      scrollToImage(nextIndex);
    }
  }, 3500);
};

const stopGalleryAutoplay = () => {
  if (galleryAutoplayInterval) {
    clearInterval(galleryAutoplayInterval);
    galleryAutoplayInterval = undefined;
  }
};

let observer: IntersectionObserver | undefined;

onMounted(() => {
  startGalleryAutoplay();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer?.observe(el);
  });
});

onUnmounted(() => {
  stopGalleryAutoplay();
  if (observer) {
    observer.disconnect();
  }
});

import OpenEnvelopeModal from '../components/OpenEnvelopeModal.vue';

const musicPlayerRef = ref<any>(null);

const onOpenEnvelope = () => {
  if (musicPlayerRef.value && typeof musicPlayerRef.value.playMusic === 'function') {
    musicPlayerRef.value.playMusic();
  }
};

// Copy Address feedback
const copied = ref(false);
const copyAddress = () => {
  navigator.clipboard.writeText(`${venueName} - ${venueAddress}`);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};
</script>

<template>
  <div
    class="relative min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-start overflow-x-hidden py-8 px-3 sm:py-12 sm:px-6 gap-8 sm:gap-12 bg-[#09140E]"
    style="overflow-y: auto; -webkit-overflow-scrolling: touch"
  >
    <!-- Interactive Ceremonial Open Envelope Modal -->
    <OpenEnvelopeModal :guest-name="guestName" theme="v2" @open="onOpenEnvelope" />
    <!-- Royal Emerald Silk Background Texture with Gold Shimmer -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay pointer-events-none"
      style="background-image: url('/bg-silk.png')"
    />
    <!-- Emerald Radial Glow Overlay -->
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-[#0B1A13]/90 to-[#050C08] pointer-events-none"
    />

    <!-- Ambient Floating Gold Particle Sparkles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
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

    <!-- ─── DESIGN V2 MAIN CARD ─── -->
    <div
      class="relative z-10 w-full max-w-[430px] mx-auto bg-gradient-to-b from-[#12241C]/95 via-[#0D1C15]/95 to-[#08140E]/95 backdrop-blur-xl rounded-[28px] sm:rounded-[36px] shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.15)] border-2 border-amber-500/40 overflow-hidden fade-in-up"
    >
      <!-- Gold Foil Ornaments (Top Left) -->
      <div
        class="absolute top-3 left-3 w-8 h-8 pointer-events-none z-20 opacity-90"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          class="w-full h-full text-amber-400"
        >
          <path d="M0 0H20V4H4V20H0V0Z" fill="currentColor" />
          <circle cx="6" cy="6" r="2" fill="currentColor" />
        </svg>
      </div>
      <!-- Gold Foil Ornaments (Top Right) -->
      <div
        class="absolute top-3 right-3 w-8 h-8 pointer-events-none z-20 opacity-90"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          class="w-full h-full text-amber-400"
        >
          <path d="M40 0H20V4H36V20H40V0Z" fill="currentColor" />
          <circle cx="34" cy="6" r="2" fill="currentColor" />
        </svg>
      </div>
      <!-- Gold Foil Ornaments (Bottom Left) -->
      <div
        class="absolute bottom-3 left-3 w-8 h-8 pointer-events-none z-20 opacity-90"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          class="w-full h-full text-amber-400"
        >
          <path d="M0 40H20V36H4V20H0V40Z" fill="currentColor" />
          <circle cx="6" cy="34" r="2" fill="currentColor" />
        </svg>
      </div>
      <!-- Gold Foil Ornaments (Bottom Right) -->
      <div
        class="absolute bottom-3 right-3 w-8 h-8 pointer-events-none z-20 opacity-90"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          class="w-full h-full text-amber-400"
        >
          <path d="M40 40H20V36H36V20H40V40Z" fill="currentColor" />
          <circle cx="34" cy="34" r="2" fill="currentColor" />
        </svg>
      </div>

      <!-- Inner Gold Border Frame -->
      <div
        class="absolute inset-[8px] rounded-[24px] sm:rounded-[32px] border border-amber-500/30 pointer-events-none z-10"
      />

      <div class="relative z-10 px-6 py-8 sm:px-10 sm:py-11 text-center">
        <!-- Ceremonial Header Tag -->
        <div
          class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-body text-xs font-semibold tracking-widest uppercase mb-4 shadow-inner"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          សូមគោរពអញ្ជើញ
        </div>

        <!-- Main Title -->
        <h1
          class="font-heading text-2xl text-amber-200 font-bold tracking-wide leading-relaxed py-1 block drop-shadow-md"
        >
          ពិធីភ្ជាប់ពាក្យ
        </h1>

        <!-- Decorative Gold Divider -->
        <div class="flex items-center justify-center gap-3 my-4 opacity-80">
          <div
            class="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400"
          />
          <span class="text-amber-400 text-sm">❖</span>
          <div
            class="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400"
          />
        </div>

        <!-- Personalized Guest Greeting Card -->
        <div
          class="my-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-[#14261D]/90 to-emerald-950/80 border border-amber-500/40 shadow-inner text-center"
        >
          <p
            class="font-body text-xs text-amber-300/80 font-medium tracking-widest"
          >
            សូមគោរពអញ្ជើញ
          </p>
          <div
            class="font-heading text-xl text-amber-200 font-bold mt-1 tracking-wide"
          >
            {{ guestName }}
          </div>
        </div>

        <!-- Couple's Names with Traditional Titles -->
        <div class="my-6 space-y-3">
          <!-- Groom -->
          <div class="flex items-center justify-center gap-2">
            <span
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 font-body text-xs font-semibold border border-amber-400/20"
            >
              <svg
                class="w-3 h-3 text-amber-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
              កូនប្រុស
            </span>
            <span
              class="font-heading text-2xl text-amber-100 font-semibold tracking-wide"
            >
              {{ groomName }}
            </span>
          </div>

          <!-- Ampersand -->
          <div
            class="font-script text-4xl text-amber-400 italic my-1 opacity-90 drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)]"
          >
            &amp;
          </div>

          <!-- Bride -->
          <div class="flex items-center justify-center gap-2">
            <span
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 font-body text-xs font-semibold border border-amber-400/20"
            >
              <svg
                class="w-3 h-3 text-amber-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
              កូនស្រី
            </span>
            <span
              class="font-heading text-2xl text-amber-100 font-semibold tracking-wide"
            >
              {{ brideName }}
            </span>
          </div>
        </div>

        <!-- Message -->
        <p
          class="font-body text-xs text-emerald-100/80 leading-relaxed max-w-sm mx-auto my-5"
        >
          {{ invitationMessage }}
        </p>

        <!-- Redesigned Prominent Date & Time Card V2 -->
        <div
          class="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#182C22]/90 via-[#102018]/95 to-[#0B1711]/95 border-2 border-amber-500/50 shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(245,158,11,0.2)] relative overflow-hidden text-center backdrop-blur-md"
        >
          <!-- Gold foil Corner Accents -->
          <div
            class="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-400/80"
          />
          <div
            class="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-400/80"
          />
          <div
            class="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-400/80"
          />
          <div
            class="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-400/80"
          />

          <!-- Calendar Icon Header -->
          <div
            class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 font-body text-xs font-semibold mb-2"
          >
            <svg
              class="w-4 h-4 text-amber-400"
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
            <span>កាលបរិច្ឆេទសិរីមង្គល</span>
          </div>

          <!-- Prominent Date Text -->
          <h3
            class="font-heading text-lg font-bold text-amber-200 tracking-wide leading-relaxed py-1 block drop-shadow-md"
          >
            {{ eventDate }}
          </h3>

          <!-- Time Pill -->
          <div
            class="inline-flex items-center justify-center gap-1.5 mt-3 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-amber-500/40 text-amber-200 font-body text-xs font-semibold"
          >
            <svg
              class="w-3.5 h-3.5 text-amber-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
              />
            </svg>
            <span>{{ eventTime }}</span>
          </div>
        </div>

        <!-- Countdown Timer V2 -->
        <CountdownTimerV2 :target-date="countdownTarget" />

        <!-- Action RSVP Button -->
        <button
          @click="showRsvp = true"
          class="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-emerald-950 font-body text-sm font-bold tracking-wider uppercase shadow-[0_4px_25px_rgba(245,158,11,0.4)] hover:shadow-amber-400/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 my-4 inline-flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            />
          </svg>
          <span>ឆ្លើយតបវត្តមាន (RSVP)</span>
        </button>
      </div>
    </div>

    <!-- ─── DESIGN V2 GALLERY CARD ─── -->
    <div
      class="relative z-10 w-full max-w-[430px] mx-auto bg-gradient-to-b from-[#12241C]/95 via-[#0D1C15]/95 to-[#08140E]/95 backdrop-blur-xl rounded-[28px] sm:rounded-[36px] shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.15)] border-2 border-amber-500/40 overflow-hidden reveal-on-scroll"
    >
      <div class="relative z-10 px-6 py-8 sm:px-10 sm:py-11 text-center">
        <!-- Section Header -->
        <div class="mb-5">
          <h2
            class="font-heading text-xl text-amber-200 font-semibold"
          >
            រូបភាពអនុស្សាវរីយ៍
          </h2>
          <div
            class="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2"
          />
        </div>

        <!-- Main Featured Image Carousel -->
        <div
          class="relative w-full aspect-[3/4] rounded-2xl border-2 border-amber-500/40 overflow-hidden shadow-2xl mb-4 bg-[#0A140F] group"
        >
          <div
            ref="carouselContainer"
            @scroll="handleCarouselScroll"
            class="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth pb-0 scrollbar-none cursor-pointer"
            style="-webkit-overflow-scrolling: touch; scrollbar-width: none"
          >
            <div
              v-for="(img, idx) in coupleImages"
              :key="idx"
              @click="openLightbox(idx)"
              class="w-full h-full shrink-0 snap-center relative group"
            >
              <img
                :src="img"
                alt="Seyha & David"
                class="w-full h-full object-contain select-none transition-transform duration-500 group-hover:scale-105"
                draggable="false"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80"
              />
              <!-- Tap to Expand Icon Overlay -->
              <div
                class="absolute bottom-4 right-4 p-2 rounded-full bg-black/60 border border-amber-400/50 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m-3-3h6"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Carousel Dots -->
          <div
            class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20"
          >
            <span
              v-for="(_, idx) in coupleImages"
              :key="idx"
              class="w-1.5 h-1.5 rounded-full transition-all duration-300"
              :class="
                activeImageIndex === idx ? 'bg-amber-400 w-4' : 'bg-white/50'
              "
            />
          </div>
        </div>

        <!-- Grid Thumbnails for 10 Images -->
        <div class="grid grid-cols-5 gap-1.5 w-full mt-4 select-none">
          <button
            v-for="(img, idx) in coupleImages"
            :key="idx"
            @click="scrollToImage(idx)"
            class="relative aspect-square w-full rounded-xl overflow-hidden border-2 transition-all duration-300"
            :class="
              activeImageIndex === idx
                ? 'border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)] scale-105'
                : 'border-amber-500/20 hover:border-amber-400/50 opacity-70 hover:opacity-100'
            "
          >
            <img
              :src="img"
              alt="Thumbnail"
              class="w-full h-full object-cover pointer-events-none"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- ─── DESIGN V2 PROGRAM SCHEDULE CARD ─── -->
    <div
      class="relative z-10 w-full max-w-[430px] mx-auto bg-gradient-to-b from-[#12241C]/95 via-[#0D1C15]/95 to-[#08140E]/95 backdrop-blur-xl rounded-[28px] sm:rounded-[36px] shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.15)] border-2 border-amber-500/40 overflow-hidden reveal-on-scroll"
    >
      <EventScheduleV2 />
    </div>

    <!-- ─── DESIGN V2 LOCATION MAP CARD ─── -->
    <div
      class="relative z-10 w-full max-w-[430px] mx-auto bg-gradient-to-b from-[#12241C]/95 via-[#0D1C15]/95 to-[#08140E]/95 backdrop-blur-xl rounded-[28px] sm:rounded-[36px] shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.15)] border-2 border-amber-500/40 overflow-hidden reveal-on-scroll"
    >
      <div class="relative z-10 px-6 py-8 sm:px-10 sm:py-11 text-center">
        <!-- Title -->
        <div class="mb-5">
          <h2
            class="font-heading text-xl text-amber-200 font-semibold"
          >
            ទីតាំងកម្មវិធី
          </h2>
          <div
            class="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2"
          />
        </div>

        <!-- Venue details -->
        <div class="mb-5 space-y-1">
          <p class="font-heading text-base text-amber-300 font-bold">
            {{ venueName }}
          </p>
          <p class="font-body text-xs text-emerald-100/80 max-w-xs mx-auto">
            {{ venueAddress }}
          </p>
        </div>

        <!-- Full-Width Google Map -->
        <div
          class="relative -mx-6 sm:-mx-10 border-y border-amber-500/30 overflow-hidden mb-5"
        >
          <iframe
            src="https://maps.google.com/maps?q=11.164417,104.904918&z=16&output=embed"
            class="w-full h-64 border-0 block"
            :allowfullscreen="true"
            loading="lazy"
          ></iframe>
        </div>

        <!-- Buttons Row -->
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            :href="googleMapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-emerald-950 font-body text-xs font-bold tracking-wide shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              />
            </svg>
            មើលផែនទីស្វែងរកផ្លូវ
          </a>

          <button
            @click="copyAddress"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-950/80 border border-amber-500/40 text-amber-200 font-body text-xs font-semibold hover:border-amber-400 transition-all duration-300"
          >
            <svg
              v-if="copied"
              class="w-4 h-4 text-amber-300"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <svg
              v-else
              class="w-4 h-4 text-amber-300"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
              />
            </svg>
            <span>{{ copied ? 'បានចម្លង!' : 'ចម្លងអាសយដ្ឋាន' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Developer Footer Credit -->
    <div class="relative z-10 mt-2 mb-6 text-center select-none">
      <p
        class="font-body text-xs text-amber-200/50 tracking-wider"
      >
        រៀបចំ និងរចនាដោយ
        <span class="font-semibold text-amber-300">VORN Seyha (Lead Software Engineer)</span>
      </p>
    </div>

    <!-- Modals & Music Player -->
    <RsvpModalV2
      :visible="showRsvp"
      :guest-name="guestName"
      @close="showRsvp = false"
    />

    <PhotoLightboxModalV2
      :visible="showLightbox"
      :images="coupleImages"
      :initial-index="selectedPhotoIndex"
      theme="v2"
      @close="showLightbox = false"
    />

    <MusicPlayerV2 ref="musicPlayerRef" :youtube-id="youtubeMusicId" theme="v2" />
  </div>
</template>
