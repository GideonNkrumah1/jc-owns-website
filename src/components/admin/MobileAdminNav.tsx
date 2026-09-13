"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ADMIN_LINKS } from "@/components/admin/AdminNav";

export function MobileAdminNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-charcoal/10 bg-ivory-50 md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-serif text-sm text-charcoal">JC-OWNS Admin</span>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3">
        {ADMIN_LINKS.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium",
                active
                  ? "border-forest-700 bg-forest-700 text-ivory-50"
                  : "border-charcoal/20 text-charcoal/70"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
