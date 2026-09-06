# Deployment Guide (for a non-technical owner)

This guide walks through putting the JC-OWNS website live on the internet,
step by step, assuming no prior developer experience. It should take about
30–45 minutes the first time.

You'll create three free accounts along the way:

1. **[GitHub](https://github.com)** — stores your website's code.
2. **[Neon](https://neon.tech)** — hosts your database (free tier is enough
   for this site).
3. **[Vercel](https://vercel.com)** — runs your website (free tier is enough
   to start).

None of these require a credit card on the free tier used here.

---

## 1. Put the code on GitHub

1. Create a GitHub account at [github.com](https://github.com) if you don't
   have one.
2. Create a new, **private** repository (button in the top right: "New").
   Name it something like `jc-owns-website`.
3. Upload the project folder you were given into that repository. The
   easiest way if you're not familiar with git: on the new repository's page,
   click "uploading an existing file" and drag in the project folder's
   contents. (If you're comfortable with a terminal, `git init`, `git add .`,
   `git commit`, and `git push` to the new repository work too.)

Make sure the `.env` file is **not** uploaded — it contains passwords and
shouldn't be public. The project already excludes it via `.gitignore`.

## 2. Create your database (Neon)

1. Go to [neon.tech](https://neon.tech) and sign up (you can sign up with
   your GitHub account to skip a step).
2. Create a new project. Choose a region close to Ghana/Europe for the best
   speed (e.g. Frankfurt).
3. Once created, Neon shows you a **connection string** that looks like:
   `postgresql://user:password@ep-xxxx.eu-central-1.aws.neon.tech/dbname?sslmode=require`
4. Copy this whole string somewhere safe — you'll need it in step 4. This is
   your `DATABASE_URL`.

## 3. Deploy the website (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub
   account.
2. Click "Add New… > Project" and select the `jc-owns-website` repository
   you created in step 1.
3. Vercel will detect it's a Next.js project automatically. Before clicking
   Deploy, open the **Environment Variables** section and add each of the
   following (see `.env.example` in the project for the full list and
   explanations of each one):

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | The connection string from Neon (step 2) |
   | `NEXTAUTH_URL` | Your future site address, e.g. `https://jc-owns-website.vercel.app` for now — update this later once your domain is connected (step 5) |
   | `NEXTAUTH_SECRET` | A random string — generate one at [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32) and paste the result |
   | `ADMIN_EMAIL` | The email address you want to log into the admin dashboard with |
   | `ADMIN_PASSWORD` | A strong password — you'll change this from inside the dashboard right after your first login |
   | `WHATSAPP_NUMBER` | `233559038376` (international format, no `+` or spaces) |
   | `PHONE_DISPLAY` | `055 903 8376` |
   | `NEXT_PUBLIC_SITE_URL` | Same as `NEXTAUTH_URL` above, no trailing slash |
   | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Leave blank for now — see step 6 |
   | `BLOB_READ_WRITE_TOKEN` | Leave blank for now — see step 7 |

4. Click **Deploy**. The first deploy takes 1–3 minutes.
5. Once it finishes, Vercel gives you a live web address like
   `https://jc-owns-website.vercel.app`. Open it — the site will load, but
   the database is still empty at this point.

## 4. Set up the database tables and starter content

Vercel builds the website but doesn't run one-off scripts for you, so this
one step needs to be done from a computer with the code and Node.js
installed (or ask whoever set up the GitHub repository to run it once):

```bash
# In the project folder, with .env filled in using the SAME DATABASE_URL
# you gave Vercel:
npm install --legacy-peer-deps
npm run db:push     # creates all the tables in your Neon database
npm run db:seed     # creates your admin login and starter content
```

This only needs to be done **once**. After this, every future product,
category, or content change happens through the admin dashboard — never by
running scripts again.

Log in at `https://your-site-address/admin/login` with the `ADMIN_EMAIL` and
`ADMIN_PASSWORD` you set in step 3, then immediately go to **Settings >
Change Password** and set a real password only you know.

## 5. Connect your domain (e.g. jc-owns.com)

If you already own a domain name:

1. In your Vercel project, go to **Settings > Domains** and add your domain
   (e.g. `jc-owns.com` and `www.jc-owns.com`).
2. Vercel shows you one or two DNS records to add (usually an `A` record and
   a `CNAME` record). Log into wherever you bought the domain (e.g.
   Namecheap, GoDaddy, or a local Ghanaian registrar) and add those records
   in its DNS settings.
3. DNS changes can take anywhere from a few minutes to 24 hours to take
   effect.
4. Once your domain is live, go back to your Vercel project's **Environment
   Variables** and update both `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to
   your real domain (e.g. `https://www.jc-owns.com`), then redeploy (Vercel's
   **Deployments** tab > click the three dots on the latest deployment >
   **Redeploy**).

If you don't have a domain yet, you can buy one from any registrar and come
back to this step later — the site works fine on the `vercel.app` address in
the meantime.

## 6. Turn on analytics (optional, Google Analytics 4)

1. Go to [analytics.google.com](https://analytics.google.com) and create a
   free GA4 property for your website.
2. Find your **Measurement ID** — it looks like `G-XXXXXXXXXX`.
3. In Vercel, add it as the `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment
   variable, then redeploy.

You don't need this to be useful right away: the admin dashboard already
shows enquiry counts and click counts using its own built-in tracking, with
or without Google Analytics turned on.

## 7. Turn on photo uploads from the dashboard (optional)

Without this, you can still add product photos by pasting an image URL
(e.g. an image you've uploaded to Google Photos, Imgur, or similar) into the
admin dashboard. To allow direct file uploads instead:

1. In your Vercel project, go to **Storage > Create Database > Blob**.
2. Vercel automatically creates a `BLOB_READ_WRITE_TOKEN` and adds it to your
   project's environment variables — no manual copying needed.
3. Redeploy the site. The admin dashboard's photo fields will now show an
   upload button in addition to the URL field.

## Updating the site safely

Because the site's content (products, prices, FAQs, homepage text) all lives
in the database and is edited through the admin dashboard, **you never need
to redeploy the code to change content.** Redeploying is only needed if the
underlying code itself changes (a new feature, a bug fix).

To update the code:

1. Upload the changed files to your GitHub repository.
2. Vercel automatically detects the change and redeploys within a couple of
   minutes — you'll get an email when it's done.
3. If anything looks wrong after a deploy, go to Vercel's **Deployments**
   tab, find the last working deployment, and click **Promote to
   Production** to instantly roll back.

## Backing up your data

Your database (Neon) is the single source of truth for products, categories,
FAQs, settings, and customer enquiries.

- **Automatic**: Neon keeps continuous backups on its free tier and lets you
  restore to any point in the last 24 hours (Neon dashboard > your project >
  **Branches** > **Restore**).
- **Manual export**: for a downloadable backup you control, from a computer
  with the project set up, run:
  ```bash
  pg_dump "$DATABASE_URL" > backup-$(date +%Y-%m-%d).sql
  ```
  Store the resulting `.sql` file somewhere safe (e.g. Google Drive). Do
  this occasionally, especially before making a large change.

## A known limitation worth knowing about

The contact form's spam protection (a per-visitor request limit) currently
works per server instance. On Vercel's free/hobby tier this is effectively
fine, since traffic is low and the built-in honeypot field and minimum-fill-
time check already block the overwhelming majority of automated spam. If the
site later gets high traffic and spam becomes a real nuisance, the fix is to
add a shared rate limiter such as [Upstash Redis](https://upstash.com) (also
has a free tier, and integrates with Vercel in a few clicks) — this is a
small, additive code change, not a rebuild.

## Security note: keeping the Next.js framework updated

This site is built on Next.js 14.2.35 (the newest release in the 14.x line
as of when this project was built). `npm audit` will flag a number of
advisories against it — nearly all of them were only patched in the newer
Next.js 15/16 line, since 14.x no longer receives security backports. Most
of the specific advisories concern attack surfaces this site doesn't use
(a custom server, the older Pages Router's i18n routing, edge runtime,
WebSocket upgrades, CSP nonces), so real-world exposure is lower than a raw
`npm audit` count suggests — but a couple (denial-of-service and cache-
poisoning issues around Server Actions and React Server Components) could
plausibly apply here, since this site does use App Router Server Actions.

Upgrading to Next.js 15 or 16 is a genuine breaking change for this
codebase — notably, dynamic route params become asynchronous — and touches
nearly every page, so it deserves its own dedicated testing pass rather than
a rushed change bolted on at the end of a build. Treat this as a prioritized
follow-up: budget a developer's time for it in the next few months, and ask
them to test every page and the full admin dashboard afterward before it
goes live, using this project's existing pages as the checklist. In the
meantime, keep Vercel's platform-level protections (which this project
already benefits from automatically) turned on, and keep the admin password
strong and unique.

## Getting help

If something in this guide doesn't match what you see (Vercel and Neon both
update their interfaces from time to time), their own documentation is
reliable:

- [Vercel docs](https://vercel.com/docs)
- [Neon docs](https://neon.tech/docs)
- [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)
