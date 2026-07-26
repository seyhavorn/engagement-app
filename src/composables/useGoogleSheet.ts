/**
 * Composable to track invitation envelope opens via Google Sheets Apps Script.
 *
 * Uses Google Apps Script Web App endpoint (VITE_GOOGLE_SHEET_URL).
 *
 * Fire-and-forget background tracking — never blocks the UI.
 */

const DEFAULT_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxwIohq7JgW_zqDF9Iea2e1zI8ix9gkuv39uubnLDorDm24YQJDWml3Phl8NNsQTV87/exec';

const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL || DEFAULT_SHEET_URL;

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

function isLocalEnvironment(): boolean {
  if (import.meta.env.DEV) return true;
  const host = window.location.hostname;
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.startsWith('192.168.') ||
    host.startsWith('10.') ||
    host.endsWith('.local')
  );
}

export function useGoogleSheet() {
  /**
   * Track an envelope open event using Google Apps Script Web App endpoint.
   * Only saves in PRODUCTION environment. Skips tracking on localhost / dev mode.
   */
  const trackOpen = (guestName: string, theme: 'v1' | 'v2' = 'v1') => {
    if (!SHEET_URL) return;

    if (isLocalEnvironment()) {
      console.log(
        '[GoogleSheet Tracker] Local environment detected — skipping save for:',
        guestName
      );
      return;
    }

    const payload: Record<string, string> = {
      guestName,
      openedAt: formatDate(new Date()),
      theme,
      device: getDeviceInfo(),
      browser: getBrowserInfo(),
      pageUrl: decodeURIComponent(window.location.href),
    };

    const jsonText = JSON.stringify(payload);

    try {
      fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
        },
        body: jsonText,
        keepalive: true,
      }).catch((err) => {
        console.warn('[GoogleSheet Tracker] Send warning:', err);
      });
    } catch (err) {
      console.warn('[GoogleSheet Tracker] Error:', err);
    }
  };

  return { trackOpen };
}
