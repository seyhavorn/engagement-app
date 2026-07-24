<script setup lang="ts">
const scheduleItems = [
  {
    time: 'ម៉ោង ៧:១០ ព្រឹក',
    timeEn: '07:10 AM',
    title: 'ភ្ញៀវកិត្តិយសអញ្ជើញមកដល់',
    titleEn: 'Guest Arrival',
    desc: 'ស្វាគមន៍ភ្ញៀវកិត្តិយសយ៉ាងកក់ក្តៅ',
    type: 'welcome',
  },
  {
    time: 'ម៉ោង ៨:០០ ព្រឹក',
    timeEn: '08:00 AM',
    title: 'ពិធីភ្ជាប់ពាក្យចាប់ផ្តើម',
    titleEn: 'Engagement Ceremony Begins',
    desc: 'ពិធីបំពាក់ចិញ្ចៀនភ្ជាប់ពាក្យ និងប្រកាសជាផ្លូវការ',
    type: 'ring',
  },
  {
    time: 'ម៉ោង ៨:៣០ ព្រឹក',
    timeEn: '08:30 AM',
    title: 'ពិធីពិសារស្លាដកកន្សែង',
    titleEn: 'Betrothal Gifts Ceremony',
    desc: 'ពិធីប្រគល់ជំនូន និងបណ្ណាការតាមប្រពៃណី',
    type: 'tea',
  },
  {
    time: 'ម៉ោង ៩:៣០ ព្រឹក',
    timeEn: '09:30 AM',
    title: 'ពិសាភោជនាហារ',
    titleEn: 'Celebration Banquet',
    desc: 'អញ្ជើញភ្ញៀវពិសាភោជនាហារដោយក្តីរីករាយ',
    type: 'banquet',
  },
];
</script>

<template>
  <div class="w-full my-6 px-2">
    <div class="text-center mb-6">
      <span
        class="inline-block px-3.5 py-1 rounded-full bg-secondary/15 border border-secondary/30 text-secondary-dark font-body text-xs font-semibold tracking-widest"
      >
        កាលវិភាគពិធី
      </span>
      <h3 class="font-heading text-xl text-primary mt-2 font-bold">
        កម្មវិធីប្រារព្ធពិធី
      </h3>
      <div
        class="w-16 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-2"
      />
    </div>

    <div class="relative max-w-lg mx-auto">
      <!-- Vertical Connecting Line in Mobile Left Layout -->
      <div
        class="absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-secondary/30 via-secondary/70 to-secondary/30 -translate-x-1/2"
      />

      <div class="space-y-4">
        <div
          v-for="(item, idx) in scheduleItems"
          :key="idx"
          class="relative flex flex-col items-start group"
        >
          <!-- Mobile Left SVG Vector Icon Pin -->
          <div
            class="absolute left-5 -translate-x-1/2 top-3 z-10 w-9 h-9 rounded-full bg-gradient-to-tr from-secondary-dark via-secondary to-amber-300 border-2 border-[#FFFDF8] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300"
          >
            <!-- Welcome SVG -->
            <svg
              v-if="item.type === 'welcome'"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <!-- Ring SVG -->
            <svg
              v-else-if="item.type === 'ring'"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7zm0 10a3 3 0 110-6 3 3 0 010 6z"
              />
            </svg>
            <!-- Tea Blessing SVG -->
            <svg
              v-else-if="item.type === 'tea'"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"
              />
            </svg>
            <!-- Banquet SVG -->
            <svg
              v-else
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v6h-2V6c0-2.21 1.79-4 4-4v20h-2V6z"
              />
            </svg>
          </div>

          <!-- Content Card (Fixed Mobile Layout Alignment) -->
          <div
            class="ml-12 w-[calc(100%-3rem)] p-4 rounded-2xl bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FFF6E5] border border-secondary/40 shadow-[0_4px_16px_rgba(197,160,70,0.15)] backdrop-blur-sm group-hover:border-secondary/70 transition-all duration-300 text-left"
          >
            <div
              class="flex items-center gap-2 text-secondary-dark font-semibold text-xs font-body"
            >
              <span>{{ item.time }}</span>
            </div>
            <h4
              class="font-heading text-base text-primary mt-1 font-bold leading-relaxed"
            >
              {{ item.title }}
            </h4>
            <p
              class="font-body text-xs text-primary/75 mt-1.5 leading-relaxed"
            >
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
