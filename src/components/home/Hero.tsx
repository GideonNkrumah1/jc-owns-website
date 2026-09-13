"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { buildWhatsAppLink, generalOrderMessage } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function Hero({
  whatsappNumber,
  headline,
  subheadline,
}: {
  whatsappNumber: string;
  headline: string;
  subheadline: string;
}) {
  const waLink = buildWhatsAppLink(whatsappNumber, generalOrderMessage());

  return (
    <section className="relative overflow-hidden bg-ivory-100">
      <Container className="grid gap-12 pb-16 pt-14 md:grid-cols-2 md:items-center md:pb-24 md:pt-20">
        <div className="animate-fadeIn">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-burgundy-600">
            Gifts &amp; More &middot; Ankara &amp; Bags &middot; Home Care
          </p>
          <h1 className="font-serif text-4xl leading-[1.1] text-charcoal text-balance sm:text-5xl md:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal/75 md:text-lg">
            {subheadline}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/shop" size="lg">
              Shop Collection
            </Button>
            <Button
              href={waLink}
              variant="outline"
              size="lg"
              onClick={() => trackEvent("whatsapp_click", { location: "hero" })}
            >
              Order on WhatsApp
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-sm shadow-card">
              <Image
                src="/brand/jc-owns-liquid-soap.jpg"
                alt="JC-OWNS Multipurpose Liquid Soap bottles"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-sm shadow-soft">
              <PlaceholderArt variant="gifts" label="Gifts & More" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-sm shadow-soft">
              <PlaceholderArt variant="ankara" label="Ankara & Bags" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
