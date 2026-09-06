# JC-OWNS Enterprises Limited — Website

The official website for JC-OWNS Enterprises Limited, a Ghanaian consumer
brand spanning three collections: **Gifts & More**, **Ankara & Bags**, and
**Home Care**. The site is a full storefront with WhatsApp-first ordering, a
content management dashboard the business owner can use without a developer,
and the groundwork for full online checkout later.

This document is a technical overview. If you're the business owner and just
want to deploy the site or manage day-to-day content, start with:

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — how to put this live on the internet
  and connect your domain.
- **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)** — how to add products, edit content,
  view messages from customers, and manage the site day to day.

## What's included

- **12 pages**: Home, Shop, Product Detail, three Collection pages (Gifts &
  More, Ankara & Bags, Home Care), About, Contact, FAQ, Delivery Information,
  Privacy Policy, Terms & Conditions.
- **WhatsApp ordering** built in everywhere — the header, product pages,
  category pages, and a floating mobile button all link straight to WhatsApp
  with a pre-filled message.
- **A working contact form** that saves messages to the database, with spam
  protection (honeypot field + timing check + rate limiting) and clear
  loading/success/error states.
- **A full admin dashboard** (`/admin`) for managing products, categories,
  FAQs, homepage content, and customer enquiries — no code required.
- **Secure login** for the admin dashboard (password hashing, protected
  routes, no hardcoded credentials).
- **SEO**: per-page metadata, Open Graph tags, an auto-generated sitemap and
  robots.txt, and structured data (JSON-LD) for the organization, products,
  and FAQs.
- **Analytics**: Google Analytics 4 (optional) plus a first-party events
  table in the database, so you can see enquiry and click counts in the admin
  dashboard even without GA configured.
- **No fabricated content.** Anywhere the business hasn't supplied real
  photography, reviews, certifications, or history, the site shows an honest,
  editable placeholder instead of inventing one. See "A note on honesty" below.

## Tech stack

- **[Next.js 14](https://nextjs.org)** (App Router, TypeScript) — the web
  framework, deployed to **[Vercel](https://vercel.com)**.
- **PostgreSQL** — the database (works with any standard Postgres host; the
  deployment guide recommends [Neon](https://neon.tech) for a free tier
  that's a good fit for this site).
- **[Drizzle ORM](https://orm.drizzle.team)** — typed database access and
  migrations. (Not Prisma — see "Why Drizzle" below if you're curious.)
- **[NextAuth](https://next-auth.js.org)** — admin authentication.
- **Tailwind CSS** — styling, using a custom design system (see
  `tailwind.config.ts`) rather than a generic template look.
- **[Vercel Blob](https://vercel.com/docs/storage/vercel-blob)** (optional) —
  lets the admin dashboard upload product photos directly.

## Local development

You'll need Node.js 18+ and a PostgreSQL database (local or remote).

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Copy the environment template and fill in real values
cp .env.example .env

# 3. Push the database schema
npm run db:push

# 4. Seed initial content (admin user, site settings, categories,
#    the one real product, FAQs)
npm run db:seed

# 5. Start the dev server
npm run dev
```

Visit `http://localhost:3000` for the site, and
`http://localhost:3000/admin/login` for the admin dashboard (use the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `.env`).

Other useful scripts:

```bash
npm run build       # production build
npm run start        # run the production build locally
npm run lint         # ESLint
npm run db:studio    # visual database browser (Drizzle Studio)
```

## Project structure

```
src/
  app/                 Pages and routes (Next.js App Router)
    admin/             The admin dashboard (protected)
    shop/, collections/, contact/, about/, faq/, ...   Public pages
    api/               API routes (auth, admin image upload, event tracking)
  components/          React components, grouped by area
    home/, product/, admin/, layout/, ui/, contact/, analytics/
  db/                  Drizzle schema and database client
  lib/                 Shared logic: data fetching, WhatsApp links,
                       validation, analytics, rate limiting, auth
scripts/
  seed.ts              Seeds the database with real starter content
drizzle/               Generated SQL migrations
```

## Content architecture: WhatsApp-first, checkout-ready

The business currently takes orders over WhatsApp, so every "Order" button
opens WhatsApp with a pre-filled message (including product name, chosen
size, and quantity where relevant). Nothing about this requires a rebuild
later: the database already has the tables a real checkout would need
(`products`, `productVariants` with per-variant pricing, `enquiries` as a
first step toward `orders`). Adding payments and cart checkout later is an
additive change, not a rewrite.

## A note on honesty

Per the project brief, this site never fabricates content. There are no
invented customer reviews, awards, certifications, ingredient claims,
company history, revenue figures, or social accounts. Two categories
(Gifts & More and Ankara & Bags) don't have real product photography yet, so
they show elegant, on-brand placeholder artwork with a "coming soon" message
and a WhatsApp link — not stock photos pretending to be real products. As
soon as you add real photos and products through the admin dashboard, the
placeholders are replaced automatically.

## Why Drizzle instead of Prisma

Both are excellent TypeScript ORMs. Drizzle was used here because it has no
compiled binary/engine to download at build or migration time — it's pure
JavaScript talking to Postgres over the standard `pg` driver. That means one
less thing that can fail during your first deploy on a new machine or CI
environment. Functionally, everything Prisma would have given you (type-safe
queries, migrations, relations) is present here in Drizzle form.
