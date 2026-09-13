import Image from "next/image";
import Link from "next/link";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { Product, ProductImage, ProductVariant } from "@/db/schema";

export function ProductCard({
  product,
}: {
  product: Product & { images: ProductImage[]; variants: ProductVariant[] };
}) {
  const image = product.images[0];
  const price = formatPrice(product.price, product.currency);

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden rounded-sm bg-ivory-200">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.name}
            fill
            sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 ease-elegant group-hover:scale-105"
          />
        ) : (
          <PlaceholderArt variant="generic" />
        )}
        {!product.isAvailable && (
          <span className="absolute left-3 top-3 rounded-full bg-charcoal/80 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-ivory-50">
            Currently unavailable
          </span>
        )}
      </div>

      <div className="mt-4">
        {product.isFeatured && (
          <Badge tone="gold" className="mb-2">
            Featured
          </Badge>
        )}
        <h3 className="font-serif text-lg text-charcoal group-hover:text-forest-700">
          {product.name}
        </h3>
        {product.shortDescription && (
          <p className="mt-1 line-clamp-2 text-sm text-charcoal/65">
            {product.shortDescription}
          </p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-charcoal/65">
            {product.variants.length > 0
              ? product.variants.map((v) => v.label).join(" / ")
              : null}
          </span>
          {price && <span className="text-sm font-medium text-charcoal">{price}</span>}
        </div>
      </div>
    </Link>
  );
}
