"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/settings", label: "Settings" },
];
const LINKS = ADMIN_LINKS;

export function AdminNav({ adminName }: { adminName?: string | null }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between border-r border-charcoal/10 bg-ivory-50 p-5">
      <div>
        <Link href="/admin" className="mb-8 flex items-center gap-2">
          <Image
            src="/brand/jc-owns-logo.jpg"
            alt="JC-OWNS"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
          <span className="font-serif text-sm text-charcoal">JC-OWNS Admin</span>
        </Link>

        <nav className="space-y-1">
          {LINKS.map((link) => {
            const active = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded-sm px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-forest-700 text-ivory-50"
                    : "text-charcoal/75 hover:bg-ivory-200"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-charcoal/10 pt-4">
        {adminName && <p className="mb-2 truncate text-xs text-charcoal/65">{adminName}</p>}
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-sm text-charcoal/70 hover:text-forest-700">
            View site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-left text-sm text-burgundy-600 hover:text-burgundy-700"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
