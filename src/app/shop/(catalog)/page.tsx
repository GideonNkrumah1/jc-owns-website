import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { getAllProducts, getActiveCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse JC-OWNS products across Gifts & More, Ankara & Bags and Home Care. Order easily on WhatsApp with nationwide delivery across Ghana.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [allProducts, categories] = await Promise.all([
    getAllProducts(),
    getActiveCategories(),
  ]);

  const activeCategory = searchParams.category;
  const products = activeCategory
    ? allProducts.filter((p) => p.category?.slug === activeCategory)
    : allProducts;

  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Shop"
          title="The full JC-OWNS collection"
          description="Every product currently available, in one place. Order any item directly on WhatsApp."
        />

        <div className="mt-10 flex flex-wrap gap-3 border-b border-charcoal/10 pb-8">
          <Link
            href="/shop"
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              !activeCategory
                ? "border-forest-700 bg-forest-700 text-ivory-50"
                : "border-charcoal/20 text-charcoal/75 hover:border-forest-700 hover:text-forest-700"
            )}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                activeCategory === cat.slug
                  ? "border-forest-700 bg-forest-700 text-ivory-50"
                  : "border-charcoal/20 text-charcoal/75 hover:border-forest-700 hover:text-forest-700"
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl text-charcoal">
              No products here just yet.
            </p>
            <p className="mt-3 text-charcoal/65">
              New items are added regularly — check back soon, or message us on
              WhatsApp for what&apos;s currently available.
            </p>
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
