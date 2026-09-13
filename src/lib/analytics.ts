/**
 * Conversion events tracked across the site:
 *   whatsapp_click, product_view, product_enquiry, contact_form_submit,
 *   category_view, page_view
 *
 * Two destinations:
 *  1. Google Analytics 4 (if NEXT_PUBLIC_GA_MEASUREMENT_ID is set) — for the
 *     owner's familiar GA dashboard.
 *  2. A first-party `analytics_events` table — so the admin dashboard always
 *     shows real activity even before/without GA configured.
 */

export type AnalyticsEventType =
  | "whatsapp_click"
  | "product_view"
  | "product_enquiry"
  | "contact_form_submit"
  | "category_view"
  | "page_view";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Call from Client Components on user interaction. Never throws. */
export function trackEvent(
  type: AnalyticsEventType,
  meta: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  try {
    window.gtag?.("event", type, meta);
  } catch {
    // GA not loaded — ignore.
  }

  try {
    const payload = JSON.stringify({ type, meta, path: window.location.pathname });
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/track", blob);
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Best-effort only — never block the user's action on analytics.
  }
}
