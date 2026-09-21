# Electrotrans Engineering and Contractor

A static marketing and contact website for **Electrotrans Engineering and Contractor**, a Nigerian heavy equipment engineering and contracting company based in Ifo, Ogun State, Nigeria.

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

- **Homepage** with hero, about, mission/vision, services overview, and "why choose us" highlights
- **Service pages** — dedicated pages for each of the five services:
  - Hydraulics
  - Pneumatics
  - Mechanical
  - Electrical
  - Haulage
- **Contact page** with a validated request form that opens the visitor's email client pre-filled and addressed to the company mailbox
- **Responsive dark theme** with a bold yellow accent, designed for readability on small and large screens
- **Social links** (Facebook, YouTube) and full company contact details (address, phone, email) in the footer
- **Accessible basics** — semantic headings, descriptive labels, and ARIA attributes

## Project structure

```
Electrotrans/
├── index.html              # Homepage
├── contact.html            # Contact page with request form
├── styles.css              # Shared styling
├── script.js               # Contact form validation + mobile menu
├── assets/
│   └── logo-transparent.png  # Logo used across the site (also favicon)
├── images/                 # Company photos (added as provided)
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

## Contact details on site

- Address: 51 Igbusi Road, Igbusi Area, close to F&G Events Centre, Iyana Ilogbo bus stop, Ifo, Ogun State, Nigeria
- Tel: 08033725117, 08028368539
- Email: cranemechatronics4sure@outlook.com