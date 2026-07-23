<script setup lang="ts">
import { ref, computed } from 'vue';
import CountdownTimer from './CountdownTimer.vue';
import RsvpModal from './RsvpModal.vue';

const showRsvp = ref(false);

// ── ឈ្មោះភ្ញៀវពី URL (e.g. ?name=សុជាតិ) ──
const urlParams = new URLSearchParams(window.location.search);
const guestName = computed(() => urlParams.get('name') || 'សុជាតិ');

// ── ព័ត៌មានអំពីពិធី ──
const groomName = 'វន សីហា';
const brideName = 'សួង ដាវីត';
const eventDate = 'ថ្ងៃសៅរ៍ ទី២២ ខែសីហា ឆ្នាំ២០២៦';
const eventTime = 'ម៉ោង ៨:០០ ព្រឹក';
const venueName = 'គេហដ្ឋានខាងស្រី';
const venueAddress = 'ឃុំចម្ប៉ា ស្រុកព្រៃកប្បាស ខេត្តតាកែវ';
const invitationMessage =
  'បេះដូងពីរ ស្នេហាមួយ ការចាប់ផ្តើមដ៏ស្រស់ស្អាតមួយ។ យើងខ្ញុំសូមអញ្ជើញលោក លោកស្រី អ្នកនាង កញ្ញា មកចូលរួមអបអរសាទរក្នុងពិធីភ្ជាប់ពាក្យរបស់យើងខ្ញុំ ដើម្បីជាសាក្សីនៃការចាប់ផ្តើមនៃស្នេហាដ៏អស់កល្បរបស់យើង។';
const countdownTarget = '2026-08-22T08:00:00';
const googleMapsUrl =
  'https://maps.app.goo.gl/ArXiX3o1sq2NTui99';

// ── Gallery State ──
const activeImageIndex = ref(0);
const coupleImages = [
  'images/seyha_david_1.jpg',
  'images/seyha_david_2.JPG',
  'images/seyha_david_3.jpg',
  'images/seyha_david_4.JPG',
  'images/seyha_david_5.jpg',
  'images/seyha_david_6.jpg',
];
</script>

