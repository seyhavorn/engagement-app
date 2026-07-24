/**
 * Composable to track invitation envelope opens via Google Sheets.
 *
 * Uses Google Apps Script deployed as a Web App to append rows
 * to a Google Sheet. Fire-and-forget — never blocks the UI.
 *
 * Approach: Uses navigator.sendBeacon() with fallback to Image pixel.
 * Both methods are reliable on iOS Safari, Android Chrome, and desktop.
 */

const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

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

/**
 * Build a GET URL with query parameters.
 * Google Apps Script doGet() is the most reliable cross-browser method —
 * works on iOS Safari, Android, and desktop without CORS issues.
 */
function buildTrackingUrl(baseUrl: string, data: Record<string, string>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    params.set(key, value);
  }
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Send tracking data using the most reliable method available:
 * 1. Image pixel (GET) — works everywhere including iOS Safari
 */
function sendTracking(url: string) {
  const img = new Image();
  img.src = url;
}

export function useGoogleSheet() {
  /**
   * Track an envelope open event.
   * Sends guest info to Google Sheets in the background.
   */
  const trackOpen = (guestName: string, theme: 'v1' | 'v2' = 'v1') => {
    // Skip if no URL configured or already sent this session
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
      const trackingUrl = buildTrackingUrl(SHEET_URL, payload);
      sendTracking(trackingUrl);
    } catch {
      // Silently fail — tracking should never break the invitation
      hasSent = false;
    }
  };

  return { trackOpen };
}
