import Link from "next/link";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { AdminPageHeader, AdminCard, EmptyState, LinkButton } from "@/components/admin/AdminUI";
import { ConfirmDeleteForm } from "@/components/admin/ConfirmDeleteForm";
import { deleteCategory } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const allCategories = await db.query.categories.findMany({
    orderBy: asc(categories.sortOrder),
    with: { products: true },
  });

  return (
    <div>
      <AdminPageHeader
        title="Categories"
        description="Gifts & More, Ankara & Bags, Home Care — and any new collections you add."
        action={<LinkButton href="/admin/categories/new">Add Category</LinkButton>}
      />

      {allCategories.length === 0 ? (
        <EmptyState>No categories yet.</EmptyState>
      ) : (
        <div className="space-y-3">
          {allCategories.map((cat) => (
            <AdminCard key={cat.id} className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg text-charcoal">{cat.name}</h3>
                  {!cat.isActive && (
                    <span className="rounded-full bg-charcoal/10 px-2 py-0.5 text-[11px] uppercase tracking-widest text-charcoal/65">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-sm text-charcoal/65">
                  /collections/{cat.slug} &middot; {cat.products.length} product
                  {cat.products.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/categories/${cat.id}`}
                  className="text-sm font-medium text-forest-700 hover:underline"
                >
                  Edit
                </Link>
                <ConfirmDeleteForm
                  action={deleteCategory.bind(null, cat.id)}
                  confirmText={`Delete "${cat.name}"? This cannot be undone.`}
                />
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
