import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { SiteSetting } from "@/db/schema";

export function Footer({ settings }: { settings: SiteSetting | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-ivory-200/60">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/brand/jc-owns-logo.jpg"
                alt="JC-OWNS Enterprises Limited"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <span className="font-serif text-lg text-charcoal">JC-OWNS</span>
            </Link>
            <p className="mt-4 max-w-xs font-serif text-base italic text-burgundy-600">
              Quality &middot; Style &middot; Thoughtful Living
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal/70">
              {settings?.locations ?? "Accra & Bibiani, Ghana"} &middot;{" "}
              {settings?.deliveryNote ?? "Nationwide Delivery"}
            </p>
          </div>

          <FooterColumn
            title="Collections"
            links={[
              { href: "/collections/gifts-and-more", label: "Gifts & More" },
              { href: "/collections/ankara-and-bags", label: "Ankara & Bags" },
              { href: "/collections/home-care", label: "Home Care" },
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/faq", label: "FAQ" },
              { href: "/delivery", label: "Delivery Information" },
            ]}
          />

          <FooterColumn
            title="Legal"
            links={[
              { href: "/privacy-policy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms & Conditions" },
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-charcoal/10 pt-6 text-xs text-charcoal/65 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} JC-OWNS Enterprises Limited. All rights reserved.</p>
          <p>
            Call/WhatsApp:{" "}
            <a
              href={`tel:${settings?.phoneNumber ?? ""}`}
              className="text-charcoal/80 hover:text-forest-700"
            >
              {settings?.phoneNumber ?? "055 903 8376"}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-charcoal/65">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-charcoal/75 hover:text-forest-700"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