<template>
  <div
    class="relative min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-start overflow-x-hidden py-8 px-3 sm:py-12 sm:px-6 gap-8 sm:gap-12"
  >
    <!-- Background Image with Soft Texture -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-60"
      style="background-image: url('bg-silk.png')"
    />
    <!-- Light Ivory overlay -->
    <div class="absolute inset-0 bg-[#FFFDF8]/70 backdrop-blur-[2px]" />

    <!-- ─── Invitation Card ─── -->
    <div
      class="relative z-10 w-full max-w-[480px] mx-auto my-auto bg-[#FFFDF8]/95 backdrop-blur-md rounded-[28px] sm:rounded-[36px] shadow-[0_12px_60px_rgba(197,160,70,0.12),0_4px_25px_rgba(0,0,0,0.04)] border-2 border-secondary/30 overflow-hidden fade-in-up"
    >
      <!-- Top Right Golden Floral Corner Ornament -->
      <svg
        class="absolute top-0 right-0 w-32 sm:w-44 h-32 sm:h-44 text-secondary pointer-events-none z-20 opacity-80 select-none"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
      >
        <!-- Main Floral Branch Curve -->
        <path
          d="M120 15 C95 15 65 25 45 55 C32 72 25 92 20 120"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M120 35 C102 35 78 45 62 70 C50 88 42 102 38 120"
          stroke-width="1"
          stroke-linecap="round"
          opacity="0.6"
        />

        <!-- Leaves -->
        <path
          d="M102 18 Q 90 5, 96 26"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />
        <path
          d="M82 28 Q 70 12, 85 36"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />
        <path
          d="M62 42 Q 48 26, 66 52"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />
        <path
          d="M46 64 Q 30 50 50 74"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />

        <path
          d="M112 32 Q 98 38 114 46"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />
        <path
          d="M92 46 Q 78 52 94 62"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />
        <path
          d="M72 65 Q 58 72 74 82"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />

        <!-- Flower Blossoms & Berries -->
        <circle cx="108" cy="17" r="3.5" fill="currentColor" />
        <circle cx="90" cy="25" r="3" fill="currentColor" />
        <circle cx="70" cy="38" r="2.5" fill="currentColor" />
        <circle cx="52" cy="58" r="2.5" fill="currentColor" />
        <circle cx="34" cy="82" r="2" fill="currentColor" />

        <!-- Decorative Floral Ring Accents -->
        <circle
          cx="100"
          cy="28"
          r="6"
          stroke-width="1"
          stroke-dasharray="2 2"
        />
        <circle cx="78" cy="42" r="5" stroke-width="1" stroke-dasharray="2 2" />
      </svg>

      <!-- Bottom Left Golden Floral Corner Ornament -->
      <svg
        class="absolute bottom-0 left-0 w-32 sm:w-44 h-32 sm:h-44 text-secondary pointer-events-none z-20 opacity-80 select-none transform rotate-180"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
      >
        <!-- Main Floral Branch Curve -->
        <path
          d="M120 15 C95 15 65 25 45 55 C32 72 25 92 20 120"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M120 35 C102 35 78 45 62 70 C50 88 42 102 38 120"
          stroke-width="1"
          stroke-linecap="round"
          opacity="0.6"
        />

        <!-- Leaves -->
        <path
          d="M102 18 Q 90 5, 96 26"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />
        <path
          d="M82 28 Q 70 12, 85 36"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />
        <path
          d="M62 42 Q 48 26, 66 52"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />
        <path
          d="M46 64 Q 30 50 50 74"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />

        <path
          d="M112 32 Q 98 38 114 46"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />
        <path
          d="M92 46 Q 78 52 94 62"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />
        <path
          d="M72 65 Q 58 72 74 82"
          stroke-width="1.2"
          fill="currentColor"
          fill-opacity="0.3"
        />

        <!-- Flower Blossoms & Berries -->
        <circle cx="108" cy="17" r="3.5" fill="currentColor" />
        <circle cx="90" cy="25" r="3" fill="currentColor" />
        <circle cx="70" cy="38" r="2.5" fill="currentColor" />
        <circle cx="52" cy="58" r="2.5" fill="currentColor" />
        <circle cx="34" cy="82" r="2" fill="currentColor" />

        <!-- Decorative Floral Ring Accents -->
        <circle
          cx="100"
          cy="28"
          r="6"
          stroke-width="1"
          stroke-dasharray="2 2"
        />
        <circle cx="78" cy="42" r="5" stroke-width="1" stroke-dasharray="2 2" />
      </svg>

      <!-- Double Inner Border Frame Layer 1 -->
      <div
        class="absolute inset-[8px] rounded-[24px] sm:rounded-[32px] border-2 border-secondary/30 pointer-events-none z-10"
      />
      <!-- Double Inner Border Frame Layer 2 -->
      <div
        class="absolute inset-[14px] rounded-[18px] sm:rounded-[26px] border border-secondary/20 pointer-events-none z-10"
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

      <!-- Card Main Content Container -->
      <div class="relative z-10 px-6 py-8 sm:px-10 sm:py-11 text-center">
        <!-- Monogram Laurel Wreath Crest Logo -->
        <div
          class="fade-in fade-in-delay-1 mb-2 flex flex-col items-center justify-center"
        >
          <div class="relative w-16 h-16 flex items-center justify-center">
            <!-- Laurel Wreath SVG in Secondary Gold -->
            <svg
              class="w-16 h-16 text-secondary"
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
            <!-- Monogram Initials (ស & ដ) -->
            <span
              class="absolute font-accent font-semibold text-lg text-secondary-dark tracking-tighter"
            >
              ស<span class="text-secondary font-sans text-xs italic">&amp;</span
              >ដ
            </span>
          </div>
        </div>

        <!-- Header: "សូមគោរពអញ្ជើញចូលរួម" -->
        <div class="fade-in fade-in-delay-1 mb-3">
          <p
            class="font-body text-xs sm:text-sm tracking-[0.15em] text-secondary font-medium uppercase"
          >
            សូមគោរពអញ្ជើញចូលរួម
          </p>
          <h2
            class="font-heading text-lg sm:text-xl tracking-wide text-primary font-normal mt-1"
          >
            ពិធីភ្ជាប់ពាក្យ
          </h2>
          <!-- Golden Ornament Line -->
          <div class="flex items-center justify-center gap-2 mt-2 opacity-60">
            <div class="h-[1px] w-8 bg-secondary" />
            <div class="w-1.5 h-1.5 rounded-full bg-secondary" />
            <div class="h-[1px] w-8 bg-secondary" />
          </div>
        </div>

        <!-- Ornate Guest Name Frame (if ?name=...) -->
        <div
          v-if="guestName"
          class="fade-in fade-in-delay-1 relative mx-auto my-4 px-6 py-3 max-w-sm"
        >
          <!-- Double border for guest box -->
          <div
            class="absolute inset-0 border-2 border-secondary/40 rounded-lg shadow-[0_0_12px_rgba(197,160,70,0.12)] bg-secondary/5"
          />
          <div
            class="absolute inset-[3px] border border-secondary/20 rounded-md"
          />

          <!-- Guest box corner ornaments -->
          <div
            class="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-secondary"
          />
          <div
            class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-secondary"
          />
          <div
            class="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-secondary"
          />
          <div
            class="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-secondary"
          />

          <p
            class="relative z-10 font-body text-[10px] tracking-wider text-primary-muted uppercase"
          >
            ជូនចំពោះ
          </p>
          <p
            class="relative z-10 font-heading text-base sm:text-lg text-secondary-dark font-normal mt-0.5"
          >
            លោក {{ guestName }} និង អនាគត
          </p>
        </div>

        <!-- Couple's Names: Groom on Left, Ampersand Center, Bride on Right -->
        <div
          class="fade-in fade-in-delay-2 my-5 sm:my-6 flex items-center justify-center gap-3 sm:gap-6"
        >
          <!-- Left: Groom Block -->
          <div
            class="flex flex-col items-center text-center flex-1 max-w-[170px] sm:max-w-[200px]"
          >
            <div class="flex items-center justify-center gap-1 mb-1 opacity-90">
              <svg
                class="w-3 h-3 text-secondary fill-secondary"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
              <span
                class="font-body text-[10px] sm:text-xs text-secondary font-semibold tracking-wider"
              >
                កូនប្រុស
              </span>
            </div>
            <h1
              class="font-heading text-xl sm:text-2xl md:text-3xl text-primary font-normal leading-tight tracking-wide"
            >
              {{ groomName }}
            </h1>
          </div>

          <!-- Center: Gold Calligraphy Ampersand -->
          <div class="flex items-center justify-center shrink-0">
            <span
              class="font-script text-2xl sm:text-3xl md:text-4xl text-secondary-dark italic leading-none"
            >
              &amp;
            </span>
          </div>

          <!-- Right: Bride Block -->
          <div
            class="flex flex-col items-center text-center flex-1 max-w-[170px] sm:max-w-[200px]"
          >
            <div class="flex items-center justify-center gap-1 mb-1 opacity-90">
              <svg
                class="w-3 h-3 text-secondary fill-secondary"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
              <span
                class="font-body text-[10px] sm:text-xs text-secondary font-semibold tracking-wider"
              >
                កូនស្រី
              </span>
            </div>
            <h1
              class="font-heading text-xl sm:text-2xl md:text-3xl text-primary font-normal leading-tight tracking-wide"
            >
              {{ brideName }}
            </h1>
          </div>
        </div>

        <!-- Gold Star Ornament Divider in Secondary Color -->
        <div
          class="fade-in fade-in-delay-3 flex items-center justify-center gap-3 my-4"
        >
          <div
            class="h-[1px] w-14 sm:w-20 bg-gradient-to-r from-transparent via-secondary/60 to-secondary/80"
          />
          <svg
            class="w-3.5 h-3.5 text-secondary fill-secondary"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
            />
          </svg>
          <div
            class="h-[1px] w-14 sm:w-20 bg-gradient-to-l from-transparent via-secondary/60 to-secondary/80"
          />
        </div>

        <!-- Date & Time Section -->
        <div class="fade-in fade-in-delay-3 my-3">
          <div class="flex justify-center mb-1 text-secondary">
            <svg
              class="w-4 h-4"
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
          </div>
          <p
            class="font-accent text-xs sm:text-sm tracking-wide text-primary font-bold"
          >
            {{ eventDate }}
          </p>
          <p class="font-body text-xs text-primary-muted mt-0.5">
            {{ eventTime }}
          </p>
        </div>

        <!-- Venue Section -->
        <div class="fade-in fade-in-delay-4 my-4">
          <div class="flex justify-center mb-1 text-secondary">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              />
            </svg>
          </div>
          <p
            class="font-accent text-xs sm:text-sm tracking-wide text-primary font-bold"
          >
            {{ venueName }}
          </p>
          <p
            class="font-body text-xs text-primary-muted mt-0.5 max-w-xs mx-auto"
          >
            {{ venueAddress }}
          </p>

          <!-- View Location on Map Pill Button (Secondary Gold Outline) -->
          <a
            :href="googleMapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 mt-2.5 px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 hover:bg-secondary/20 text-secondary-dark text-[10px] sm:text-xs font-body font-medium tracking-wider transition-all duration-200 group shadow-xs"
          >
            <svg
              class="w-3.5 h-3.5 group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path
                d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
              />
            </svg>
            មើលទីតាំងនៅលើផែនទី
          </a>
        </div>

        <!-- Romantic Message -->
        <div class="fade-in fade-in-delay-5 my-4">
          <div class="flex items-center justify-center gap-2 mb-2 opacity-60">
            <div class="h-[1px] w-10 bg-secondary" />
            <div class="w-1.5 h-1.5 rounded-full bg-secondary" />
            <div class="h-[1px] w-10 bg-secondary" />
          </div>

          <p
            class="font-body text-xs sm:text-sm text-primary leading-relaxed max-w-xs mx-auto"
          >
            "{{ invitationMessage }}"
          </p>
        </div>

        <!-- Countdown Timer -->
        <div class="fade-in fade-in-delay-6 mt-5 mb-6">
          <p
            class="font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase text-primary-muted mb-3"
          >
            រាប់ថយក្រោយទៅកាន់ថ្ងៃពិសេសរបស់យើង
          </p>
          <CountdownTimer :target-date="countdownTarget" />
        </div>

        <!-- Solid Secondary Gold Gradient RSVP Pill Button -->
        <!-- <div class="fade-in fade-in-delay-7 my-5">
          <button
            @click="showRsvp = true"
            class="group relative inline-flex items-center justify-center gap-2.5 px-9 sm:px-11 py-3.5 rounded-full bg-gradient-to-r from-secondary-dark via-secondary to-secondary-dark text-white font-body text-xs sm:text-sm font-medium tracking-wide shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <svg
              class="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            ឆ្លើយតបឥឡូវ
          </button>
        </div> -->

        <!-- Footer Note -->
        <div class="fade-in fade-in-delay-8 mt-4 flex flex-col items-center">
          <div
            class="w-1.5 h-1.5 rounded-full bg-secondary mb-1.5 opacity-80"
          />
          <p
            class="font-body text-xs sm:text-sm text-secondary-dark opacity-95 tracking-wide font-medium"
          >
            យើងខ្ញុំរង់ចាំទទួលស្វាគមន៍លោកអ្នកដោយក្តីរីករាយ!
          </p>
        </div>
      </div>
    </div>

    <!-- ─── Gallery Card ─── -->
    <div
      class="relative z-10 w-full max-w-[480px] mx-auto bg-[#FFFDF8]/95 backdrop-blur-md rounded-[28px] sm:rounded-[36px] shadow-[0_12px_60px_rgba(197,160,70,0.12),0_4px_25px_rgba(0,0,0,0.04)] border-2 border-secondary/30 overflow-hidden fade-in-up"
    >
      <!-- Double Inner Border Frame Layer 1 -->
      <div
        class="absolute inset-[8px] rounded-[24px] sm:rounded-[32px] border-2 border-secondary/30 pointer-events-none z-10"
      />
      <!-- Double Inner Border Frame Layer 2 -->
      <div
        class="absolute inset-[14px] rounded-[18px] sm:rounded-[26px] border border-secondary/20 pointer-events-none z-10"
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

      <!-- Card Main Content Container -->
      <div class="relative z-10 px-6 py-8 sm:px-10 sm:py-11 text-center">
        <!-- Title: រូបភាពអនុស្សាវរីយ៍ -->
        <div class="fade-in mb-5">
          <h2
            class="font-heading text-lg sm:text-xl tracking-wide text-primary font-normal"
          >
            រូបភាពអនុស្សាវរីយ៍
          </h2>
          <p
            class="font-body text-[10px] sm:text-xs text-secondary font-medium tracking-widest uppercase mt-0.5"
          >
            Gallery of Love
          </p>
          <div class="flex items-center justify-center gap-2 mt-2 opacity-60">
            <div class="h-[1px] w-8 bg-secondary" />
            <div class="w-1.5 h-1.5 rounded-full bg-secondary" />
            <div class="h-[1px] w-8 bg-secondary" />
          </div>
        </div>

        <!-- Featured Couple Image -->
        <div
          class="relative aspect-[3/4] w-full rounded-2xl border-2 border-secondary/40 overflow-hidden shadow-md mb-5 group bg-black/5"
        >
          <img
            :src="coupleImages[activeImageIndex]"
            alt="Seyha & David"
            class="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
          />
          <!-- Image overlay shade -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
          />
        </div>

        <!-- Symmetrical Photo Thumbnails Grid -->
        <div class="grid grid-cols-6 gap-2">
          <button
            v-for="(img, idx) in coupleImages"
            :key="idx"
            @click="activeImageIndex = idx"
            class="relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 select-none overflow-hidden"
            :class="
              activeImageIndex === idx
                ? 'border-secondary shadow-md scale-105'
                : 'border-secondary/20 hover:border-secondary/50 hover:scale-102'
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

    <!-- ─── Location & Map Card ─── -->
    <div
      class="relative z-10 w-full max-w-[480px] mx-auto bg-[#FFFDF8]/95 backdrop-blur-md rounded-[28px] sm:rounded-[36px] shadow-[0_12px_60px_rgba(197,160,70,0.12),0_4px_25px_rgba(0,0,0,0.04)] border-2 border-secondary/30 overflow-hidden fade-in-up"
    >
      <!-- Double Inner Border Frame Layer 1 -->
      <div
        class="absolute inset-[8px] rounded-[24px] sm:rounded-[32px] border-2 border-secondary/30 pointer-events-none z-10"
      />
      <!-- Double Inner Border Frame Layer 2 -->
      <div
        class="absolute inset-[14px] rounded-[18px] sm:rounded-[26px] border border-secondary/20 pointer-events-none z-10"
      />

      <!-- Four Frame Corner Ornaments (Top-Left) -->
      <svg class="absolute top-3 left-3 w-6 h-6 text-secondary pointer-events-none z-20 opacity-80" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 2h8v2H4v6H2V2zm4 4h4v2H6v2H4V6h2z" />
        <circle cx="3" cy="3" r="1.5" />
      </svg>
      <!-- Four Frame Corner Ornaments (Top-Right) -->
      <svg class="absolute top-3 right-3 w-6 h-6 text-secondary pointer-events-none z-20 opacity-80" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 2h-8v2h6v6h2V2zm-4 4h-4v2h4v2h2V6h-2z" />
        <circle cx="21" cy="3" r="1.5" />
      </svg>
      <!-- Four Frame Corner Ornaments (Bottom-Left) -->
      <svg class="absolute bottom-3 left-3 w-6 h-6 text-secondary pointer-events-none z-20 opacity-80" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 22h8v-2H4v-6H2v8zm4-4h4v-2H6v-2H4v4h2z" />
        <circle cx="3" cy="21" r="1.5" />
      </svg>
      <!-- Four Frame Corner Ornaments (Bottom-Right) -->
      <svg class="absolute bottom-3 right-3 w-6 h-6 text-secondary pointer-events-none z-20 opacity-80" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 22h-8v-2h6v-6h2v8zm-4-4h-4v-2h4v-2h2v4h-2z" />
        <circle cx="21" cy="21" r="1.5" />
      </svg>

      <!-- Card Main Content Container -->
      <div class="relative z-10 px-6 py-8 sm:px-10 sm:py-11 text-center">
        <!-- Title: ទីតាំងកម្មវិធី -->
        <div class="fade-in mb-5">
          <h2 class="font-heading text-lg sm:text-xl tracking-wide text-primary font-normal">
            ទីតាំងកម្មវិធី
          </h2>
          <p class="font-body text-[10px] sm:text-xs text-secondary font-medium tracking-widest uppercase mt-0.5">
            Event Location
          </p>
          <div class="flex items-center justify-center gap-2 mt-2 opacity-60">
            <div class="h-[1px] w-8 bg-secondary" />
            <div class="w-1.5 h-1.5 rounded-full bg-secondary" />
            <div class="h-[1px] w-8 bg-secondary" />
          </div>
        </div>

        <!-- Venue details -->
        <div class="mb-5">
          <p class="font-accent text-sm sm:text-base text-primary font-bold">
            {{ venueName }}
          </p>
          <p class="font-body text-xs text-primary-muted mt-1 max-w-xs mx-auto">
            {{ venueAddress }}
          </p>
        </div>

        <!-- Embedded Google Map -->
        <div class="relative w-full rounded-2xl border-2 border-secondary/40 overflow-hidden shadow-md mb-5">
          <iframe
            src="https://maps.google.com/maps?q=11.164417,104.904918&z=16&output=embed"
            class="w-full h-64 border-0"
            :allowfullscreen="true"
            loading="lazy"
          ></iframe>
        </div>

        <!-- Directions link -->
        <div>
          <a
            :href="googleMapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-secondary-dark via-secondary to-secondary-dark text-white font-body text-xs sm:text-sm font-medium tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            មើលផែនទីស្វែងរកផ្លូវ
          </a>
        </div>
      </div>
    </div>

    <!-- Developer Footer Credit -->
    <div class="relative z-10 mt-2 mb-6 text-center select-none">
      <p class="font-body text-[10px] sm:text-xs text-primary/60 tracking-wider">
        Created by <span class="font-semibold text-secondary-dark">Seyha VORN</span> (Senior Software Engineer)
      </p>
    </div>

    <!-- RSVP Modal -->
    <RsvpModal
      :visible="showRsvp"
      :guest-name="guestName"
      @close="showRsvp = false"
    />
  </div>
</template>
