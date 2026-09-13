import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { ProductCard } from "@/components/product/ProductCard";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { WhatsAppInlineCta } from "@/components/product/WhatsAppInlineCta";
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
  getSiteSettings,
} from "@/lib/data";

const ART_VARIANT: Record<string, "gifts" | "ankara" | "homecare"> = {
  "gifts-and-more": "gifts",
  "ankara-and-bags": "ankara",
  "home-care": "homecare",
};

const FALLBACK_IMAGE: Record<string, string | null> = {
  "home-care": "/brand/jc-owns-liquid-soap.jpg",
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category || !category.isActive) notFound();

  return {
    title: category.seoTitle || category.name,
    description:
      category.seoDescription ||
      category.description ||
      `${category.name} from JC-OWNS Enterprises Limited. Nationwide delivery across Ghana.`,
    alternates: { canonical: `/collections/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(params.slug);
  if (!category || !category.isActive) notFound();

  const [products, settings] = await Promise.all([
    getProductsByCategorySlug(params.slug),
    getSiteSettings(),
  ]);

  const heroImage = category.heroImageUrl ?? FALLBACK_IMAGE[category.slug];

  return (
    <div>
      <ViewTracker type="category_view" meta={{ category: category.slug }} />

      <section className="relative flex h-[42vh] min-h-[320px] items-end overflow-hidden md:h-[52vh]">
        <div className="absolute inset-0">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={category.name}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          ) : (
            <PlaceholderArt variant={ART_VARIANT[category.slug] ?? "generic"} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-900/25 to-transparent" />
        </div>
        <Container className="relative z-10 pb-12 text-ivory-50">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-300">
            Collection
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">{category.name}</h1>
          {category.tagline && (
            <p className="mt-3 max-w-xl text-ivory-100/85">{category.tagline}</p>
          )}
        </Container>
      </section>

      <Container className="py-14 md:py-20">
        {category.description && (
          <p className="max-w-2xl text-base leading-relaxed text-charcoal/75 md:text-lg">
            {category.description}
          </p>
        )}

        {products.length === 0 ? (
          <div className="mt-14 rounded-sm border border-charcoal/10 bg-ivory-200/50 px-8 py-16 text-center">
            <p className="font-serif text-2xl text-charcoal">
              New {category.name.toLowerCase()} pieces are on the way.
            </p>
            <p className="mx-auto mt-3 max-w-md text-charcoal/65">
              This collection is being stocked. Message us on WhatsApp and we can
              let you know what&apos;s available now.
            </p>
            <div className="mt-8 flex justify-center">
              <WhatsAppInlineCta
                whatsappNumber={settings?.whatsappNumber ?? "233559038376"}
                categoryName={category.name}
              />
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
