import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import type { Category } from "@/db/schema";

const ART_VARIANT: Record<string, "gifts" | "ankara" | "homecare"> = {
  "gifts-and-more": "gifts",
  "ankara-and-bags": "ankara",
  "home-care": "homecare",
};

const FALLBACK_IMAGE: Record<string, string | null> = {
  "gifts-and-more": null,
  "ankara-and-bags": null,
  "home-care": "/brand/jc-owns-liquid-soap.jpg",
};

export function CollectionsSection({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-ivory-200/50 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Collections"
          title="Three collections, one standard of care"
          description="Gifts & More, Ankara & Bags, and Home Care — each chosen with the same attention to quality and everyday usefulness."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {categories.map((category, index) => {
            const image = category.heroImageUrl ?? FALLBACK_IMAGE[category.slug];
            const isLarge = index === 0;
            return (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className={`group relative flex flex-col justify-end overflow-hidden rounded-sm shadow-soft transition-transform duration-500 ease-elegant hover:-translate-y-1 ${
                  isLarge ? "md:row-span-2 md:aspect-[3/4]" : "aspect-[4/3] md:aspect-auto"
                }`}
                style={isLarge ? undefined : { minHeight: "260px" }}
              >
                <div className="absolute inset-0">
                  {image ? (
                    <Image
                      src={image}
                      alt={category.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-105"
                    />
                  ) : (
                    <PlaceholderArt variant={ART_VARIANT[category.slug] ?? "generic"} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/10 to-transparent" />
                </div>

                <div className="relative z-10 p-6 md:p-8">
                  <h3 className="font-serif text-2xl text-ivory-50 md:text-3xl">
                    {category.name}
                  </h3>
                  {category.tagline && (
                    <p className="mt-2 max-w-xs text-sm text-ivory-100/85">
                      {category.tagline}
                    </p>
                  )}
                  <span className="link-underline mt-4 inline-flex text-xs font-semibold uppercase tracking-widest text-ivory-50">
                    Explore
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
