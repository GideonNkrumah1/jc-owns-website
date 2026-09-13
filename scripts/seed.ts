/**
 * Seeds the database with the real, currently-known JC-OWNS content only.
 *
 * Deliberately excluded: fake reviews, invented history, made-up prices for
 * products that don't have a public price yet, or categories/products that
 * were not supplied. Everything here can be edited afterwards from /admin.
 *
 * Run with: npm run db:seed
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "../src/db";
import {
  adminUsers,
  categories,
  products,
  productVariants,
  productImages,
  siteSettings,
  faqs,
} from "../src/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Seeding JC-OWNS database...");

  // ---------------------------------------------------------------------
  // Admin user
  // ---------------------------------------------------------------------
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment before seeding."
    );
  }

  const existingAdmin = await db.query.adminUsers.findFirst({
    where: eq(adminUsers.email, adminEmail),
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await db.insert(adminUsers).values({
      email: adminEmail,
      passwordHash,
      name: "JC-OWNS Admin",
    });
    console.log(`  ✓ Admin user created: ${adminEmail}`);
  } else {
    console.log(`  · Admin user already exists: ${adminEmail}`);
  }

  // ---------------------------------------------------------------------
  // Site settings
  // ---------------------------------------------------------------------
  const whatsappNumber = process.env.WHATSAPP_NUMBER ?? "233559038376";
  const phoneDisplay = process.env.PHONE_DISPLAY ?? "055 903 8376";

  const existingSettings = await db.query.siteSettings.findFirst();
  if (!existingSettings) {
    await db.insert(siteSettings).values({
      id: "singleton",
      whatsappNumber,
      phoneNumber: phoneDisplay,
      locations: "Accra & Bibiani",
      deliveryNote: "Nationwide Delivery",
      heroHeadline: "Quality. Style. Thoughtful Living.",
      heroSubheadline:
        "Thoughtfully selected products for cleaner spaces, meaningful gifting and everyday living.",
      brandIntro:
        "JC-OWNS brings together thoughtful products designed to add quality, style and practicality to everyday living.",
      brandStory:
        "JC-OWNS Enterprises Limited was built around a simple idea: everyday living deserves care. From gifts that mark life's moments, to Ankara pieces and bags made for daily use, to home care products that keep spaces clean and welcoming, every category under JC-OWNS is chosen with the same standard in mind — quality, style and thoughtful living. We're based in Accra and Bibiani, and we deliver nationwide, because thoughtful living shouldn't depend on where you're located.",
      aboutContent:
        "JC-OWNS Enterprises Limited is a Ghanaian company built on three simple ideas: quality, style, and thoughtful living. We work across three areas — Gifts & More, Ankara & Bags, and Home Care — bringing the same standard of care to each one. Whether you're looking for a thoughtful gift, an Ankara piece with character, or dependable products for your home, JC-OWNS is built to serve everyday life well. We're based in Accra and Bibiani, Ghana, with delivery nationwide.",
      contactEmail: "",
      facebookUrl: "",
      instagramUrl: "",
      tiktokUrl: "",
    });
    console.log("  ✓ Site settings created");
  } else {
    console.log("  · Site settings already exist");
  }

  // ---------------------------------------------------------------------
  // Categories
  // ---------------------------------------------------------------------
  const categoryData = [
    {
      name: "Gifts & More",
      slug: "gifts-and-more",
      tagline: "Thoughtful gifts for life's moments",
      description:
        "A curated selection of gifts for the people and occasions that matter — chosen for quality and presented with care.",
      sortOrder: 1,
    },
    {
      name: "Ankara & Bags",
      slug: "ankara-and-bags",
      tagline: "Ankara pieces and bags made for everyday style",
      description:
        "Ankara-inspired pieces and bags that bring colour, character and practicality to everyday style.",
      sortOrder: 2,
    },
    {
      name: "Home Care",
      slug: "home-care",
      tagline: "Dependable products for cleaner, healthier spaces",
      description:
        "Practical home care essentials designed for powerful cleaning and everyday reliability, at home or in the office.",
      sortOrder: 3,
    },
  ];

  const categoryIds: Record<string, string> = {};

  for (const cat of categoryData) {
    const existing = await db.query.categories.findFirst({
      where: eq(categories.slug, cat.slug),
    });
    if (existing) {
      categoryIds[cat.slug] = existing.id;
      console.log(`  · Category already exists: ${cat.name}`);
      continue;
    }
    const [created] = await db.insert(categories).values(cat).returning();
    categoryIds[cat.slug] = created.id;
    console.log(`  ✓ Category created: ${cat.name}`);
  }

  // ---------------------------------------------------------------------
  // Featured product: JC-OWNS Multipurpose Liquid Soap
  // ---------------------------------------------------------------------
  const soapSlug = "jc-owns-multipurpose-liquid-soap";
  const existingProduct = await db.query.products.findFirst({
    where: eq(products.slug, soapSlug),
  });

  let soapId = existingProduct?.id;

  if (!existingProduct) {
    const [created] = await db
      .insert(products)
      .values({
        name: "JC-OWNS Multipurpose Liquid Soap",
        slug: soapSlug,
        shortDescription: "Sparkling, Clean Spaces, Healthier Living!",
        description:
          "JC-OWNS Multipurpose Liquid Soap is formulated for hand washing, dish washing and floor cleaning — one dependable bottle for the everyday cleaning your home or office needs.",
        howToUse:
          "For hand washing, dish washing or floor cleaning: apply a small amount to a damp cloth, sponge, or directly to hands, work into a lather, then rinse with water.",
        suitableFor: "Hand Washing, Dish Washing, Floor Cleaning",
        tags: ["home care", "liquid soap", "cleaning", "featured"],
        isFeatured: true,
        isAvailable: true,
        categoryId: categoryIds["home-care"],
        seoTitle: "JC-OWNS Multipurpose Liquid Soap — 500ml & 5L | Ghana",
        seoDescription:
          "JC-OWNS Multipurpose Liquid Soap for hand washing, dish washing and floor cleaning. Available in 500ml and 5L. Nationwide delivery across Ghana.",
      })
      .returning();
    soapId = created.id;

    await db.insert(productVariants).values([
      { productId: soapId, label: "500ml", sortOrder: 1 },
      { productId: soapId, label: "5L", sortOrder: 2 },
    ]);

    await db.insert(productImages).values([
      {
        productId: soapId,
        url: "/brand/jc-owns-liquid-soap.jpg",
        altText:
          "JC-OWNS Multipurpose Liquid Soap bottles, 500ml, with fresh lemons",
        sortOrder: 1,
      },
    ]);

    console.log("  ✓ Product created: JC-OWNS Multipurpose Liquid Soap");
  } else {
    console.log("  · Product already exists: JC-OWNS Multipurpose Liquid Soap");
  }

  // ---------------------------------------------------------------------
  // Gifts & More: Personalized Gift Box
  // ---------------------------------------------------------------------
  const giftBoxSlug = "personalized-gift-box";
  const existingGiftBox = await db.query.products.findFirst({
    where: eq(products.slug, giftBoxSlug),
  });

  if (!existingGiftBox) {
    const [created] = await db
      .insert(products)
      .values({
        name: "Personalized Gift Box",
        slug: giftBoxSlug,
        shortDescription: "Thoughtful gifts, beautifully curated.",
        description:
          "A curated gift box for birthdays, anniversaries and special occasions. Each box can include a tumbler/water bottle, handbag or purse, perfume, keyholder, lip balm, gift box, filler & ribbon, and an optional personalized name and birthday card.",
        deliveryNote:
          "Available in Accra & Bibiani, with nationwide delivery. Please order 1–2 weeks in advance to allow time for personalization.",
        tags: ["gifts", "gift box", "personalized"],
        isAvailable: true,
        categoryId: categoryIds["gifts-and-more"],
        seoTitle: "Personalized Gift Box — JC-OWNS Gifts & More | Ghana",
        seoDescription:
          "Curated gift boxes for birthdays, anniversaries and special occasions, customizable with a name or message. Nationwide delivery across Ghana.",
      })
      .returning();

    await db.insert(productImages).values([
      {
        productId: created.id,
        url: "/products/gifts-personalized-gift-box.jpg",
        altText:
          "JC-OWNS personalized gift box with a handbag, perfume, tumbler, keyholder and lip balm",
        sortOrder: 1,
      },
    ]);

    console.log("  ✓ Product created: Personalized Gift Box");
  } else {
    console.log("  · Product already exists: Personalized Gift Box");
  }

  // ---------------------------------------------------------------------
  // Ankara & Bags: Ankara Print Tote & Crossbody Set
  // ---------------------------------------------------------------------
  const ankaraSetSlug = "ankara-print-tote-crossbody-set";
  const existingAnkaraSet = await db.query.products.findFirst({
    where: eq(products.slug, ankaraSetSlug),
  });

  if (!existingAnkaraSet) {
    const [created] = await db
      .insert(products)
      .values({
        name: "Ankara Print Tote & Crossbody Set",
        slug: ankaraSetSlug,
        shortDescription: "A vibrant three-piece Ankara print bag set.",
        description:
          "A three-piece set in bold Ankara print: a spacious tote bag, a matching crossbody bag, and a small pouch — for everyday style with practical, colourful character.",
        tags: ["ankara", "bags", "tote", "crossbody"],
        isAvailable: true,
        categoryId: categoryIds["ankara-and-bags"],
        seoTitle: "Ankara Print Tote & Crossbody Bag Set — JC-OWNS | Ghana",
        seoDescription:
          "A vibrant three-piece Ankara print bag set: tote, crossbody bag and pouch. Nationwide delivery across Ghana.",
      })
      .returning();

    await db.insert(productImages).values([
      {
        productId: created.id,
        url: "/products/ankara-tote-crossbody-set.jpg",
        altText:
          "Three-piece Ankara print bag set: tote bag, crossbody bag and matching pouch",
        sortOrder: 1,
      },
    ]);

    console.log("  ✓ Product created: Ankara Print Tote & Crossbody Set");
  } else {
    console.log("  · Product already exists: Ankara Print Tote & Crossbody Set");
  }

  // ---------------------------------------------------------------------
  // FAQs — operational only, nothing about the company invented
  // ---------------------------------------------------------------------
  const faqData = [
    {
      question: "How do I place an order?",
      answer:
        "The fastest way is WhatsApp — tap any \"Order on WhatsApp\" button on the site and we'll pick up your message to confirm availability, pricing and delivery.",
      sortOrder: 1,
    },
    {
      question: "Do you deliver outside Accra and Bibiani?",
      answer:
        "Yes. JC-OWNS delivers nationwide across Ghana. Delivery timing and cost depend on your location and are confirmed with you when you order.",
      sortOrder: 2,
    },
    {
      question: "What sizes does the Multipurpose Liquid Soap come in?",
      answer: "It's currently available in 500ml and 5L.",
      sortOrder: 3,
    },
    {
      question: "How can I pay for my order?",
      answer:
        "Payment options are shared with you directly when you place your order via WhatsApp or through the contact form.",
      sortOrder: 4,
    },
    {
      question: "Can I ask about a product before ordering?",
      answer:
        "Of course — message us on WhatsApp or use the contact form and we'll get back to you with details.",
      sortOrder: 5,
    },
  ];

  for (const faq of faqData) {
    const existing = await db.query.faqs.findFirst({
      where: eq(faqs.question, faq.question),
    });
    if (!existing) {
      await db.insert(faqs).values(faq);
      console.log(`  ✓ FAQ created: ${faq.question}`);
    }
  }

  console.log("Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
