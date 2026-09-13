import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  numeric,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@/lib/id";

// ---------------------------------------------------------------------------
// Admin authentication
// ---------------------------------------------------------------------------

export const adminUsers = pgTable("admin_users", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// Catalogue
// ---------------------------------------------------------------------------

export const categories = pgTable("categories", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  tagline: varchar("tagline", { length: 500 }),
  description: text("description"),
  heroImageUrl: text("hero_image_url"),
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: varchar("seo_description", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  sku: varchar("sku", { length: 100 }),
  shortDescription: varchar("short_description", { length: 500 }),
  description: text("description"),
  howToUse: text("how_to_use"),
  suitableFor: text("suitable_for"),
  deliveryNote: text("delivery_note"),
  price: numeric("price", { precision: 10, scale: 2 }),
  currency: varchar("currency", { length: 8 }).default("GHS").notNull(),
  isAvailable: boolean("is_available").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  tags: text("tags")
    .array()
    .default([])
    .notNull(),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: varchar("seo_description", { length: 500 }),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "restrict" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productImages = pgTable("product_images", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  altText: varchar("alt_text", { length: 255 }),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const productVariants = pgTable("product_variants", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  label: varchar("label", { length: 100 }).notNull(),
  sku: varchar("sku", { length: 100 }),
  price: numeric("price", { precision: 10, scale: 2 }),
  isAvailable: boolean("is_available").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
  variants: many(productVariants),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
}));

// ---------------------------------------------------------------------------
// Enquiries (WhatsApp-first ordering; extendable into full orders later)
// ---------------------------------------------------------------------------

export const enquiryStatusEnum = pgEnum("enquiry_status", [
  "NEW",
  "READ",
  "RESPONDED",
  "ARCHIVED",
]);

export const enquiries = pgTable("enquiries", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  source: varchar("source", { length: 100 }).notNull(),
  productName: varchar("product_name", { length: 255 }),
  status: enquiryStatusEnum("status").default("NEW").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export const faqs = pgTable("faqs", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  question: varchar("question", { length: 500 }).notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 100 }),
  sortOrder: integer("sort_order").default(0).notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: varchar("id", { length: 32 }).primaryKey().default("singleton"),
  whatsappNumber: varchar("whatsapp_number", { length: 32 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 32 }).notNull(),
  locations: varchar("locations", { length: 255 }).notNull(),
  deliveryNote: varchar("delivery_note", { length: 255 }).notNull(),
  heroHeadline: varchar("hero_headline", { length: 255 }),
  heroSubheadline: varchar("hero_subheadline", { length: 500 }),
  brandIntro: text("brand_intro"),
  brandStory: text("brand_story"),
  aboutContent: text("about_content"),
  contactEmail: varchar("contact_email", { length: 255 }),
  facebookUrl: text("facebook_url"),
  instagramUrl: text("instagram_url"),
  tiktokUrl: text("tiktok_url"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// Lightweight first-party analytics — gives the admin dashboard real numbers
// even before/without GA4 configured.
// ---------------------------------------------------------------------------

export const analyticsEvents = pgTable("analytics_events", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  type: varchar("type", { length: 64 }).notNull(),
  path: text("path"),
  meta: jsonb("meta"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type ProductImage = typeof productImages.$inferSelect;
export type ProductVariant = typeof productVariants.$inferSelect;
export type Enquiry = typeof enquiries.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
