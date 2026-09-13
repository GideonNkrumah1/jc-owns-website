import { cn } from "@/lib/utils";

type Variant = "gifts" | "ankara" | "homecare" | "generic";

/**
 * Tasteful, brand-coloured editorial artwork used only where no real JC-OWNS
 * photography exists yet (Gifts & More and Ankara & Bags currently have no
 * supplied product photos). This is deliberately NOT a broken-image icon or
 * grey box — it's designed to look intentional on the live site, while
 * `showLabel` (used in the admin panel) makes explicit that it's a stand-in.
 */
export function PlaceholderArt({
  variant = "generic",
  label,
  showLabel = false,
  className,
}: {
  variant?: Variant;
  label?: string;
  showLabel?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
      role="img"
      aria-label={label ? `${label} — artwork placeholder` : "Decorative artwork"}
    >
      {variant === "gifts" && <GiftsArt />}
      {variant === "ankara" && <AnkaraArt />}
      {variant === "homecare" && <HomeCareArt />}
      {variant === "generic" && <GenericArt />}

      {label && (
        <span className="relative z-10 px-6 text-center font-serif text-2xl text-ivory-50 drop-shadow-sm md:text-3xl">
          {label}
        </span>
      )}

      {showLabel && (
        <span className="absolute bottom-3 right-3 z-10 rounded-full bg-charcoal/70 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-ivory-50">
          Add a photo in Admin
        </span>
      )}
    </div>
  );
}

function GiftsArt() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="400" fill="#5A1730" />
      <rect width="400" height="400" fill="url(#giftsFade)" />
      <g stroke="#D9B96A" strokeWidth="2" opacity="0.55">
        <line x1="0" y1="120" x2="400" y2="120" />
        <line x1="0" y1="280" x2="400" y2="280" />
        <line x1="140" y1="0" x2="140" y2="400" />
        <line x1="260" y1="0" x2="260" y2="400" />
      </g>
      <circle cx="200" cy="200" r="60" fill="none" stroke="#F2E1B8" strokeWidth="1.5" opacity="0.6" />
      <defs>
        <linearGradient id="giftsFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#711D3B" stopOpacity="0.2" />
          <stop offset="1" stopColor="#340A1B" stopOpacity="0.55" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AnkaraArt() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="400" fill="#173D27" />
      <g opacity="0.85">
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={i}
            d={`M ${-40 + i * 48} 0 C ${20 + i * 48} 100, ${-20 + i * 48} 300, ${40 + i * 48} 400`}
            fill="none"
            stroke={i % 2 === 0 ? "#D9B96A" : "#9C4A63"}
            strokeWidth="10"
            opacity="0.4"
          />
        ))}
      </g>
      <circle cx="120" cy="140" r="6" fill="#F2E1B8" opacity="0.7" />
      <circle cx="280" cy="260" r="6" fill="#F2E1B8" opacity="0.7" />
      <circle cx="220" cy="90" r="4" fill="#F2E1B8" opacity="0.6" />
    </svg>
  );
}

function HomeCareArt() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="400" fill="#0F2C1B" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="#579B4F" strokeWidth="1" opacity="0.35" />
      <circle cx="200" cy="200" r="100" fill="none" stroke="#579B4F" strokeWidth="1" opacity="0.35" />
      <circle cx="200" cy="200" r="50" fill="#3C8B3C" opacity="0.25" />
    </svg>
  );
}

function GenericArt() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="400" fill="#EAD8C2" />
      <path
        d="M0 260 C 100 200, 300 320, 400 240 L 400 400 L 0 400 Z"
        fill="#173D27"
        opacity="0.12"
      />
      <path
        d="M0 300 C 120 260, 280 360, 400 300 L 400 400 L 0 400 Z"
        fill="#711D3B"
        opacity="0.12"
      />
    </svg>
  );
}
