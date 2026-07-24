/**
 * Composable to track invitation envelope opens via Google Sheets.
 *
 * Uses Google Apps Script deployed as a Web App to append rows
 * to a Google Sheet. Fire-and-forget — never blocks the UI.
 *
 * Approach: Uses a hidden form submission to avoid CORS/401 issues
 * with Google Apps Script. The form targets a hidden iframe so the
 * page doesn't navigate away.
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
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}

/**
 * Send data via a hidden form + iframe to bypass CORS.
 * Google Apps Script redirects on POST, which causes CORS errors
 * with fetch(). A form submission handles redirects natively.
 */
function sendViaForm(url: string, data: Record<string, string>) {
  // Create hidden iframe target
  const iframeName = '__gs_tracker_' + Date.now();
  const iframe = document.createElement('iframe');
  iframe.name = iframeName;
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  // Create hidden form
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = url;
  form.target = iframeName;
  form.style.display = 'none';

  // Add each field as a hidden input
  for (const [key, value] of Object.entries(data)) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();

  // Clean up after a short delay
  setTimeout(() => {
    form.remove();
    iframe.remove();
  }, 5000);
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
      sendViaForm(SHEET_URL, payload);
    } catch {
      // Silently fail — tracking should never break the invitation
      hasSent = false;
    }
  };

  return { trackOpen };
}
