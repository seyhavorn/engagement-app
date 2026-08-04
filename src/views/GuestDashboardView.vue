<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useGuestDashboard } from '../composables/useGuestDashboard';

const {
  guests,
  loading,
  error,
  lastFetched,
  fetchGuests,
  totalOpens,
  uniqueGuests,
  todayOpens,
  deviceBreakdown,
  browserBreakdown,
  themeBreakdown,
  topDevice,
} = useGuestDashboard();

// ── Search & Filters ───────────────────────────────────────
const searchQuery = ref('');
const activeThemeFilter = ref<string | null>(null);
const activeDeviceFilter = ref<string | null>(null);
const activeBrowserFilter = ref<string | null>(null);
const isRefreshing = ref(false);

const filteredGuests = computed(() => {
  let result = guests.value;

  // Search by name
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    result = result.filter((g) =>
      g.guestName?.toLowerCase().includes(q),
    );
  }

  // Filter by theme
  if (activeThemeFilter.value) {
    result = result.filter((g) => g.theme === activeThemeFilter.value);
  }

  // Filter by device
  if (activeDeviceFilter.value) {
    result = result.filter((g) => g.device === activeDeviceFilter.value);
  }

  // Filter by browser
  if (activeBrowserFilter.value) {
    result = result.filter((g) => g.browser === activeBrowserFilter.value);
  }

  return result;
});

// Sort guests: most recent first
const sortedGuests = computed(() => {
  return [...filteredGuests.value].sort((a, b) => {
    const dateA = a.openedAt || '';
    const dateB = b.openedAt || '';
    return dateB.localeCompare(dateA);
  });
});

const hasActiveFilters = computed(() => {
  return (
    searchQuery.value.trim() !== '' ||
    activeThemeFilter.value !== null ||
    activeDeviceFilter.value !== null ||
    activeBrowserFilter.value !== null
  );
});

function clearAllFilters() {
  searchQuery.value = '';
  activeThemeFilter.value = null;
  activeDeviceFilter.value = null;
  activeBrowserFilter.value = null;
}

function toggleThemeFilter(theme: string) {
  activeThemeFilter.value =
    activeThemeFilter.value === theme ? null : theme;
}

function toggleDeviceFilter(device: string) {
  activeDeviceFilter.value =
    activeDeviceFilter.value === device ? null : device;
}

function toggleBrowserFilter(browser: string) {
  activeBrowserFilter.value =
    activeBrowserFilter.value === browser ? null : browser;
}

async function handleRefresh() {
  isRefreshing.value = true;
  await fetchGuests();
  setTimeout(() => {
    isRefreshing.value = false;
  }, 600);
}

