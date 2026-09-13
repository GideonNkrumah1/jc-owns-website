"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink, generalEnquiryMessage } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function FinalCta({ whatsappNumber }: { whatsappNumber: string }) {
  const waLink = buildWhatsAppLink(whatsappNumber, generalEnquiryMessage());

  return (
    <section className="bg-ivory-100 py-20 md:py-28">
      <Container narrow className="text-center">
        <h2 className="font-serif text-3xl leading-tight text-charcoal text-balance md:text-4xl">
          Bring a little more thoughtfulness into everyday living.
        </h2>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href="/shop" size="lg">
            Shop JC-OWNS
          </Button>
          <Button
            href={waLink}
            variant="outline"
            size="lg"
            onClick={() => trackEvent("whatsapp_click", { location: "final_cta" })}
          >
            Talk to Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
