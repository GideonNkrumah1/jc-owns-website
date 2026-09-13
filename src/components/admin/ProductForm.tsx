"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Field, inputClass, SaveButton } from "@/components/admin/AdminUI";
import { ImageUrlField } from "@/components/admin/ImageUrlField";
import { slugify } from "@/lib/utils";
import type { Category, Product } from "@/db/schema";

type ActionState = { error?: string } | undefined;
type Action = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

export function ProductForm({
  product,
  categories,
  action,
}: {
  product?: Product;
  categories: Category[];
  action: Action;
}) {
  const [state, formAction] = useFormState(action, undefined);
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!product);

  return (
    <form action={formAction} className="max-w-3xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Product name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            className={inputClass}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
          />
        </Field>
        <Field label="URL slug" htmlFor="slug" hint="/shop/your-slug">
          <input
            id="slug"
            name="slug"
            required
            className={inputClass}
            value={slug}
            onChange={(e) => {
              setSlug(slugify(e.target.value));
              setSlugTouched(true);
            }}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Category" htmlFor="categoryId">
          <select
            id="categoryId"
            name="categoryId"
            required
            defaultValue={product?.categoryId ?? ""}
            className={inputClass}
          >
            <option value="" disabled>
              Choose a category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="SKU" htmlFor="sku" optional>
          <input id="sku" name="sku" defaultValue={product?.sku ?? ""} className={inputClass} />
        </Field>
      </div>

      <Field
        label="Short description"
        htmlFor="shortDescription"
        optional
        hint="A one-line tagline shown near the product name (e.g. a campaign message)."
      >
        <input
          id="shortDescription"
          name="shortDescription"
          defaultValue={product?.shortDescription ?? ""}
          className={inputClass}
        />
      </Field>

      <Field label="Description" htmlFor="description" optional>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="How to use" htmlFor="howToUse" optional>
          <textarea
            id="howToUse"
            name="howToUse"
            rows={3}
            defaultValue={product?.howToUse ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Suitable applications" htmlFor="suitableFor" optional>
          <textarea
            id="suitableFor"
            name="suitableFor"
            rows={3}
            defaultValue={product?.suitableFor ?? ""}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Delivery note" htmlFor="deliveryNote" optional hint="Leave blank to use the site-wide delivery message.">
        <textarea
          id="deliveryNote"
          name="deliveryNote"
          rows={2}
          defaultValue={product?.deliveryNote ?? ""}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Price (GHS)"
          htmlFor="price"
          optional
          hint="Leave blank to show “price shared on WhatsApp”."
        >
          <input
            id="price"
            name="price"
            type="text"
            inputMode="decimal"
            defaultValue={product?.price ?? ""}
            className={inputClass}
            placeholder="e.g. 45.00"
          />
        </Field>
        <Field label="Tags" htmlFor="tags" optional hint="Comma-separated, e.g. home care, featured">
          <input
            id="tags"
            name="tags"
            defaultValue={product?.tags?.join(", ") ?? ""}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-charcoal">
          <input
            type="checkbox"
            name="isAvailable"
            defaultChecked={product?.isAvailable ?? true}
            className="h-4 w-4 rounded border-charcoal/30"
          />
          Available for order
        </label>
        <label className="flex items-center gap-2 text-sm text-charcoal">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={product?.isFeatured ?? false}
            className="h-4 w-4 rounded border-charcoal/30"
          />
          Feature on homepage
        </label>
      </div>

      {!product && (
        <ImageUrlField
          name="imageUrl"
          label="Product image"
          hint="You can add more images after creating the product."
        />
      )}

      <fieldset className="rounded-sm border border-charcoal/10 p-4">
        <legend className="px-1 text-xs font-semibold uppercase tracking-widest text-charcoal/65">
          SEO (optional)
        </legend>
        <div className="space-y-4">
          <Field label="SEO title" htmlFor="seoTitle" optional>
            <input
              id="seoTitle"
              name="seoTitle"
              defaultValue={product?.seoTitle ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="SEO description" htmlFor="seoDescription" optional>
            <textarea
              id="seoDescription"
              name="seoDescription"
              rows={2}
              defaultValue={product?.seoDescription ?? ""}
              className={inputClass}
            />
          </Field>
        </div>
      </fieldset>

      {state?.error && (
        <p className="rounded-sm bg-burgundy-50 px-4 py-3 text-sm text-burgundy-600">
          {state.error}
        </p>
      )}

      <SaveButton>{product ? "Save Changes" : "Create Product"}</SaveButton>
    </form>
  );
}
