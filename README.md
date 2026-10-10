# Electrotrans Engineering and Contractor

A static marketing and contact website for **Electrotrans Engineering and Contractor**, a Nigerian heavy equipment engineering and contracting company with branches in Ifo, Ogun State and Ojota, Lagos, Nigeria.

The site presents the company's 20+ years of experience in hydraulics, pneumatics, mechanical, electrical, and haulage services, and gives prospective clients a way to reach the business directly.

## Product overview

This is the company's web presence: a fast, responsive, static site (no build step, no backend). It is built with plain HTML, CSS, and vanilla JavaScript, so it can be hosted anywhere static files are served (GitHub Pages, Netlify, any web server) or opened directly from disk.

## Target users

- Heavy equipment owners and fleet operators in Nigeria (construction, mining, and industrial sectors)
- Companies needing hiring (rental), haulage, repairs, servicing, and maintenance of heavy machinery
- Industrial clients abroad looking for a trusted Nigerian engineering and contractor partner
- Prospective clients who want to confirm the company's services and contact options before engaging

## Problem it solves

Before this site, prospective clients could not easily find out who Electrotrans is, what services it offers, or how to reach the company. This caused missed work for the business and made it difficult for clients to vet a service provider. The site:

- Establishes a credible, professional online presence
- Explains the full service range clearly
- Gives clients a simple way to send a service request directly to the company inbox
- Works on mobile, where many of the target clients browse

## Main features

- **Homepage** with hero, about, mission/vision, services overview, fleet preview, and "why choose us" highlights
- **Service pages** — dedicated pages for each of the five services:
  - Hydraulics
  - Pneumatics
  - Mechanical
  - Electrical
  - Haulage
- **Our fleet page** — equipment for hire and for sale, with indicative rates and steps for hiring
- **Client portal** (`app.html`) — self-service hire booking, purchase enquiries, fault reporting with instant quote estimates, and general enquiries
- **Contact page** with a validated request form that saves enquiries to a serverless database (Supabase)
- **Responsive dark theme** with a bold yellow accent, designed for readability on small and large screens
- **Social links** (Facebook, Instagram, TikTok, YouTube, WhatsApp) and full company contact details (branches, phone, email) in the footer
- **Admin dashboard** (`admin.html`) — password-protected view of all submitted forms
- **Accessible basics** — semantic headings, descriptive labels, and ARIA attributes

## Project structure

```
Electrotrans/
├── index.html              # Homepage
├── about.html              # About us — who we are, mission/vision, why choose us
├── fleet.html              # Our fleet — hire rates and sale prices
├── portfolio.html          # Recent contracts, gallery and testimonials
├── app.html                # Client portal (hire, buy, fault & quote, enquiry)
├── contact.html            # Contact page with request form
├── design.html             # Design preview (colors, typography, buttons, inputs)
├── styles.css              # Shared styling
├── script.js               # Contact form validation + mobile menu
├── assets/
│   ├── logo-transparent.png  # Logo used across the site (also favicon)
│   ├── ceo/                  # CEO portrait
│   └── portfolio/            # Contract & project photos
│   └── js/
│       ├── supabase-config.js # Supabase URL + anon key (configure here)
│       └── electrotrans-db.js # Supabase client wrapper (insert + admin)
├── images/                 # Company photos (added as provided)
├── supabase/
│   └── schema.sql          # Database schema + security policies (run once in Supabase)
├── admin.html              # Password-protected admin view of submissions
├── services/
│   ├── hydraulics.html
│   ├── pneumatics.html
│   ├── mechanical.html
│   ├── electrical.html
│   └── haulage.html
└── .github/workflows/
    └── deploy-pages.yml    # GitHub Pages deployment
```

## How to run

No build step is required.

1. Open `index.html` directly in a web browser, or
2. Serve the folder with a simple static server and visit the printed URL:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deployment

The site builds automatically to GitHub Pages on every push to `master` (via the included GitHub Actions workflow). Live URL: `https://temmyadekunle.github.io/Electrotrans/`.

## Supabase setup (serverless database)

Forms on the site (Contact enquiry, and portal hire/buy/fault/quote) save to a Supabase Postgres database. Until you configure Supabase, forms gracefully fall back to opening the visitor's email client, so the site still works.

### 1. Create the project

1. Go to <https://supabase.com> and sign up / sign in.
2. Create a **new project** (any name, e.g. `electrotrans`), choose a region and a database password.
3. Wait for the project to provision, then open it.

### 2. Run the schema

1. In the project dashboard open **SQL Editor** → **New query**.
2. Paste the entire contents of `supabase/schema.sql` and press **Run**.
3. You should see the tables `enquiries` and `requests` created in **Table Editor**.

### 3. Configure the site

1. In the dashboard open **Project Settings** → **API**.
2. Copy the **Project URL** and the public **anon key**.
3. Open `assets/js/supabase-config.js` and replace the placeholders:

```js
window.ElectrotransConfig = {
  SUPABASE_URL: "https://YOUR-PROJECT.supabase.co",
  SUPABASE_ANON_KEY: "YOUR-anon-public-key"
};
```

**Security note:** the anon key is safe to ship in the frontend — row-level security policies in `schema.sql` only allow the public to **insert** new rows. Nobody can read or change submissions without signing in to the admin dashboard.

### 4. Create the admin sign-in

1. In the dashboard go to **Authentication** → **Users** → **Add user**, and create an admin account (e.g. `admin@electrotrans.com` + a strong password).
2. Open the admin dashboard at `admin.html` (e.g. `https://temmyadekunle.github.io/Electrotrans/admin.html`).
3. Sign in with that account. You'll see Enquiries and Requests tabs, each row can be marked **seen** or **done**, and the "new" badge counts submissions awaiting review.

## Contact details on site

- Ogun State branch: Iyana Ilogbo, Ifo, Ogun State
- Lagos branch: Ojota, Ikorodu Rd, Lagos
- Tel: 08033725117
- WhatsApp: 07057680842
- Email: cranemechatronics4sure@outlook.com