function formatLastFetched(date: Date | null): string {
  if (!date) return '—';
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

// ── Lifecycle ──────────────────────────────────────────────
onMounted(() => {
  fetchGuests();
});
</script>

<template>
  <div
    class="min-h-screen w-full bg-[#F7F2E8] font-body select-none relative overflow-x-hidden"
  >
    <!-- Background Glow -->
    <div
      class="fixed top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"
    />
    <div
      class="fixed bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3"
    />

    <!-- Main Content -->
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <header class="mb-8 fade-in-up">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span
              class="inline-block px-3 py-1 rounded-full bg-secondary/15 border border-secondary/30 text-secondary-dark text-[10px] font-semibold tracking-widest uppercase mb-3"
            >
              ផ្ទាំងគ្រប់គ្រង
            </span>
            <h1 class="font-heading text-2xl sm:text-3xl text-primary font-bold">
              បញ្ជីភ្ញៀវដែលបានបើក
            </h1>
            <p class="text-sm text-primary/60 mt-1">
              Guest Tracking Dashboard — វន សីហា &amp; សួង ដាវីត
            </p>
          </div>

          <!-- Refresh Button -->
          <button
            @click="handleRefresh"
            :disabled="loading"
            class="self-start sm:self-end inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-secondary/30 text-secondary-dark text-xs font-semibold hover:bg-secondary/10 hover:border-secondary/50 transition-all duration-300 shadow-sm cursor-pointer disabled:opacity-50"
          >
            <svg
              class="w-4 h-4 transition-transform duration-500"
              :class="{ 'animate-spin': isRefreshing }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            <span>Refresh</span>
            <span v-if="lastFetched" class="text-primary/40 text-[10px]">
              {{ formatLastFetched(lastFetched) }}
            </span>
          </button>
        </div>
      </header>

      <!-- Error Alert -->
      <div
        v-if="error"
        class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 fade-in"
      >
        <svg class="w-5 h-5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
        <div>
          <p class="font-semibold">Error loading data</p>
          <p class="text-xs mt-0.5 opacity-80">{{ error }}</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 fade-in-up fade-in-delay-1">
        <!-- Total Opens -->
        <div
          class="group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white via-[#FFFDF8] to-[#FFF9EE] border border-secondary/25 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center">
              <svg class="w-4 h-4 text-secondary-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span class="text-[10px] font-semibold text-primary/50 uppercase tracking-wider">Total Opens</span>
          </div>
          <p class="text-2xl sm:text-3xl font-bold text-primary">
            <template v-if="loading">
              <span class="inline-block w-12 h-8 bg-secondary/10 rounded animate-pulse" />
            </template>
            <template v-else>{{ totalOpens }}</template>
          </p>
        </div>

        <!-- Unique Guests -->
        <div
          class="group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white via-[#FFFDF8] to-[#FFF9EE] border border-secondary/25 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center">
              <svg class="w-4 h-4 text-secondary-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span class="text-[10px] font-semibold text-primary/50 uppercase tracking-wider">Unique Guests</span>
          </div>
          <p class="text-2xl sm:text-3xl font-bold text-primary">
            <template v-if="loading">
              <span class="inline-block w-12 h-8 bg-secondary/10 rounded animate-pulse" />
            </template>
            <template v-else>{{ uniqueGuests }}</template>
          </p>
        </div>

        <!-- Today's Opens -->
        <div
          class="group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white via-[#FFFDF8] to-[#FFF9EE] border border-secondary/25 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center">
              <svg class="w-4 h-4 text-secondary-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span class="text-[10px] font-semibold text-primary/50 uppercase tracking-wider">Today</span>
          </div>
          <p class="text-2xl sm:text-3xl font-bold text-primary">
            <template v-if="loading">
              <span class="inline-block w-12 h-8 bg-secondary/10 rounded animate-pulse" />
            </template>
            <template v-else>{{ todayOpens }}</template>
          </p>
        </div>

        <!-- Top Device -->
        <div
          class="group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white via-[#FFFDF8] to-[#FFF9EE] border border-secondary/25 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center">
              <svg class="w-4 h-4 text-secondary-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <span class="text-[10px] font-semibold text-primary/50 uppercase tracking-wider">Top Device</span>
          </div>
          <p class="text-lg sm:text-xl font-bold text-primary truncate">
            <template v-if="loading">
              <span class="inline-block w-20 h-6 bg-secondary/10 rounded animate-pulse" />
            </template>
            <template v-else>{{ topDevice }}</template>
          </p>
        </div>
      </div>

      <!-- Search & Filters Bar -->
      <div class="mb-6 space-y-3 fade-in-up fade-in-delay-2">
        <!-- Search Input -->
        <div class="relative">
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ស្វែងរកឈ្មោះភ្ញៀវ... (Search guest name)"
            class="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-secondary/30 text-primary text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 shadow-sm transition-all placeholder:text-primary/30 select-text"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer"
          >
            <svg class="w-3 h-3 text-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Filter Pills -->
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-[10px] font-semibold text-primary/40 uppercase tracking-wider mr-1">Filters:</span>

          <!-- Theme filters -->
          <button
            v-for="(count, theme) in themeBreakdown"
            :key="'theme-' + theme"
            @click="toggleThemeFilter(String(theme))"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer"
            :class="
              activeThemeFilter === String(theme)
                ? 'bg-secondary text-white border-secondary shadow-sm'
                : 'bg-white text-primary/70 border-secondary/25 hover:border-secondary/40 hover:bg-secondary/5'
            "
          >
            <span class="w-2 h-2 rounded-full" :class="String(theme) === 'v1' ? 'bg-amber-400' : 'bg-indigo-400'" />
            {{ String(theme).toUpperCase() }}
            <span class="opacity-60">({{ count }})</span>
          </button>

          <!-- Device filters -->
          <button
            v-for="device in deviceBreakdown.slice(0, 4)"
            :key="'device-' + device.name"
            @click="toggleDeviceFilter(device.name)"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer"
            :class="
              activeDeviceFilter === device.name
                ? 'bg-secondary text-white border-secondary shadow-sm'
                : 'bg-white text-primary/70 border-secondary/25 hover:border-secondary/40 hover:bg-secondary/5'
            "
          >
            {{ device.name }}
            <span class="opacity-60">({{ device.count }})</span>
          </button>

          <!-- Browser filters -->
          <button
            v-for="browser in browserBreakdown.slice(0, 3)"
            :key="'browser-' + browser.name"
            @click="toggleBrowserFilter(browser.name)"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer"
            :class="
              activeBrowserFilter === browser.name
                ? 'bg-secondary text-white border-secondary shadow-sm'
                : 'bg-white text-primary/70 border-secondary/25 hover:border-secondary/40 hover:bg-secondary/5'
            "
          >
            {{ browser.name }}
            <span class="opacity-60">({{ browser.count }})</span>
          </button>

          <!-- Clear filters -->
          <button
            v-if="hasActiveFilters"
            @click="clearAllFilters"
            class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-red-500 bg-red-50 border border-red-200 hover:bg-red-100 transition-all duration-200 cursor-pointer"
          >
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Clear All
          </button>
        </div>
      </div>

      <!-- Results Count -->
      <div class="flex items-center justify-between mb-3 px-1 fade-in-up fade-in-delay-3">
        <p class="text-xs text-primary/50">
          Showing <span class="font-semibold text-primary/80">{{ sortedGuests.length }}</span>
          <template v-if="hasActiveFilters"> of {{ guests.length }}</template>
          {{ sortedGuests.length === 1 ? 'record' : 'records' }}
        </p>
      </div>

      <!-- Guest Table -->
      <div class="rounded-2xl bg-white border border-secondary/25 shadow-sm overflow-hidden fade-in-up fade-in-delay-3">
        <!-- Loading Skeleton -->
        <div v-if="loading && guests.length === 0" class="divide-y divide-secondary/10">
          <div v-for="i in 8" :key="i" class="flex items-center gap-4 px-5 py-4">
            <div class="w-8 h-8 rounded-full bg-secondary/10 animate-pulse shrink-0" />
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-secondary/10 rounded w-1/3 animate-pulse" />
              <div class="h-3 bg-secondary/5 rounded w-1/2 animate-pulse" />
            </div>
            <div class="hidden sm:block h-3 bg-secondary/5 rounded w-16 animate-pulse" />
            <div class="hidden md:block h-3 bg-secondary/5 rounded w-20 animate-pulse" />
            <div class="hidden lg:block h-3 bg-secondary/5 rounded w-16 animate-pulse" />
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="!loading && sortedGuests.length === 0"
          class="flex flex-col items-center justify-center py-16 px-6 text-center"
        >
          <div class="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-secondary/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="17" y1="11" x2="23" y2="11" />
            </svg>
          </div>
          <p class="text-sm font-semibold text-primary/70 mb-1">
            {{ hasActiveFilters ? 'No matching guests' : 'No guest data yet' }}
          </p>
          <p class="text-xs text-primary/40">
            {{
              hasActiveFilters
                ? 'Try adjusting your search or filters.'
                : 'Guest opens will appear here once someone opens the invitation.'
            }}
          </p>
        </div>

        <!-- Data Table -->
        <div v-else class="overflow-x-auto scrollbar-none">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-secondary/15 bg-gradient-to-r from-[#FFFDF8] to-[#FFF9EE]">
                <th class="px-5 py-3 text-[10px] font-bold text-primary/50 uppercase tracking-wider">#</th>
                <th class="px-5 py-3 text-[10px] font-bold text-primary/50 uppercase tracking-wider">Guest Name</th>
                <th class="px-5 py-3 text-[10px] font-bold text-primary/50 uppercase tracking-wider hidden sm:table-cell">
                  Opened At
                </th>
                <th class="px-5 py-3 text-[10px] font-bold text-primary/50 uppercase tracking-wider hidden md:table-cell">
                  Theme
                </th>
                <th class="px-5 py-3 text-[10px] font-bold text-primary/50 uppercase tracking-wider hidden md:table-cell">
                  Device
                </th>
                <th class="px-5 py-3 text-[10px] font-bold text-primary/50 uppercase tracking-wider hidden lg:table-cell">
                  Browser
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-secondary/8">
              <tr
                v-for="(guest, index) in sortedGuests"
                :key="index"
                class="hover:bg-secondary/5 transition-colors duration-150"
              >
                <td class="px-5 py-3.5 text-xs text-primary/40 font-mono">
                  {{ index + 1 }}
                </td>
                <td class="px-5 py-3.5">
                  <div class="flex items-center gap-3">
                    <!-- Avatar initial -->
                    <div
                      class="w-8 h-8 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20"
                    >
                      <span class="text-xs font-bold text-secondary-dark">
                        {{ guest.guestName?.charAt(0) || '?' }}
                      </span>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-primary leading-tight">
                        {{ guest.guestName || 'Unknown Guest' }}
                      </p>
                      <!-- Mobile: show date below name -->
                      <p class="text-[10px] text-primary/40 mt-0.5 sm:hidden">
                        {{ guest.openedAt || '—' }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-3.5 text-xs text-primary/60 hidden sm:table-cell whitespace-nowrap">
                  {{ guest.openedAt || '—' }}
                </td>
                <td class="px-5 py-3.5 hidden md:table-cell">
                  <span
                    class="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                    :class="
                      guest.theme === 'v1'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : guest.theme === 'v2'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-gray-50 text-gray-500 border border-gray-200'
                    "
                  >
                    {{ guest.theme || '—' }}
                  </span>
                </td>
                <td class="px-5 py-3.5 text-xs text-primary/60 hidden md:table-cell">
                  {{ guest.device || '—' }}
                </td>
                <td class="px-5 py-3.5 text-xs text-primary/60 hidden lg:table-cell">
                  {{ guest.browser || '—' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center fade-in-up fade-in-delay-4">
        <p class="text-[10px] text-primary/30 tracking-wide">
          Data sourced from Google Sheets &middot; Engagement App Dashboard
        </p>
      </div>
    </div>
  </div>
</template>
