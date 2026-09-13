"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Field, inputClass, SaveButton } from "@/components/admin/AdminUI";
import { slugify } from "@/lib/utils";
import type { Category } from "@/db/schema";

type ActionState = { error?: string } | undefined;
type Action = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

export function CategoryForm({
  category,
  action,
}: {
  category?: Category;
  action: Action;
}) {
  const [state, formAction] = useFormState(action, undefined);
  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!category);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <Field label="Name" htmlFor="name">
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

      <Field
        label="URL slug"
        htmlFor="slug"
        hint="Used in the web address, e.g. /collections/gifts-and-more"
      >
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

      <Field label="Tagline" htmlFor="tagline" optional>
        <input
          id="tagline"
          name="tagline"
          defaultValue={category?.tagline ?? ""}
          className={inputClass}
          placeholder="A short line shown under the category name"
        />
      </Field>

      <Field label="Description" htmlFor="description" optional>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={category?.description ?? ""}
          className={inputClass}
        />
      </Field>

      <Field
        label="Hero image URL"
        htmlFor="heroImageUrl"
        optional
        hint="Paste a link to an image. Leave blank to use the default artwork."
      >
        <input
          id="heroImageUrl"
          name="heroImageUrl"
          defaultValue={category?.heroImageUrl ?? ""}
          className={inputClass}
          placeholder="https://..."
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Sort order" htmlFor="sortOrder" hint="Lower numbers appear first">
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={category?.sortOrder ?? 0}
            className={inputClass}
          />
        </Field>
        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={category?.isActive ?? true}
              className="h-4 w-4 rounded border-charcoal/30"
            />
            Visible on the website
          </label>
        </div>
      </div>

      <fieldset className="rounded-sm border border-charcoal/10 p-4">
        <legend className="px-1 text-xs font-semibold uppercase tracking-widest text-charcoal/65">
          SEO (optional)
        </legend>
        <div className="space-y-4">
          <Field label="SEO title" htmlFor="seoTitle" optional>
            <input
              id="seoTitle"
              name="seoTitle"
              defaultValue={category?.seoTitle ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="SEO description" htmlFor="seoDescription" optional>
            <textarea
              id="seoDescription"
              name="seoDescription"
              rows={2}
              defaultValue={category?.seoDescription ?? ""}
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

      <SaveButton>{category ? "Save Changes" : "Create Category"}</SaveButton>
    </form>
  );
}
