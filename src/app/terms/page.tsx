import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms & Conditions for JC-OWNS Enterprises Limited.",
  alternates: { canonical: "/terms" },
};

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-16 md:py-24">
      <Container narrow>
        <h1 className="font-serif text-4xl text-charcoal">Terms &amp; Conditions</h1>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-charcoal/80">
          <section>
            <h2 className="font-serif text-xl text-charcoal">1. About these terms</h2>
            <p className="mt-3">
              These terms govern your use of this website and your orders with
              JC-OWNS Enterprises Limited (&quot;JC-OWNS&quot;), based in{" "}
              {settings?.locations ?? "Accra & Bibiani, Ghana"}. By using this
              website or placing an order, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">2. Products</h2>
            <p className="mt-3">
              We aim to describe our products as accurately as possible. Product
              availability, pricing and specifications may change, and are
              confirmed with you at the time you place an order.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">3. Orders and enquiries</h2>
            <p className="mt-3">
              Orders are currently placed via WhatsApp or our contact form. An
              order is confirmed once we respond to acknowledge availability,
              pricing and delivery details with you directly. Submitting an
              enquiry through this website does not by itself guarantee product
              availability.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">4. Pricing and payment</h2>
            <p className="mt-3">
              Prices, where shown, are in Ghana Cedis (GHS) unless stated
              otherwise. Payment methods and details are shared with you when you
              place an order.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">5. Delivery</h2>
            <p className="mt-3">
              We deliver nationwide across Ghana. Delivery timing and any
              associated cost depend on your location and are confirmed with you
              when you order. See our{" "}
              <a href="/delivery" className="text-forest-700 underline">
                Delivery Information
              </a>{" "}
              page for more.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">6. Website use</h2>
            <p className="mt-3">
              You agree to use this website lawfully and not to misuse it,
              including attempting to disrupt its operation or access it using
              automated means without our permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">7. Intellectual property</h2>
            <p className="mt-3">
              The JC-OWNS name, logo and product presentation are the property of
              JC-OWNS Enterprises Limited and may not be used without permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">8. Limitation of liability</h2>
            <p className="mt-3">
              We work to keep this website accurate and available, but we do not
              guarantee it will always be error-free or uninterrupted, and we are
              not liable for losses arising from its use beyond what is required
              by law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">9. Changes to these terms</h2>
            <p className="mt-3">
              We may update these terms from time to time. Continued use of the
              website or of our products after changes are posted means you
              accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal">10. Contact</h2>
            <p className="mt-3">
              Questions about these terms can be sent via our{" "}
              <a href="/contact" className="text-forest-700 underline">
                Contact page
              </a>
              .
            </p>
          </section>

          <p className="border-t border-charcoal/10 pt-6 text-sm text-charcoal/65">
            This page is a general template and is not a substitute for legal
            advice. JC-OWNS Enterprises Limited should have these terms reviewed
            by a qualified professional before relying on them.
          </p>
        </div>
      </Container>
    </div>
  );
}
