import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function BrandIntro({ intro }: { intro: string }) {
  return (
    <section className="bg-ivory-100 py-20 md:py-28">
      <Container narrow className="text-center">
        <p className="font-serif text-2xl leading-relaxed text-charcoal text-balance md:text-3xl">
          {intro}
        </p>
        <Link
          href="/about"
          className="link-underline mt-8 inline-flex text-sm font-semibold uppercase tracking-widest text-forest-700"
        >
          Explore JC-OWNS
        </Link>
      </Container>
    </section>
  );
}
