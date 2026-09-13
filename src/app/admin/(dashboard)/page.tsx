import Link from "next/link";
import { db } from "@/db";
import { products, categories, enquiries, analyticsEvents } from "@/db/schema";
import { count, desc, eq, gte } from "drizzle-orm";
import { AdminPageHeader, AdminCard } from "@/components/admin/AdminUI";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    [{ value: totalProducts }],
    [{ value: featuredProducts }],
    [{ value: totalCategories }],
    [{ value: newEnquiries }],
    recentEnquiries,
    eventCounts,
  ] = await Promise.all([
    db.select({ value: count() }).from(products),
    db.select({ value: count() }).from(products).where(eq(products.isFeatured, true)),
    db.select({ value: count() }).from(categories),
    db.select({ value: count() }).from(enquiries).where(eq(enquiries.status, "NEW")),
    db.query.enquiries.findMany({ orderBy: desc(enquiries.createdAt), limit: 5 }),
    db
      .select({ type: analyticsEvents.type, value: count() })
      .from(analyticsEvents)
      .where(gte(analyticsEvents.createdAt, sevenDaysAgo))
      .groupBy(analyticsEvents.type),
  ]);

  const eventMap = Object.fromEntries(eventCounts.map((e) => [e.type, e.value]));

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="A quick look at your store's activity."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Products" value={totalProducts} href="/admin/products" />
        <StatCard label="Featured Products" value={featuredProducts} href="/admin/products" />
        <StatCard label="Categories" value={totalCategories} href="/admin/categories" />
        <StatCard label="New Enquiries" value={newEnquiries} href="/admin/enquiries" highlight={newEnquiries > 0} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <AdminCard>
          <h2 className="font-serif text-lg text-charcoal">Website activity (last 7 days)</h2>
          <p className="mt-1 text-xs text-charcoal/65">
            Recorded directly by this site. For full traffic and visitor
            analytics, use your connected Google Analytics dashboard.
          </p>
          <dl className="mt-5 space-y-3">
            <ActivityRow label="WhatsApp clicks" value={eventMap["whatsapp_click"] ?? 0} />
            <ActivityRow label="Product views" value={eventMap["product_view"] ?? 0} />
            <ActivityRow label="Product enquiries" value={eventMap["product_enquiry"] ?? 0} />
            <ActivityRow label="Category views" value={eventMap["category_view"] ?? 0} />
            <ActivityRow label="Contact form submissions" value={eventMap["contact_form_submit"] ?? 0} />
          </dl>
        </AdminCard>

        <AdminCard>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg text-charcoal">Recent enquiries</h2>
            <Link href="/admin/enquiries" className="text-sm text-forest-700 hover:underline">
              View all
            </Link>
          </div>
          {recentEnquiries.length === 0 ? (
            <p className="mt-5 text-sm text-charcoal/65">No enquiries yet.</p>
          ) : (
            <ul className="mt-5 divide-y divide-charcoal/10">
              {recentEnquiries.map((enq) => (
                <li key={enq.id} className="py-3">
                  <Link href={`/admin/enquiries/${enq.id}`} className="block">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-charcoal">{enq.name}</span>
                      <span className="text-xs text-charcoal/65">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-xs text-charcoal/65">{enq.message}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  highlight,
}: {
  label: string;
  value: number;
  href: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-sm border p-5 transition-colors ${
        highlight
          ? "border-burgundy-300 bg-burgundy-50"
          : "border-charcoal/10 bg-ivory-50 hover:border-forest-300"
      }`}
    >
      <p className="text-3xl font-serif text-charcoal">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-charcoal/65">{label}</p>
    </Link>
  );
}

function ActivityRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between border-b border-charcoal/5 pb-2 last:border-0">
      <dt className="text-sm text-charcoal/70">{label}</dt>
      <dd className="text-sm font-medium text-charcoal">{value}</dd>
    </div>
  );
}
