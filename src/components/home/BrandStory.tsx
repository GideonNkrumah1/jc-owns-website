import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function BrandStory({ story }: { story: string }) {
  return (
    <section className="bg-ivory-200/50 py-20 md:py-28">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-sm shadow-soft md:aspect-[4/5]">
          <Image
            src="/brand/jc-owns-logo.jpg"
            alt="JC-OWNS Enterprises Limited"
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-contain bg-ivory-100 p-10"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-burgundy-600">
            Our Story
          </p>
          <p className="mt-4 font-serif text-2xl italic text-charcoal md:text-3xl">
            Quality &middot; Style &middot; Thoughtful Living
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-charcoal/75">
            {story}
          </p>
          <Link
            href="/about"
            className="link-underline mt-8 inline-flex text-sm font-semibold uppercase tracking-widest text-forest-700"
          >
            Discover Our Story
          </Link>
        </div>
      </Container>
    </section>
  );
}
