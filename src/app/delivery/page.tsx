import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getSiteSettings } from "@/lib/data";
import { buildWhatsAppLink, generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Delivery Information",
  description:
    "Delivery information for JC-OWNS Enterprises Limited — based in Accra & Bibiani, Ghana, with nationwide delivery.",
  alternates: { canonical: "/delivery" },
};

export default async function DeliveryPage() {
  const settings = await getSiteSettings();
  const whatsappNumber = settings?.whatsappNumber ?? "233559038376";
  const waLink = buildWhatsAppLink(whatsappNumber, generalEnquiryMessage());

  return (
    <div className="py-16 md:py-24">
      <Container narrow>
        <SectionHeading eyebrow="Delivery" title="Delivery Information" />

        <div className="mt-10 space-y-8 text-base leading-relaxed text-charcoal/80">
          <p>
            JC-OWNS Enterprises Limited is based in {settings?.locations ?? "Accra & Bibiani, Ghana"}, and
            offers {settings?.deliveryNote?.toLowerCase() ?? "nationwide delivery"} across Ghana.
          </p>
          <p>
            Delivery timing and cost depend on your location and the size of your
            order. Because of this, we confirm exact delivery details with you
            directly — either on WhatsApp or through the contact form — once you
            place an order.
          </p>
          <p>
            For the fastest response on a delivery question, message us on
            WhatsApp with your location and what you&apos;d like to order.
          </p>
        </div>

        <div className="mt-12">
          <Button href={waLink} variant="primary" external>
            Ask About Delivery on WhatsApp
          </Button>
        </div>
      </Container>
    </div>
  );
}
