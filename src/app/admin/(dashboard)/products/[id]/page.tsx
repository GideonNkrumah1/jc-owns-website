import { notFound } from "next/navigation";
import Image from "next/image";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { AdminPageHeader, AdminCard, inputClass } from "@/components/admin/AdminUI";
import { ProductForm } from "@/components/admin/ProductForm";
import { ImageUrlField } from "@/components/admin/ImageUrlField";
import { getAllCategoriesAdmin } from "@/lib/data";
import {
  updateProduct,
  addVariant,
  deleteVariant,
  addImage,
  deleteImage,
} from "../actions";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    db.query.products.findFirst({
      where: eq(products.id, params.id),
      with: { variants: true, images: true },
    }),
    getAllCategoriesAdmin(),
  ]);

  if (!product) notFound();

  const action = updateProduct.bind(null, product.id);
  const boundAddVariant = addVariant.bind(null, product.id);
  const boundAddImage = addImage.bind(null, product.id);

  return (
    <div className="space-y-10">
      <div>
        <AdminPageHeader title={`Edit: ${product.name}`} />
        <AdminCard>
          <ProductForm product={product} categories={categories} action={action} />
        </AdminCard>
      </div>

      <div>
        <h2 className="mb-4 font-serif text-xl text-charcoal">Sizes / Variants</h2>
        <AdminCard>
          {product.variants.length === 0 ? (
            <p className="text-sm text-charcoal/65">
              No variants yet. If this product only comes in one size, you can
              leave this empty.
            </p>
          ) : (
            <ul className="divide-y divide-charcoal/10">
              {product.variants.map((variant) => (
                <li key={variant.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="text-sm">
                    <span className="font-medium text-charcoal">{variant.label}</span>
                    {variant.sku && <span className="ml-2 text-charcoal/65">SKU: {variant.sku}</span>}
                    {variant.price && <span className="ml-2 text-charcoal/65">GHS {variant.price}</span>}
                    {!variant.isAvailable && (
                      <span className="ml-2 rounded-full bg-charcoal/10 px-2 py-0.5 text-[11px] uppercase tracking-widest text-charcoal/65">
                        Unavailable
                      </span>
                    )}
                  </div>
                  <form action={deleteVariant.bind(null, variant.id, product.id)}>
                    <button className="text-xs font-medium text-burgundy-600 hover:underline">
                      Remove
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}

          <form action={boundAddVariant} className="mt-5 grid gap-3 border-t border-charcoal/10 pt-5 sm:grid-cols-4">
            <input name="label" placeholder="Label, e.g. 1L" required className={inputClass} />
            <input name="sku" placeholder="SKU (optional)" className={inputClass} />
            <input name="price" placeholder="Price (optional)" className={inputClass} />
            <button
              type="submit"
              className="rounded-sm bg-forest-700 px-4 py-2.5 text-sm font-medium text-ivory-50 hover:bg-forest-800"
            >
              Add Variant
            </button>
          </form>
        </AdminCard>
      </div>

      <div>
        <h2 className="mb-4 font-serif text-xl text-charcoal">Photos</h2>
        <AdminCard>
          {product.images.length === 0 ? (
            <p className="text-sm text-charcoal/65">No photos added yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {product.images.map((image) => (
                <div key={image.id} className="space-y-2">
                  <div className="relative aspect-square overflow-hidden rounded-sm bg-ivory-200">
                    <Image src={image.url} alt={image.altText ?? ""} fill sizes="150px" className="object-cover" />
                  </div>
                  <form action={deleteImage.bind(null, image.id, product.id)}>
                    <button className="text-xs font-medium text-burgundy-600 hover:underline">
                      Remove
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}

          <form action={boundAddImage} className="mt-5 space-y-3 border-t border-charcoal/10 pt-5">
            <ImageUrlField name="url" label="Add a photo" hint="Paste a link, or upload a file from your computer." />
            <input
              name="altText"
              placeholder="Alt text (optional, for accessibility & SEO)"
              className={inputClass}
            />
            <button
              type="submit"
              className="rounded-sm bg-forest-700 px-4 py-2.5 text-sm font-medium text-ivory-50 hover:bg-forest-800"
            >
              Add Photo
            </button>
          </form>
        </AdminCard>
      </div>
    </div>
  );
}
