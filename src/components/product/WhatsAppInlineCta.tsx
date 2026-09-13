"use client";

import { buildWhatsAppLink, categoryEnquiryMessage } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppInlineCta({
  whatsappNumber,
  categoryName,
}: {
  whatsappNumber: string;
  categoryName: string;
}) {
  const link = buildWhatsAppLink(whatsappNumber, categoryEnquiryMessage(categoryName));

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { location: "category_empty_state", category: categoryName })}
      className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3 text-sm font-medium text-white hover:bg-[#1FBE5A]"
    >
      Ask on WhatsApp
    </a>
  );
}
