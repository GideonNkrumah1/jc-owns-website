"use server";

import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteSettings, adminUsers } from "@/db/schema";
import { settingsFormSchema, changePasswordSchema } from "@/lib/validations";
import { authOptions } from "@/lib/auth";
import { TAGS } from "@/lib/data";

export async function updateSettings(_prevState: unknown, formData: FormData) {
  let data;
  try {
    data = settingsFormSchema.parse({
      whatsappNumber: formData.get("whatsappNumber"),
      phoneNumber: formData.get("phoneNumber"),
      locations: formData.get("locations"),
      deliveryNote: formData.get("deliveryNote"),
      heroHeadline: formData.get("heroHeadline") ?? "",
      heroSubheadline: formData.get("heroSubheadline") ?? "",
      brandIntro: formData.get("brandIntro") ?? "",
      brandStory: formData.get("brandStory") ?? "",
      aboutContent: formData.get("aboutContent") ?? "",
      contactEmail: formData.get("contactEmail") ?? "",
      facebookUrl: formData.get("facebookUrl") ?? "",
      instagramUrl: formData.get("instagramUrl") ?? "",
      tiktokUrl: formData.get("tiktokUrl") ?? "",
    });
  } catch {
    return { error: "Please check the form for errors." };
  }

  const existing = await db.query.siteSettings.findFirst();
  const values = {
    ...data,
    heroHeadline: data.heroHeadline || null,
    heroSubheadline: data.heroSubheadline || null,
    brandIntro: data.brandIntro || null,
    brandStory: data.brandStory || null,
    aboutContent: data.aboutContent || null,
    contactEmail: data.contactEmail || null,
    facebookUrl: data.facebookUrl || null,
    instagramUrl: data.instagramUrl || null,
    tiktokUrl: data.tiktokUrl || null,
  };

  if (existing) {
    await db.update(siteSettings).set(values).where(eq(siteSettings.id, "singleton"));
  } else {
    await db.insert(siteSettings).values({ id: "singleton", ...values });
  }

  revalidateTag(TAGS.settings);
  return { success: true };
}

export async function changePassword(_prevState: unknown, formData: FormData) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return { error: "You must be signed in." };
  }

  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  const user = await db.query.adminUsers.findFirst({ where: eq(adminUsers.id, userId) });
  if (!user) return { error: "Account not found." };

  const valid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
  if (!valid) return { error: "Current password is incorrect." };

  const newHash = await bcrypt.hash(parsed.data.newPassword, 12);
  await db.update(adminUsers).set({ passwordHash: newHash }).where(eq(adminUsers.id, userId));

  return { success: true };
}
