"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { categoryFormSchema } from "@/lib/validations";
import { TAGS } from "@/lib/data";

function parseForm(formData: FormData) {
  return categoryFormSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    tagline: formData.get("tagline") ?? "",
    description: formData.get("description") ?? "",
    heroImageUrl: formData.get("heroImageUrl") ?? "",
    sortOrder: formData.get("sortOrder") || 0,
    isActive: formData.get("isActive") === "on",
    seoTitle: formData.get("seoTitle") ?? "",
    seoDescription: formData.get("seoDescription") ?? "",
  });
}

export async function createCategory(_prevState: unknown, formData: FormData) {
  let data;
  try {
    data = parseForm(formData);
  } catch {
    return { error: "Please check the form for errors." };
  }

  try {
    await db.insert(categories).values(data);
  } catch (err: unknown) {
    if (isUniqueViolation(err)) {
      return { error: "A category with this slug already exists." };
    }
    console.error(err);
    return { error: "Something went wrong creating the category." };
  }

  revalidateTag(TAGS.categories);
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(id: string, _prevState: unknown, formData: FormData) {
  let data;
  try {
    data = parseForm(formData);
  } catch {
    return { error: "Please check the form for errors." };
  }

  try {
    await db.update(categories).set(data).where(eq(categories.id, id));
  } catch (err: unknown) {
    if (isUniqueViolation(err)) {
      return { error: "A category with this slug already exists." };
    }
    console.error(err);
    return { error: "Something went wrong saving the category." };
  }

  revalidateTag(TAGS.categories);
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string, _prevState: unknown, _formData: FormData) {
  try {
    await db.delete(categories).where(eq(categories.id, id));
  } catch (err: unknown) {
    console.error(err);
    return {
      error:
        "This category still has products in it. Move or delete those products first.",
    };
  }
  revalidateTag(TAGS.categories);
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "23505"
  );
}
