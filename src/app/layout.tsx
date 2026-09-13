import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { getSiteSettings } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// The whole site reads from the database (site settings power the header,
// footer and WhatsApp links on every page), and content is edited live from
// /admin. Rendering dynamically means: (1) `next build` never needs a live
// database connection, so a fresh deploy can't fail because migrations
// haven't run yet, and (2) admin edits are visible immediately, with no
// redeploy or cache-purge step for a non-technical owner to remember.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JC-OWNS Enterprises Limited — Quality, Style, Thoughtful Living",
    template: "%s | JC-OWNS Enterprises Limited",
  },
  description:
    "JC-OWNS Enterprises Limited — Gifts & More, Ankara & Bags and Home Care products, thoughtfully selected for everyday living. Based in Accra & Bibiani, Ghana, with nationwide delivery.",
  keywords: [
    "JC-OWNS",
    "JC-OWNS Enterprises",
    "multipurpose liquid soap Ghana",
    "liquid soap Ghana",
    "home care products Ghana",
    "cleaning products Ghana",
    "gifts Ghana",
    "Ankara bags Ghana",
    "home care Accra",
    "liquid soap Accra",
    "liquid soap Bibiani",
    "nationwide delivery Ghana",
  ],
  openGraph: {
    type: "website",
    siteName: "JC-OWNS Enterprises Limited",
    title: "JC-OWNS Enterprises Limited — Quality, Style, Thoughtful Living",
    description:
      "Thoughtfully selected products for cleaner spaces, meaningful gifting and everyday living. Accra & Bibiani, Ghana — nationwide delivery.",
    url: siteUrl,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "JC-OWNS Enterprises Limited" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JC-OWNS Enterprises Limited — Quality, Style, Thoughtful Living",
    description:
      "Thoughtfully selected products for cleaner spaces, meaningful gifting and everyday living.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf4ec",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const whatsappNumber = settings?.whatsappNumber ?? "233559038376";

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JC-OWNS Enterprises Limited",
    url: siteUrl,
    logo: `${siteUrl}/brand/jc-owns-logo.jpg`,
    slogan: "Quality, Style, Thoughtful Living",
    areaServed: "GH",
    address: {
      "@type": "PostalAddress",
      addressLocality: settings?.locations ?? "Accra & Bibiani",
      addressCountry: "GH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings?.phoneNumber ?? "055 903 8376",
      contactType: "customer service",
      areaServed: "GH",
    },
  };

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-ivory-100 font-sans text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-forest-700 focus:px-4 focus:py-2 focus:text-ivory-50"
        >
          Skip to content
        </a>
        <Header whatsappNumber={whatsappNumber} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer settings={settings} />
        <StickyWhatsApp whatsappNumber={whatsappNumber} />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
