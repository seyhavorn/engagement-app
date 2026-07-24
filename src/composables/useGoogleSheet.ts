/**
 * Composable to track invitation envelope opens via Google Sheets Apps Script.
 *
 * Uses Google Apps Script Web App endpoint (VITE_GOOGLE_SHEET_URL).
 *
 * Fire-and-forget background tracking — never blocks the UI.
 */

const DEFAULT_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbJe_WvXOFPAVYKaQOCabaQ8hVNgLpf_p0nbYe2UwrQBlwIrKlTtSLZE_ih58ybN4JVQ/exec';

const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL || DEFAULT_SHEET_URL;

/** Prevent duplicate sends within the same session */
let hasSent = false;

function getDeviceInfo(): string {
  const ua = navigator.userAgent;
  if (/iPad/i.test(ua)) return 'iPad';
  if (/iPhone/i.test(ua)) return 'iPhone';
  if (/Android.*Mobile/i.test(ua)) return 'Android Phone';
  if (/Android/i.test(ua)) return 'Android Tablet';
  if (/Macintosh/i.test(ua)) return 'Mac Desktop';
  if (/Windows/i.test(ua)) return 'Windows Desktop';
  if (/Linux/i.test(ua)) return 'Linux Desktop';
  return 'Unknown';
}

function getBrowserInfo(): string {
  const ua = navigator.userAgent;
  if (/CriOS/i.test(ua)) return 'Chrome (iOS)';
  if (/FxiOS/i.test(ua)) return 'Firefox (iOS)';
  if (/EdgA/i.test(ua) || /Edg/i.test(ua)) return 'Edge';
  if (/OPR/i.test(ua) || /Opera/i.test(ua)) return 'Opera';
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return 'Chrome';
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';
  if (/Firefox/i.test(ua)) return 'Firefox';
  return 'Unknown';
}

function formatDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const hours24 = date.getHours();
  const ampm = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(hours12)}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${ampm}`
  );
}

function buildGetUrl(baseUrl: string, data: Record<string, string>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    params.set(key, value);
  }
  return `${baseUrl}?${params.toString()}`;
}

export function useGoogleSheet() {
  /**
   * Track an envelope open event using Google Apps Script Web App endpoint.
   * Sends both GET query params (Image pixel) and POST body to guarantee execution
   * without 401 warnings in DevTools.
   */
  const trackOpen = (guestName: string, theme: 'v1' | 'v2' = 'v1') => {
    if (!SHEET_URL || hasSent) return;
    hasSent = true;

    const payload: Record<string, string> = {
      guestName,
      openedAt: formatDate(new Date()),
      theme,
      device: getDeviceInfo(),
      browser: getBrowserInfo(),
      pageUrl: decodeURIComponent(window.location.href),
    };

    try {
      const getUrl = buildGetUrl(SHEET_URL, payload);

      // Method 1: Image Pixel (Native GET - Never returns 401)
      const img = new Image();
      img.src = getUrl;

      // Method 2: Fetch GET with mode: 'no-cors'
      fetch(getUrl, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache',
      }).catch(() => {});
    } catch {
      hasSent = false;
    }
  };

  return { trackOpen };
}
