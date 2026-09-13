import Link from "next/link";
import Image from "next/image";
import { getAllProductsAdmin } from "@/lib/data";
import { AdminPageHeader, AdminCard, EmptyState, LinkButton } from "@/components/admin/AdminUI";
import { ConfirmDeleteForm } from "@/components/admin/ConfirmDeleteForm";
import { formatPrice } from "@/lib/utils";
import { deleteProduct } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const allProducts = await getAllProductsAdmin();

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description="Everything shown on the Shop page and inside each collection."
        action={<LinkButton href="/admin/products/new">Add Product</LinkButton>}
      />

      {allProducts.length === 0 ? (
        <EmptyState>No products yet. Add your first one to get started.</EmptyState>
      ) : (
        <div className="space-y-3">
          {allProducts.map((product) => (
            <AdminCard key={product.id} className="flex flex-wrap items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-ivory-200">
                {product.images[0] && (
                  <Image
                    src={product.images[0].url}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="min-w-[200px] flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-base text-charcoal">{product.name}</h3>
                  {product.isFeatured && (
                    <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[11px] uppercase tracking-widest text-gold-700">
                      Featured
                    </span>
                  )}
                  {!product.isAvailable && (
                    <span className="rounded-full bg-charcoal/10 px-2 py-0.5 text-[11px] uppercase tracking-widest text-charcoal/65">
                      Unavailable
                    </span>
                  )}
                </div>
                <p className="text-sm text-charcoal/65">
                  {product.category?.name ?? "No category"} &middot;{" "}
                  {formatPrice(product.price, product.currency) ?? "Price on WhatsApp"}
                  {product.variants.length > 0 &&
                    ` · ${product.variants.map((v) => v.label).join(", ")}`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/products/${product.id}`}
                  className="text-sm font-medium text-forest-700 hover:underline"
                >
                  Edit
                </Link>
                <ConfirmDeleteForm
                  action={deleteProduct.bind(null, product.id)}
                  confirmText={`Delete "${product.name}"? This cannot be undone.`}
                />
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
