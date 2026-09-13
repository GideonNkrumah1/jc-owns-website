import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(200),
  phone: z.string().trim().min(9, "Please enter a valid phone number.").max(30),
  email: z
    .union([z.email("Please enter a valid email address."), z.literal("")])
    .optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, "Please add a short message.").max(4000),
  // Honeypot — real visitors never fill this in.
  company: z.string().max(0, "Spam detected.").optional().default(""),
  // Anti-bot timer: form must have been on screen for at least a couple of seconds.
  renderedAt: z.coerce.number(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const categoryFormSchema = z.object({
  name: z.string().trim().min(2).max(200),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only."),
  tagline: z.string().trim().max(500).optional().or(z.literal("")),
  description: z.string().trim().max(4000).optional().or(z.literal("")),
  heroImageUrl: z.string().trim().max(2000).optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.coerce.boolean().default(true),
  seoTitle: z.string().trim().max(255).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(500).optional().or(z.literal("")),
});

export const productVariantSchema = z.object({
  id: z.string().optional(),
  label: z.string().trim().min(1, "Size/variant label is required.").max(100),
  sku: z.string().trim().max(100).optional().or(z.literal("")),
  price: z.string().trim().optional().or(z.literal("")),
  isAvailable: z.coerce.boolean().default(true),
});

export const productFormSchema = z.object({
  name: z.string().trim().min(2).max(255),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only."),
  sku: z.string().trim().max(100).optional().or(z.literal("")),
  categoryId: z.string().min(1, "Choose a category."),
  shortDescription: z.string().trim().max(500).optional().or(z.literal("")),
  description: z.string().trim().max(6000).optional().or(z.literal("")),
  howToUse: z.string().trim().max(4000).optional().or(z.literal("")),
  suitableFor: z.string().trim().max(2000).optional().or(z.literal("")),
  deliveryNote: z.string().trim().max(2000).optional().or(z.literal("")),
  price: z.string().trim().optional().or(z.literal("")),
  isAvailable: z.coerce.boolean().default(true),
  isFeatured: z.coerce.boolean().default(false),
  tags: z.string().trim().optional().or(z.literal("")), // comma separated in the form
  seoTitle: z.string().trim().max(255).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(500).optional().or(z.literal("")),
  imageUrl: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const faqFormSchema = z.object({
  question: z.string().trim().min(3).max(500),
  answer: z.string().trim().min(3).max(4000),
  category: z.string().trim().max(100).optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.coerce.boolean().default(true),
});

export const settingsFormSchema = z.object({
  whatsappNumber: z.string().trim().min(9).max(32),
  phoneNumber: z.string().trim().min(9).max(32),
  locations: z.string().trim().min(2).max(255),
  deliveryNote: z.string().trim().min(2).max(255),
  heroHeadline: z.string().trim().max(255).optional().or(z.literal("")),
  heroSubheadline: z.string().trim().max(500).optional().or(z.literal("")),
  brandIntro: z.string().trim().max(2000).optional().or(z.literal("")),
  brandStory: z.string().trim().max(6000).optional().or(z.literal("")),
  aboutContent: z.string().trim().max(6000).optional().or(z.literal("")),
  contactEmail: z
    .union([z.email(), z.literal("")])
    .optional(),
  facebookUrl: z.string().trim().max(500).optional().or(z.literal("")),
  instagramUrl: z.string().trim().max(500).optional().or(z.literal("")),
  tiktokUrl: z.string().trim().max(500).optional().or(z.literal("")),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password."),
    newPassword: z.string().min(8, "New password must be at least 8 characters."),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
  });
