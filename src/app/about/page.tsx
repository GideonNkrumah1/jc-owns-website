import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "About JC-OWNS Enterprises Limited — Gifts & More, Ankara & Bags and Home Care, built on quality, style and thoughtful living. Based in Accra & Bibiani, Ghana.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-16 md:py-24">
      <Container narrow>
        <p className="text-xs font-semibold uppercase tracking-widest text-burgundy-600">
          About JC-OWNS
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-charcoal md:text-5xl">
          Quality. Style. Thoughtful Living.
        </h1>

        <div className="relative my-12 aspect-[3/2] overflow-hidden rounded-sm">
          <Image
            src="/brand/jc-owns-logo.jpg"
            alt="JC-OWNS Enterprises Limited"
            fill
            sizes="(min-width: 768px) 780px, 100vw"
            className="object-contain bg-ivory-200 p-12"
          />
        </div>

        <div className="space-y-6 text-base leading-relaxed text-charcoal/80 md:text-lg">
          <p>
            {settings?.aboutContent ??
              "JC-OWNS Enterprises Limited is a Ghanaian company built on three simple ideas: quality, style, and thoughtful living."}
          </p>
        </div>

        <div className="mt-14 grid gap-8 border-t border-charcoal/10 pt-12 sm:grid-cols-3">
          <AboutColumn title="Gifts & More" text="Thoughtful gifts for life's moments." href="/collections/gifts-and-more" />
          <AboutColumn title="Ankara & Bags" text="Ankara pieces and bags made for everyday style." href="/collections/ankara-and-bags" />
          <AboutColumn title="Home Care" text="Dependable products for cleaner, healthier spaces." href="/collections/home-care" />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-charcoal/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-charcoal/70">
            {settings?.locations ?? "Accra & Bibiani, Ghana"} &middot;{" "}
            {settings?.deliveryNote ?? "Nationwide Delivery"}
          </p>
          <Button href="/contact" variant="outline">
            Get in Touch
          </Button>
        </div>
      </Container>
    </div>
  );
}

function AboutColumn({ title, text, href }: { title: string; text: string; href: string }) {
  return (
    <a href={href} className="group block">
      <h3 className="font-serif text-lg text-charcoal group-hover:text-forest-700">{title}</h3>
      <p className="mt-2 text-sm text-charcoal/65">{text}</p>
    </a>
  );
}
