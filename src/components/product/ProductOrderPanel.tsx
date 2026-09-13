"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { buildWhatsAppLink, productOrderMessage } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import type { Product, ProductVariant } from "@/db/schema";

export function ProductOrderPanel({
  product,
  whatsappNumber,
}: {
  product: Product & { variants: ProductVariant[] };
  whatsappNumber: string;
}) {
  const [variantId, setVariantId] = useState<string | undefined>(
    product.variants[0]?.id
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(
    () => product.variants.find((v) => v.id === variantId),
    [variantId, product.variants]
  );

  const effectivePrice = selectedVariant?.price ?? product.price;
  const priceLabel = formatPrice(effectivePrice, product.currency);
  const isAvailable =
    product.isAvailable && (selectedVariant ? selectedVariant.isAvailable : true);

  const waLink = buildWhatsAppLink(
    whatsappNumber,
    productOrderMessage({
      productName: product.name,
      variantLabel: selectedVariant?.label,
      quantity,
    })
  );

  return (
    <div>
      {priceLabel && (
        <p className="mt-1 text-2xl font-medium text-charcoal">{priceLabel}</p>
      )}
      {!priceLabel && (
        <p className="mt-1 text-sm text-charcoal/65">
          Price shared when you order via WhatsApp.
        </p>
      )}

      {product.variants.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-charcoal/65">
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setVariantId(variant.id)}
                disabled={!variant.isAvailable}
                aria-pressed={variantId === variant.id}
                className={`rounded-full border px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  variantId === variant.id
                    ? "border-forest-700 bg-forest-700 text-ivory-50"
                    : "border-charcoal/25 text-charcoal/80 hover:border-forest-700"
                }`}
              >
                {variant.label}
                {!variant.isAvailable ? " (unavailable)" : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-charcoal/65">
          Quantity
        </p>
        <div className="inline-flex items-center rounded-sm border border-charcoal/25">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="flex h-11 w-11 items-center justify-center text-lg text-charcoal hover:bg-ivory-200 disabled:opacity-30"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="w-10 text-center text-base" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            className="flex h-11 w-11 items-center justify-center text-lg text-charcoal hover:bg-ivory-200"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {isAvailable ? (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("product_enquiry", {
                product: product.slug,
                variant: selectedVariant?.label,
                quantity,
              })
            }
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#1FBE5A]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.44 1.33 4.93L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.78 14.17c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11a15.4 15.4 0 0 1-1.6-.6c-2.83-1.22-4.68-4.06-4.82-4.25-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.89 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.64.77 1.92.91.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
            </svg>
            Order this on WhatsApp
          </a>
        ) : (
          <Button variant="outline" disabled>
            Currently unavailable
          </Button>
        )}
      </div>
    </div>
  );
}
