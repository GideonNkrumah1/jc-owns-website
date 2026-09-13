import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-20">
      <Container narrow className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-burgundy-600">
          404
        </p>
        <h1 className="mt-4 font-serif text-4xl text-charcoal md:text-5xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto mt-4 max-w-md text-charcoal/70">
          The page you&apos;re looking for may have moved or no longer exists.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href="/">Back to Home</Button>
          <Button href="/shop" variant="outline">
            Browse Shop
          </Button>
        </div>
        <p className="mt-8 text-sm text-charcoal/65">
          Or{" "}
          <Link href="/contact" className="text-forest-700 underline">
            contact us
          </Link>{" "}
          if you think this is a mistake.
        </p>
      </Container>
    </div>
  );
}
