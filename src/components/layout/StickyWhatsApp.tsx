"use client";

import { buildWhatsAppLink, generalOrderMessage } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

/**
 * Subtle, thumb-reachable mobile-only order shortcut. Deliberately small and
 * positioned so it never covers page content or form fields.
 */
export function StickyWhatsApp({ whatsappNumber }: { whatsappNumber: string }) {
  const link = buildWhatsAppLink(whatsappNumber, generalOrderMessage());

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { location: "sticky_mobile" })}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-transform duration-200 ease-elegant hover:scale-105 md:hidden"
      aria-label="Order on WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.44 1.33 4.93L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.78 14.17c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11a15.4 15.4 0 0 1-1.6-.6c-2.83-1.22-4.68-4.06-4.82-4.25-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.89 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.64.77 1.92.91.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
      </svg>
    </a>
  );
}
