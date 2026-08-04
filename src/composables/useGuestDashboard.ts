/**
 * Composable to fetch and manage guest tracking data from Google Sheets.
 *
 * Reads data via GET from the same Google Apps Script endpoint used for tracking.
 * Provides reactive guest list, loading/error state, computed stats, and refresh.
 */
import { ref, computed } from 'vue';

export interface Guest {
  guestName: string;
  openedAt: string;
  theme: string;
  device: string;
  browser: string;
  pageUrl: string;
}

interface SheetResponse {
  status: string;
  data: Guest[];
  message?: string;
}

const DEFAULT_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbzSdqTOFn2p-yXer6BKuuA03XrYD6MllrzWEPXMM_9IiuMuaoebbx3q9Ga8iccGaa1adw/exec';

const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL || DEFAULT_SHEET_URL;

export function useGuestDashboard() {
  const guests = ref<Guest[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const lastFetched = ref<Date | null>(null);

  // ── Fetch guests from Google Sheets ──────────────────────
  const fetchGuests = async () => {
    if (!SHEET_URL) {
      error.value = 'Google Sheet URL is not configured.';
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(SHEET_URL, {
        method: 'GET',
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const json: SheetResponse = await response.json();

      if (json.status === 'success') {
        guests.value = json.data || [];
        lastFetched.value = new Date();
      } else {
        throw new Error(json.message || 'Failed to fetch guest data.');
      }
    } catch (err: any) {
      error.value = err.message || 'An unknown error occurred.';
      console.error('[GuestDashboard] Fetch error:', err);
    } finally {
      loading.value = false;
    }
  };

  // ── Computed Stats ───────────────────────────────────────
  const totalOpens = computed(() => guests.value.length);

  const uniqueGuests = computed(() => {
    const names = new Set(
      guests.value
        .map((g) => g.guestName?.trim())
        .filter(Boolean),
    );
    return names.size;
  });

  const todayOpens = computed(() => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    return guests.value.filter((g) => {
      if (!g.openedAt) return false;
      // Handle format: "2026-08-04 02:30:15 PM" → extract date part
      const datePart = g.openedAt.split(' ')[0];
      return datePart === today;
    }).length;
  });

  const deviceBreakdown = computed(() => {
    const map: Record<string, number> = {};
    guests.value.forEach((g) => {
      const device = g.device || 'Unknown';
      map[device] = (map[device] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  });

  const browserBreakdown = computed(() => {
    const map: Record<string, number> = {};
    guests.value.forEach((g) => {
      const browser = g.browser || 'Unknown';
      map[browser] = (map[browser] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  });

  const themeBreakdown = computed(() => {
    const map: Record<string, number> = {};
    guests.value.forEach((g) => {
      const theme = g.theme || 'unknown';
      map[theme] = (map[theme] || 0) + 1;
    });
    return map;
  });

  const topDevice = computed(() => {
    return deviceBreakdown.value[0]?.name || '—';
  });

  return {
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
  };
}
