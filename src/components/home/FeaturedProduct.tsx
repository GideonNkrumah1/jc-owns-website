"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppLink, productOrderMessage } from "@/lib/whatsapp";
import type { Product, ProductImage, ProductVariant } from "@/db/schema";

const BENEFITS = [
  "Powerful Cleaning",
  "Gentle on Hands",
  "Fresh Fragrance",
  "Ideal for Home & Office",
];

export function FeaturedProduct({
  product,
  whatsappNumber,
}: {
  product: Product & { images: ProductImage[]; variants: ProductVariant[] };
  whatsappNumber: string;
}) {
  const image = product.images[0]?.url ?? "/brand/jc-owns-liquid-soap.jpg";
  const waLink = buildWhatsAppLink(
    whatsappNumber,
    productOrderMessage({ productName: product.name })
  );

  return (
    <section className="bg-forest-800 py-20 text-ivory-50 md:py-28">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-sm shadow-card md:order-1">
          <Image
            src={image}
            alt={product.images[0]?.altText ?? product.name}
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <Badge tone="gold">Featured Product</Badge>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-ivory-50 md:text-4xl">
            {product.name}
          </h2>
          {product.shortDescription && (
            <p className="mt-4 font-serif text-xl italic text-gold-200">
              {product.shortDescription}
            </p>
          )}

          {product.variants.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {product.variants.map((variant) => (
                <span
                  key={variant.id}
                  className="rounded-full border border-ivory-50/30 px-4 py-1.5 text-sm text-ivory-100"
                >
                  {variant.label}
                </span>
              ))}
            </div>
          )}

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-sm text-ivory-100/90">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-gold-300">
                  <path d="M2 7.5L5.2 10.5L12 3" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: "featured_product", product: product.slug })}
              className="inline-flex items-center justify-center rounded-sm bg-gold-400 px-6 py-3 text-sm font-medium text-charcoal-900 transition-colors hover:bg-gold-300"
            >
              Order Now
            </a>
            <Button href={`/shop/${product.slug}`} variant="outline" className="border-ivory-50/40 text-ivory-50 hover:border-ivory-50 hover:text-ivory-50">
              View Product
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
