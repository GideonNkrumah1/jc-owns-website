"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products, productVariants, productImages } from "@/db/schema";
import { productFormSchema } from "@/lib/validations";
import { TAGS } from "@/lib/data";

function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "23505"
  );
}

function parseForm(formData: FormData) {
  return productFormSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    sku: formData.get("sku") ?? "",
    categoryId: formData.get("categoryId"),
    shortDescription: formData.get("shortDescription") ?? "",
    description: formData.get("description") ?? "",
    howToUse: formData.get("howToUse") ?? "",
    suitableFor: formData.get("suitableFor") ?? "",
    deliveryNote: formData.get("deliveryNote") ?? "",
    price: formData.get("price") ?? "",
    isAvailable: formData.get("isAvailable") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    tags: formData.get("tags") ?? "",
    seoTitle: formData.get("seoTitle") ?? "",
    seoDescription: formData.get("seoDescription") ?? "",
    imageUrl: formData.get("imageUrl") ?? "",
  });
}

function toDbValues(data: ReturnType<typeof parseForm>) {
  return {
    name: data.name,
    slug: data.slug,
    sku: data.sku || null,
    categoryId: data.categoryId,
    shortDescription: data.shortDescription || null,
    description: data.description || null,
    howToUse: data.howToUse || null,
    suitableFor: data.suitableFor || null,
    deliveryNote: data.deliveryNote || null,
    price: data.price ? data.price : null,
    isAvailable: data.isAvailable,
    isFeatured: data.isFeatured,
    tags: data.tags
      ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    seoTitle: data.seoTitle || null,
    seoDescription: data.seoDescription || null,
  };
}

export async function createProduct(_prevState: unknown, formData: FormData) {
  let data;
  try {
    data = parseForm(formData);
  } catch {
    return { error: "Please check the form for errors." };
  }

  let newId: string;
  try {
    const [created] = await db.insert(products).values(toDbValues(data)).returning();
    newId = created.id;

    if (data.imageUrl) {
      await db.insert(productImages).values({
        productId: newId,
        url: data.imageUrl,
        altText: data.name,
      });
    }
  } catch (err) {
    if (isUniqueViolation(err)) {
      return { error: "A product with this slug or SKU already exists." };
    }
    console.error(err);
    return { error: "Something went wrong creating the product." };
  }

  revalidateTag(TAGS.products);
  revalidatePath("/admin/products");
  redirect(`/admin/products/${newId}`);
}

export async function updateProduct(id: string, _prevState: unknown, formData: FormData) {
  let data;
  try {
    data = parseForm(formData);
  } catch {
    return { error: "Please check the form for errors." };
  }

  try {
    await db.update(products).set(toDbValues(data)).where(eq(products.id, id));

    if (data.imageUrl) {
      const existing = await db.query.productImages.findFirst({
        where: eq(productImages.productId, id),
      });
      if (!existing) {
        await db.insert(productImages).values({
          productId: id,
          url: data.imageUrl,
          altText: data.name,
        });
      }
    }
  } catch (err) {
    if (isUniqueViolation(err)) {
      return { error: "A product with this slug or SKU already exists." };
    }
    console.error(err);
    return { error: "Something went wrong saving the product." };
  }

  revalidateTag(TAGS.products);
  revalidateTag(TAGS.product(data.slug));
  revalidatePath("/admin/products");
  redirect(`/admin/products/${id}`);
}

export async function deleteProduct(
  id: string,
  _prevState: { error?: string } | undefined,
  _formData: FormData
): Promise<{ error?: string } | undefined> {
  await db.delete(products).where(eq(products.id, id));
  revalidateTag(TAGS.products);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

export async function addVariant(productId: string, formData: FormData) {
  const label = formData.get("label")?.toString().trim();
  if (!label) return;

  await db.insert(productVariants).values({
    productId,
    label,
    sku: formData.get("sku")?.toString() || null,
    price: formData.get("price")?.toString() || null,
  });

  revalidateTag(TAGS.products);
  revalidatePath(`/admin/products/${productId}`);
}

export async function deleteVariant(variantId: string, productId: string) {
  await db.delete(productVariants).where(eq(productVariants.id, variantId));
  revalidateTag(TAGS.products);
  revalidatePath(`/admin/products/${productId}`);
}

export async function toggleVariantAvailability(
  variantId: string,
  productId: string,
  isAvailable: boolean
) {
  await db
    .update(productVariants)
    .set({ isAvailable })
    .where(eq(productVariants.id, variantId));
  revalidateTag(TAGS.products);
  revalidatePath(`/admin/products/${productId}`);
}

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------

export async function addImage(productId: string, formData: FormData) {
  const url = formData.get("url")?.toString().trim();
  if (!url) return;

  await db.insert(productImages).values({
    productId,
    url,
    altText: formData.get("altText")?.toString() || null,
  });

  revalidateTag(TAGS.products);
  revalidatePath(`/admin/products/${productId}`);
}

export async function deleteImage(imageId: string, productId: string) {
  await db.delete(productImages).where(eq(productImages.id, imageId));
  revalidateTag(TAGS.products);
  revalidatePath(`/admin/products/${productId}`);
}
