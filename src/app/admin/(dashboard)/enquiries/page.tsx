import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { AdminPageHeader, AdminCard, EmptyState } from "@/components/admin/AdminUI";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-burgundy-50 text-burgundy-600",
  READ: "bg-gold-50 text-gold-700",
  RESPONDED: "bg-forest-50 text-forest-700",
  ARCHIVED: "bg-charcoal/10 text-charcoal/65",
};

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const status = searchParams.status?.toUpperCase();
  const validStatus = ["NEW", "READ", "RESPONDED", "ARCHIVED"].includes(status ?? "")
    ? (status as "NEW" | "READ" | "RESPONDED" | "ARCHIVED")
    : undefined;

  const allEnquiries = await db.query.enquiries.findMany({
    where: validStatus ? eq(enquiries.status, validStatus) : undefined,
    orderBy: desc(enquiries.createdAt),
  });

  return (
    <div>
      <AdminPageHeader
        title="Enquiries"
        description="Messages from the contact form and product pages."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {[undefined, "NEW", "READ", "RESPONDED", "ARCHIVED"].map((s) => (
          <Link
            key={s ?? "all"}
            href={s ? `/admin/enquiries?status=${s}` : "/admin/enquiries"}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium",
              validStatus === s
                ? "border-forest-700 bg-forest-700 text-ivory-50"
                : "border-charcoal/20 text-charcoal/70"
            )}
          >
            {s ?? "All"}
          </Link>
        ))}
      </div>

      {allEnquiries.length === 0 ? (
        <EmptyState>No enquiries here.</EmptyState>
      ) : (
        <div className="space-y-3">
          {allEnquiries.map((enq) => (
            <Link key={enq.id} href={`/admin/enquiries/${enq.id}`}>
              <AdminCard className="flex flex-wrap items-center justify-between gap-3 transition-colors hover:border-forest-300">
                <div className="min-w-[220px] flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-charcoal">{enq.name}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] uppercase tracking-widest",
                        STATUS_STYLES[enq.status]
                      )}
                    >
                      {enq.status}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-charcoal/65">{enq.message}</p>
                </div>
                <span className="text-xs text-charcoal/65">
                  {new Date(enq.createdAt).toLocaleString()}
                </span>
              </AdminCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
