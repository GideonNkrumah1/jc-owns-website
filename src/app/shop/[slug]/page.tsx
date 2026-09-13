import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { ProductOrderPanel } from "@/components/product/ProductOrderPanel";
import { ProductCard } from "@/components/product/ProductCard";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { getProductBySlug, getRelatedProducts, getSiteSettings } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const title = product.seoTitle || product.name;
  const description =
    product.seoDescription ||
    product.shortDescription ||
    `${product.name} — available from JC-OWNS Enterprises Limited. Order on WhatsApp with nationwide delivery across Ghana.`;

  return {
    title,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title,
      description,
      images: product.images[0] ? [{ url: product.images[0].url }] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [product, settings] = await Promise.all([
    getProductBySlug(params.slug),
    getSiteSettings(),
  ]);

  if (!product) notFound();

  const related = await getRelatedProducts(product.categoryId, product.id);
  const whatsappNumber = settings?.whatsappNumber ?? "233559038376";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription ?? product.description ?? undefined,
    image: product.images[0]?.url,
    brand: { "@type": "Brand", name: "JC-OWNS Enterprises Limited" },
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: product.currency,
            price: product.price,
            availability: product.isAvailable
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        }
      : {}),
  };

  return (
    <div className="py-14 md:py-20">
      <ViewTracker type="product_view" meta={{ product: product.slug }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-charcoal/65">
          <Link href="/shop" className="hover:text-forest-700">
            Shop
          </Link>
          <span className="mx-2">/</span>
          {product.category && (
            <>
              <Link
                href={`/collections/${product.category.slug}`}
                className="hover:text-forest-700"
              >
                {product.category.name}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-charcoal/80">{product.name}</span>
        </nav>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-sm bg-ivory-200">
            {product.images[0] ? (
              <Image
                src={product.images[0].url}
                alt={product.images[0].altText ?? product.name}
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
                priority
              />
            ) : (
              <PlaceholderArt variant="generic" label={product.name} />
            )}
          </div>

          <div>
            {product.category && (
              <Badge tone="forest" className="mb-4">
                {product.category.name}
              </Badge>
            )}
            <h1 className="font-serif text-3xl leading-tight text-charcoal md:text-4xl">
              {product.name}
            </h1>
            {product.shortDescription && (
              <p className="mt-3 font-serif text-lg italic text-charcoal/70">
                {product.shortDescription}
              </p>
            )}

            <ProductOrderPanel product={product} whatsappNumber={whatsappNumber} />
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl gap-10 border-t border-charcoal/10 pt-14 md:grid-cols-2">
          {product.description && (
            <DetailBlock title="Product Details" text={product.description} />
          )}
          {product.howToUse && <DetailBlock title="How to Use" text={product.howToUse} />}
          {product.suitableFor && (
            <DetailBlock title="Suitable Applications" text={product.suitableFor} />
          )}
          <DetailBlock
            title="Delivery Information"
            text={
              product.deliveryNote ||
              "Nationwide delivery across Ghana. Delivery timing and cost are confirmed with you when you place your order."
            }
          />
        </div>

        {related.length > 0 && (
          <div className="mt-24 border-t border-charcoal/10 pt-14">
            <h2 className="font-serif text-2xl text-charcoal">You may also like</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-charcoal/65">
        {title}
      </h3>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-charcoal/75">
        {text}
      </p>
    </div>
  );
}
