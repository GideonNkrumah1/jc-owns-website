import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { AdminPageHeader, AdminCard } from "@/components/admin/AdminUI";
import { ConfirmDeleteFormSimple } from "@/components/admin/ConfirmDeleteFormSimple";
import { updateEnquiryStatus, deleteEnquiry } from "../actions";

export default async function EnquiryDetailPage({ params }: { params: { id: string } }) {
  const enquiry = await db.query.enquiries.findFirst({ where: eq(enquiries.id, params.id) });
  if (!enquiry) notFound();

  // Reading the enquiry marks it as read (if it was new).
  if (enquiry.status === "NEW") {
    await updateEnquiryStatus(enquiry.id, "READ");
  }

  return (
    <div className="max-w-2xl">
      <AdminPageHeader title={enquiry.name} description={new Date(enquiry.createdAt).toLocaleString()} />

      <AdminCard>
        <dl className="grid grid-cols-2 gap-4 border-b border-charcoal/10 pb-6 text-sm">
          <div>
            <dt className="text-charcoal/65">Phone</dt>
            <dd className="mt-1 text-charcoal">{enquiry.phone}</dd>
          </div>
          {enquiry.email && (
            <div>
              <dt className="text-charcoal/65">Email</dt>
              <dd className="mt-1 text-charcoal">{enquiry.email}</dd>
            </div>
          )}
          <div>
            <dt className="text-charcoal/65">Source</dt>
            <dd className="mt-1 text-charcoal">{enquiry.source}</dd>
          </div>
          {enquiry.subject && (
            <div>
              <dt className="text-charcoal/65">Subject</dt>
              <dd className="mt-1 text-charcoal">{enquiry.subject}</dd>
            </div>
          )}
        </dl>

        <div className="py-6">
          <p className="whitespace-pre-line text-base leading-relaxed text-charcoal">
            {enquiry.message}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-charcoal/10 pt-6">
          <div className="flex flex-wrap gap-2">
            {(["NEW", "READ", "RESPONDED", "ARCHIVED"] as const).map((status) => (
              <form key={status} action={updateEnquiryStatus.bind(null, enquiry.id, status)}>
                <button
                  type="submit"
                  disabled={enquiry.status === status}
                  className="rounded-full border border-charcoal/20 px-3.5 py-1.5 text-xs font-medium text-charcoal/70 hover:border-forest-700 disabled:cursor-default disabled:border-forest-700 disabled:bg-forest-700 disabled:text-ivory-50"
                >
                  Mark {status}
                </button>
              </form>
            ))}
          </div>

          <ConfirmDeleteFormSimple
            action={deleteEnquiry.bind(null, enquiry.id)}
            confirmText="Delete this enquiry permanently?"
          />
        </div>
      </AdminCard>
    </div>
  );
}
