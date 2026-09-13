"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { enquiries, enquiryStatusEnum } from "@/db/schema";

type Status = (typeof enquiryStatusEnum.enumValues)[number];

export async function updateEnquiryStatus(id: string, status: Status) {
  await db.update(enquiries).set({ status }).where(eq(enquiries.id, id));
  revalidatePath("/admin/enquiries");
  revalidatePath(`/admin/enquiries/${id}`);
}

export async function deleteEnquiry(id: string) {
  await db.delete(enquiries).where(eq(enquiries.id, id));
  revalidatePath("/admin/enquiries");
  redirect("/admin/enquiries");
}
