import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for JC-OWNS Enterprises Limited.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();
  const lastUpdated = settings?.updatedAt
    ? new Date(settings.updatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : undefined;

  return (
    <div className="py-16 md:py-24">
      <Container narrow className="prose-content">
        <h1 className="font-serif text-4xl text-charcoal">Privacy Policy</h1>
        {lastUpdated && (
          <p className="mt-2 text-sm text-charcoal/65">Last updated: {lastUpdated}</p>
        )}

        <div className="mt-10 space-y-8 text-base leading-relaxed text-charcoal/80">
          <section>
            <h2 className="font-serif text-xl text-charcoal">1. Who we are</h2>
            <p className="mt-3">
              JC-OWNS Enterprises Limited (&quot;JC-OWNS&quot;, &quot;we&quot;, &quot;us&quot;) operates this
              website and sells products under the Gifts &amp; More, Ankara &amp; Bags,
              and Home Care collections, based in {settings?.locations ?? "Accra & Bibiani, Ghana"}.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">2. Information we collect</h2>
            <p className="mt-3">When you use this website, we may collect:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Information you provide directly, such as your name, phone number,
                email address and message, when you use the contact form or
                message us on WhatsApp to place an order or ask a question.
              </li>
              <li>
                Basic technical and usage information (such as pages visited,
                device type and approximate location derived from IP address)
                collected automatically through website analytics, to help us
                understand how the site is used and improve it.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">3. How we use your information</h2>
            <p className="mt-3">We use the information we collect to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Respond to enquiries and process orders you place with us.</li>
              <li>Coordinate delivery of your order.</li>
              <li>Improve our website, products and customer service.</li>
              <li>Communicate with you about your order or enquiry.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">4. WhatsApp ordering</h2>
            <p className="mt-3">
              Where you choose to contact us via WhatsApp, that conversation is
              subject to WhatsApp&apos;s own privacy policy and terms, in addition to
              this policy, since it takes place on WhatsApp&apos;s platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">5. Sharing of information</h2>
            <p className="mt-3">
              We do not sell your personal information. We may share information
              with third parties only where necessary to fulfil your order (for
              example, a delivery partner) or where required by law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">6. Data retention and security</h2>
            <p className="mt-3">
              We retain enquiry and order information for as long as reasonably
              necessary to respond to you, fulfil orders and meet our legal and
              accounting obligations. We take reasonable steps to protect the
              information you share with us, including secure storage and
              restricted access to our systems.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">7. Your rights</h2>
            <p className="mt-3">
              You may ask us what personal information we hold about you, request
              that it be corrected, or ask us to delete it, subject to any
              legitimate business or legal reasons we may need to retain it. To
              make a request, contact us using the details on our{" "}
              <a href="/contact" className="text-forest-700 underline">
                Contact page
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">8. Changes to this policy</h2>
            <p className="mt-3">
              We may update this policy from time to time. Any changes will be
              posted on this page.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">9. Contact us</h2>
            <p className="mt-3">
              If you have any questions about this Privacy Policy, please contact
              us via the details on our{" "}
              <a href="/contact" className="text-forest-700 underline">
                Contact page
              </a>
              .
            </p>
          </section>

          <p className="border-t border-charcoal/10 pt-6 text-sm text-charcoal/65">
            This page is a general template and is not a substitute for legal
            advice. JC-OWNS Enterprises Limited should have this policy reviewed
            by a qualified professional to ensure it fully reflects its practices
            and complies with Ghana&apos;s Data Protection Act, 2012 (Act 843) and
            any other applicable law.
          </p>
        </div>
      </Container>
    </div>
  );
}
