"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { faqFormSchema } from "@/lib/validations";
import { TAGS } from "@/lib/data";

function parseForm(formData: FormData) {
  return faqFormSchema.parse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    category: formData.get("category") ?? "",
    sortOrder: formData.get("sortOrder") || 0,
    isPublished: formData.get("isPublished") === "on",
  });
}

export async function createFaq(_prevState: unknown, formData: FormData) {
  let data;
  try {
    data = parseForm(formData);
  } catch {
    return { error: "Please check the form for errors." };
  }

  await db.insert(faqs).values({ ...data, category: data.category || null });
  revalidateTag(TAGS.faqs);
  revalidatePath("/admin/faqs");
  redirect("/admin/faqs");
}

export async function updateFaq(id: string, _prevState: unknown, formData: FormData) {
  let data;
  try {
    data = parseForm(formData);
  } catch {
    return { error: "Please check the form for errors." };
  }

  await db.update(faqs).set({ ...data, category: data.category || null }).where(eq(faqs.id, id));
  revalidateTag(TAGS.faqs);
  revalidatePath("/admin/faqs");
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string) {
  await db.delete(faqs).where(eq(faqs.id, id));
  revalidateTag(TAGS.faqs);
  revalidatePath("/admin/faqs");
}
