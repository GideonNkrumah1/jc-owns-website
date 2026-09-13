"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buildWhatsAppLink, generalOrderMessage } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const COLLECTIONS = [
  { href: "/collections/gifts-and-more", label: "Gifts & More" },
  { href: "/collections/ankara-and-bags", label: "Ankara & Bags" },
  { href: "/collections/home-care", label: "Home Care" },
];

export function Header({ whatsappNumber }: { whatsappNumber: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const waLink = buildWhatsAppLink(whatsappNumber, generalOrderMessage());

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-charcoal/5 bg-ivory-100/90 backdrop-blur transition-all duration-300 ease-elegant",
        scrolled ? "py-2 shadow-soft" : "py-4"
      )}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="JC-OWNS home">
          <Image
            src="/brand/jc-owns-logo.jpg"
            alt="JC-OWNS Enterprises Limited"
            width={44}
            height={44}
            className={cn(
              "rounded-full transition-all duration-300",
              scrolled ? "h-9 w-9" : "h-11 w-11"
            )}
            priority
          />
          <span className="hidden font-serif text-lg tracking-wide text-charcoal sm:block">
            JC-OWNS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-sm font-medium text-charcoal/90 hover:text-forest-700"
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setCollectionsOpen(true)}
            onMouseLeave={() => setCollectionsOpen(false)}
          >
            <button
              className="link-underline flex items-center gap-1 text-sm font-medium text-charcoal/90 hover:text-forest-700"
              aria-expanded={collectionsOpen}
              aria-haspopup="true"
              onClick={() => setCollectionsOpen((v) => !v)}
            >
              Collections
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {collectionsOpen && (
              <div className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3">
                <div className="rounded-md border border-charcoal/10 bg-ivory-50 p-2 shadow-card">
                  {COLLECTIONS.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block rounded px-3 py-2 text-sm text-charcoal/90 hover:bg-ivory-200 hover:text-forest-700"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-sm font-medium text-charcoal/90 hover:text-forest-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { location: "header" })}
            className="hidden items-center gap-2 rounded-sm bg-forest-700 px-5 py-2.5 text-sm font-medium text-ivory-50 transition-colors hover:bg-forest-800 sm:inline-flex"
          >
            Order on WhatsApp
          </a>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-charcoal md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M2 2L20 20M20 2L2 20" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M2 5H20M2 11H20M2 17H20" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-charcoal/10 bg-ivory-50 md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-2 py-3 text-base text-charcoal hover:bg-ivory-200"
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-2 px-2 text-xs font-semibold uppercase tracking-widest text-charcoal/65">
              Collections
            </p>
            {COLLECTIONS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="rounded px-2 py-3 text-base text-charcoal hover:bg-ivory-200"
              >
                {c.label}
              </Link>
            ))}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: "mobile_nav" })}
              className="mt-3 inline-flex items-center justify-center rounded-sm bg-forest-700 px-5 py-3 text-base font-medium text-ivory-50"
            >
              Order on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
