import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  narrow = false,
}: {
  className?: string;
  children: React.ReactNode;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        narrow ? "max-w-3xl" : "max-w-content",
        className
      )}
    >
      {children}
    </div>
  );
}
