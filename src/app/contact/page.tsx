import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { getSiteSettings } from "@/lib/data";
import { buildWhatsAppLink, generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with JC-OWNS Enterprises Limited — WhatsApp, phone, or the contact form. Based in Accra & Bibiani, Ghana, with nationwide delivery.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const whatsappNumber = settings?.whatsappNumber ?? "233559038376";
  const waLink = buildWhatsAppLink(whatsappNumber, generalEnquiryMessage());

  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="We'd love to hear from you"
          description="Reach us on WhatsApp for the fastest response, or send a message using the form."
        />

        <div className="mt-14 grid gap-14 md:grid-cols-2">
          <div className="space-y-8">
            <ContactRow
              label="WhatsApp"
              value={settings?.phoneNumber ?? "055 903 8376"}
              href={waLink}
              external
            />
            <ContactRow
              label="Phone"
              value={settings?.phoneNumber ?? "055 903 8376"}
              href={`tel:${settings?.phoneNumber ?? "0501660135"}`}
            />
            {settings?.contactEmail && (
              <ContactRow
                label="Email"
                value={settings.contactEmail}
                href={`mailto:${settings.contactEmail}`}
              />
            )}
            <ContactRow label="Location" value={settings?.locations ?? "Accra & Bibiani, Ghana"} />
            <ContactRow label="Delivery" value={settings?.deliveryNote ?? "Nationwide Delivery"} />
          </div>

          <div className="rounded-sm border border-charcoal/10 bg-ivory-50 p-6 shadow-soft md:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <div className="border-b border-charcoal/10 pb-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/65">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="mt-1.5 inline-block text-lg text-charcoal hover:text-forest-700"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1.5 text-lg text-charcoal">{value}</p>
      )}
    </div>
  );
}
