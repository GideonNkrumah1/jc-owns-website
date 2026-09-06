# Admin Dashboard Guide

This is the day-to-day guide for running the JC-OWNS website once it's live.
No coding knowledge is needed for anything in this guide — everything here
happens by logging into the dashboard and filling in forms.

## Logging in

Go to `https://your-site-address/admin/login` and sign in with your admin
email and password. If you've forgotten your password, you can reset it in
the Neon or Vercel dashboard by updating your admin record directly, or ask
your developer to reset it — there's no self-service "forgot password" email
flow in this first version.

**First thing to do after your very first login:** go to **Settings >
Change Password** and set a real password that only you know. The password
you used to deploy the site was just a starting placeholder.

## Dashboard overview

When you log in, you'll see:

- **Products** — everything you sell.
- **Categories** — your three collections (Gifts & More, Ankara & Bags,
  Home Care).
- **FAQs** — the questions and answers shown on your public FAQ page.
- **Enquiries** — every message submitted through your Contact page.
- **Settings** — your WhatsApp number, phone number, delivery areas, and the
  text shown on your homepage and About page.

The dashboard home page also shows you at a glance: how many products you
have, how many unread enquiries are waiting, and recent activity.

## Adding a new product

1. Go to **Products > New Product**.
2. Fill in:
   - **Name** — e.g. "JC-OWNS Multipurpose Liquid Soap"
   - **Slug** — the web address for this product (e.g. `jc-owns-multipurpose-liquid-soap`). This fills in automatically from the name, but you can edit it. Avoid changing it later for a product that's already been shared or indexed by Google.
   - **Category** — which collection it belongs to.
   - **SKU** (optional) — your own internal product code.
   - **Short description** — a one-line summary shown on product cards.
   - **Description** — the full product details shown on the product page.
   - **How to Use** / **Suitable For** (optional) — extra detail sections.
   - **Delivery Note** (optional) — overrides the default delivery text for this specific product.
   - **Price** (optional) — you can leave this blank if pricing is discussed over WhatsApp, or if it varies by size (add per-size pricing as variants — see below).
   - **Tags** — comma-separated keywords, mainly used internally and for search.
   - **Available** — untick this to hide the product from the shop without deleting it.
   - **Featured** — tick this to feature the product on the homepage.
   - **Photo** — paste an image URL, or use the upload button if photo uploads are enabled (see DEPLOYMENT.md).
   - **SEO Title / SEO Description** (optional) — what shows up in Google search results. If left blank, the product name and description are used automatically.
3. Click **Save**.

### Adding sizes / prices (variants)

If a product comes in multiple sizes with different prices — like the
Liquid Soap in 500ml and 5L — open that product and scroll to **Sizes /
Variants**:

1. Fill in a **Label** (e.g. "500ml" or "5L"), an optional SKU, and an
   optional price.
2. Click **Add Variant**.
3. Repeat for each size.

Customers ordering via WhatsApp will be able to pick a size, and the
pre-filled WhatsApp message will include exactly what they chose.

If a product only comes in one size, you don't need any variants — just set
the price directly on the product itself.

### Adding more photos

Each product can have multiple photos. On the product's edit page, use the
**Add a photo** field to paste another image URL (or upload one), then
save. You can remove any photo from the same screen.

## Managing categories

Go to **Categories**. The three collections already exist, but you can edit
each one's:

- **Tagline** and **Description** — shown at the top of the collection page.
- **Hero Image** — the large banner photo at the top of the collection page.
  If left blank, an elegant placeholder graphic is shown instead — this is
  intentional (see README.md's note on honesty) and looks intentional, not
  broken.
- **SEO Title / SEO Description** (optional).
- **Active** — untick to temporarily hide an entire collection from the
  site.

You generally won't need to create new categories, but the **New Category**
button is there if the business ever expands into a fourth collection.

## Managing FAQs

Go to **FAQs > New FAQ** to add a question and answer. Use **Category**
(optional) to group related questions, and **Sort Order** (lower numbers
show first) to control the order they appear on the public FAQ page.
Untick **Published** to hide a FAQ without deleting it.

## Reading customer enquiries

Every message submitted through your Contact page appears under
**Enquiries**, newest first, with an unread indicator. Click into one to see
the full message, the customer's name, phone number, and email (if given),
and to mark it as Read, Responded, or Archived so you can keep track of
what's been dealt with.

There's no in-dashboard reply feature — reply to customers directly by
WhatsApp or phone using the contact details they provided.

## Editing homepage and site-wide content

Go to **Settings**. This single page controls:

- **WhatsApp Number** and **Phone Number** — shown across the whole site and
  used to build every "Order on WhatsApp" link. Use the international
  format without a `+` for the WhatsApp number (e.g. `233559038376`).
- **Delivery Areas** and **Delivery Note** — shown on the homepage and
  Delivery Information page.
- **Contact Email** (optional).
- **Hero Headline / Subheadline** — the large text at the top of your
  homepage.
- **Brand Intro**, **Brand Story**, **About Content** — the paragraphs shown
  in those sections of the homepage and About page.
- **Social links** (optional) — only add these once real, active accounts
  exist. Leaving them blank hides the icons rather than showing broken or
  fake links.

Changes here go live immediately after saving — no redeploy needed.

## Viewing analytics

If you've connected Google Analytics (see DEPLOYMENT.md), your full
analytics — visitors, traffic sources, page views over time — are in your
Google Analytics dashboard at [analytics.google.com](https://analytics.google.com).

Separately, and always available even without Google Analytics connected,
the admin dashboard tracks a first-party count of the actions that matter
most for this business: WhatsApp clicks, product views, product enquiries,
category views, and contact form submissions. This is visible on the
dashboard home page.

## Keeping the business honest with customers

A reminder built into how this site was designed: never add a testimonial,
review, award, "as seen in" logo, certification, or specific customer count
that isn't real and verifiable, since the site has no fake-content sections
to begin with — anywhere that kind of content would normally go, there's
either real content pulled from what you enter here, or an honest, editable
placeholder. If you'd like to add real customer testimonials or
certifications once you have them, that's a small code addition your
developer can make when the time comes.

## Getting unstuck

- **A change isn't showing up on the live site** — double check you clicked
  Save, and that you're looking at the live site address, not a cached
  version (try a hard refresh: Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac).
- **I deleted something by mistake** — products, categories, and FAQs can be
  recreated by hand, but for anything more serious, restore from a database
  backup (see "Backing up your data" in DEPLOYMENT.md).
- **Something looks broken on the site itself** (not the dashboard) — this
  is a code-level issue and needs your developer.
