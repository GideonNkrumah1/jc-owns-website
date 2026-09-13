import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { BrandIntro } from "@/components/home/BrandIntro";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { WhyJcOwns } from "@/components/home/WhyJcOwns";
import { BrandStory } from "@/components/home/BrandStory";
import { OrderDelivery } from "@/components/home/OrderDelivery";
import { FinalCta } from "@/components/home/FinalCta";
import { getSiteSettings, getActiveCategories, getFeaturedProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Quality, Style, Thoughtful Living",
  description:
    "JC-OWNS Enterprises Limited — Gifts & More, Ankara & Bags and Home Care. Thoughtfully selected products for cleaner spaces, meaningful gifting and everyday living. Accra & Bibiani, Ghana, nationwide delivery.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [settings, categories, featuredProducts] = await Promise.all([
    getSiteSettings(),
    getActiveCategories(),
    getFeaturedProducts(),
  ]);

  const whatsappNumber = settings?.whatsappNumber ?? "233559038376";
  const featured = featuredProducts[0];

  return (
    <>
      <Hero
        whatsappNumber={whatsappNumber}
        headline={settings?.heroHeadline ?? "Quality. Style. Thoughtful Living."}
        subheadline={
          settings?.heroSubheadline ??
          "Thoughtfully selected products for cleaner spaces, meaningful gifting and everyday living."
        }
      />

      <BrandIntro
        intro={
          settings?.brandIntro ??
          "JC-OWNS brings together thoughtful products designed to add quality, style and practicality to everyday living."
        }
      />

      {categories.length > 0 && <CollectionsSection categories={categories} />}

      {featured && <FeaturedProduct product={featured} whatsappNumber={whatsappNumber} />}

      <WhyJcOwns />

      <BrandStory
        story={
          settings?.brandStory ??
          "JC-OWNS Enterprises Limited brings together Gifts & More, Ankara & Bags, and Home Care — three collections built on one standard: quality, style and thoughtful living."
        }
      />

      <OrderDelivery
        whatsappNumber={whatsappNumber}
        locations={settings?.locations ?? "Accra & Bibiani"}
        deliveryNote={settings?.deliveryNote ?? "Nationwide Delivery"}
      />

      <FinalCta whatsappNumber={whatsappNumber} />
    </>
  );
}
