import { unstable_cache } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  categories,
  products,
  productImages,
  productVariants,
  faqs,
  siteSettings,
} from "@/db/schema";

// ---------------------------------------------------------------------------
// Cache tags — admin server actions call revalidateTag(...) with these after
// every write, so edits show up immediately without waiting for the time
// based revalidation window below.
// ---------------------------------------------------------------------------
export const TAGS = {
  settings: "settings",
  categories: "categories",
  products: "products",
  faqs: "faqs",
  product: (slug: string) => `product:${slug}`,
} as const;

const REVALIDATE_SECONDS = 300;

export const getSiteSettings = unstable_cache(
  async () => {
    const row = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.id, "singleton"),
    });
    return row ?? null;
  },
  ["site-settings"],
  { tags: [TAGS.settings], revalidate: REVALIDATE_SECONDS }
);

export const getActiveCategories = unstable_cache(
  async () => {
    return db.query.categories.findMany({
      where: eq(categories.isActive, true),
      orderBy: asc(categories.sortOrder),
    });
  },
  ["active-categories"],
  { tags: [TAGS.categories], revalidate: REVALIDATE_SECONDS }
);

export const getAllCategoriesAdmin = async () => {
  return db.query.categories.findMany({ orderBy: asc(categories.sortOrder) });
};

export const getCategoryBySlug = unstable_cache(
  async (slug: string) => {
    return db.query.categories.findFirst({ where: eq(categories.slug, slug) });
  },
  ["category-by-slug"],
  { tags: [TAGS.categories], revalidate: REVALIDATE_SECONDS }
);

export const getProductsByCategorySlug = unstable_cache(
  async (slug: string) => {
    const category = await db.query.categories.findFirst({
      where: eq(categories.slug, slug),
    });
    if (!category) return [];
    return db.query.products.findMany({
      where: eq(products.categoryId, category.id),
      with: { images: { orderBy: asc(productImages.sortOrder) }, variants: true },
      orderBy: asc(products.createdAt),
    });
  },
  ["products-by-category"],
  { tags: [TAGS.products, TAGS.categories], revalidate: REVALIDATE_SECONDS }
);

export const getAllProducts = unstable_cache(
  async () => {
    return db.query.products.findMany({
      where: eq(products.isAvailable, true),
      with: {
        images: { orderBy: asc(productImages.sortOrder) },
        variants: true,
        category: true,
      },
      orderBy: asc(products.createdAt),
    });
  },
  ["all-products"],
  { tags: [TAGS.products], revalidate: REVALIDATE_SECONDS }
);

export const getAllProductsAdmin = async () => {
  return db.query.products.findMany({
    with: { images: true, variants: true, category: true },
    orderBy: asc(products.createdAt),
  });
};

export const getFeaturedProducts = unstable_cache(
  async () => {
    return db.query.products.findMany({
      where: eq(products.isFeatured, true),
      with: { images: { orderBy: asc(productImages.sortOrder) }, variants: true },
    });
  },
  ["featured-products"],
  { tags: [TAGS.products], revalidate: REVALIDATE_SECONDS }
);

export const getProductBySlug = async (slug: string) => {
  const fn = unstable_cache(
    async (s: string) => {
      return db.query.products.findFirst({
        where: eq(products.slug, s),
        with: {
          images: { orderBy: asc(productImages.sortOrder) },
          variants: { orderBy: asc(productVariants.sortOrder) },
          category: true,
        },
      });
    },
    ["product-by-slug", slug],
    { tags: [TAGS.product(slug), TAGS.products], revalidate: REVALIDATE_SECONDS }
  );
  return fn(slug);
};

export const getRelatedProducts = unstable_cache(
  async (categoryId: string, excludeProductId: string) => {
    const all = await db.query.products.findMany({
      where: eq(products.categoryId, categoryId),
      with: { images: { orderBy: asc(productImages.sortOrder) }, variants: true },
      limit: 5,
    });
    return all.filter((p) => p.id !== excludeProductId).slice(0, 4);
  },
  ["related-products"],
  { tags: [TAGS.products], revalidate: REVALIDATE_SECONDS }
);

export const getPublishedFaqs = unstable_cache(
  async () => {
    return db.query.faqs.findMany({
      where: eq(faqs.isPublished, true),
      orderBy: asc(faqs.sortOrder),
    });
  },
  ["published-faqs"],
  { tags: [TAGS.faqs], revalidate: REVALIDATE_SECONDS }
);

export const getAllFaqsAdmin = async () => {
  return db.query.faqs.findMany({ orderBy: asc(faqs.sortOrder) });
};
