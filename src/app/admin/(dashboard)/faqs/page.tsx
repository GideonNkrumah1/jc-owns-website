import Link from "next/link";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { AdminPageHeader, AdminCard, EmptyState, LinkButton } from "@/components/admin/AdminUI";
import { ConfirmDeleteFormSimple } from "@/components/admin/ConfirmDeleteFormSimple";
import { deleteFaq } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const allFaqs = await db.query.faqs.findMany({ orderBy: asc(faqs.sortOrder) });

  return (
    <div>
      <AdminPageHeader
        title="FAQs"
        description="Shown on the FAQ page, in order."
        action={<LinkButton href="/admin/faqs/new">Add FAQ</LinkButton>}
      />

      {allFaqs.length === 0 ? (
        <EmptyState>No FAQs yet.</EmptyState>
      ) : (
        <div className="space-y-3">
          {allFaqs.map((faq) => (
            <AdminCard key={faq.id} className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium text-charcoal">{faq.question}</h3>
                  {!faq.isPublished && (
                    <span className="rounded-full bg-charcoal/10 px-2 py-0.5 text-[11px] uppercase tracking-widest text-charcoal/65">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-charcoal/65">{faq.answer}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link href={`/admin/faqs/${faq.id}`} className="text-sm font-medium text-forest-700 hover:underline">
                  Edit
                </Link>
                <ConfirmDeleteFormSimple
                  action={deleteFaq.bind(null, faq.id)}
                  confirmText="Delete this FAQ?"
                />
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
