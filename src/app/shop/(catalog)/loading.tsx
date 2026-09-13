import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="h-4 w-24 animate-pulse rounded bg-charcoal/10" />
        <div className="mt-4 h-10 w-2/3 animate-pulse rounded bg-charcoal/10" />
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-square animate-pulse rounded-sm bg-ivory-200" />
              <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-charcoal/10" />
              <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-charcoal/10" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
