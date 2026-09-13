import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "forest",
  className,
}: {
  children: React.ReactNode;
  tone?: "forest" | "burgundy" | "gold" | "neutral";
  className?: string;
}) {
  const tones: Record<string, string> = {
    forest: "bg-forest-50 text-forest-700 border-forest-200",
    burgundy: "bg-burgundy-50 text-burgundy-600 border-burgundy-200",
    gold: "bg-gold-50 text-gold-700 border-gold-200",
    neutral: "bg-ivory-200 text-charcoal-700 border-ivory-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-widest",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
