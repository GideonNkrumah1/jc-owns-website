import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getPublishedFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about ordering, delivery and products from JC-OWNS Enterprises Limited.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faqs = await getPublishedFaqs();

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <div className="py-16 md:py-24">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Container narrow>
        <SectionHeading eyebrow="Support" title="Frequently Asked Questions" />

        {faqs.length === 0 ? (
          <p className="mt-10 text-charcoal/65">
            No FAQs have been published yet. Have a question? Reach out on the{" "}
            <a href="/contact" className="link-underline text-forest-700">
              contact page
            </a>
            .
          </p>
        ) : (
          <div className="mt-12 divide-y divide-charcoal/10 border-y border-charcoal/10">
            {faqs.map((faq) => (
              <details key={faq.id} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-charcoal marker:content-none">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl text-charcoal/70 transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/70">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <p className="text-charcoal/65">Still have a question?</p>
          <div className="mt-4">
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
