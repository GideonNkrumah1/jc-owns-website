"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-ivory-100 py-20">
      <Container narrow className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-burgundy-600">
          Something went wrong
        </p>
        <h1 className="mt-4 font-serif text-4xl text-charcoal md:text-5xl">
          We hit a snag
        </h1>
        <p className="mx-auto mt-4 max-w-md text-charcoal/70">
          Please try again. If the problem continues, reach out to us directly
          on WhatsApp or through the contact page.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button onClick={() => reset()}>Try Again</Button>
          <Button href="/" variant="outline">
            Back to Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
