import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PRINCIPLES = [
  {
    number: "01",
    title: "Quality",
    text: "Products selected with care, not just stocked.",
  },
  {
    number: "02",
    title: "Thoughtful",
    text: "Designed around real, everyday needs.",
  },
  {
    number: "03",
    title: "Style",
    text: "Practical products, presented beautifully.",
  },
  {
    number: "04",
    title: "Accessible",
    text: "Convenient ordering and nationwide delivery.",
  },
];

export function WhyJcOwns() {
  return (
    <section className="bg-ivory-100 py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Why JC-OWNS" title="What guides every collection" />

        <div className="mt-14 grid gap-10 border-t border-charcoal/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <div key={p.number}>
              <span className="font-serif text-3xl text-gold-700">{p.number}</span>
              <h3 className="mt-3 font-serif text-xl text-charcoal">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{p.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
