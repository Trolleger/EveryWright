# Everywright website: instructions for Claude Code

You are building **everywright.com**, the website for Everywright, a two-person web studio in Toronto.
Read every file in `docs/` before writing code. They hold the business brief, the brand and all the website copy.

## What to build

A fast, modern, mobile-first, one-page marketing site that gets small-business owners to ask for a free demo.

- Built with **React + Vite** (the owner chose React). The project lives in `site/`: `package.json`, `vite.config.js`, `index.html`, and `src/` (`App.jsx`, `components/`, `styles.css`, `submitDemoRequest.js`).
- Run `npm install` once in `site/`, then `npm run dev` to preview and `npm run build` to build. The build output goes to `site/dist/`, which is what Cloudflare Pages publishes.
- Static files (favicon, `404.html`, `robots.txt`, `sitemap.xml`, images) go in `site/public/` and are copied into the build as-is.
- Keep plain CSS in `src/styles.css`. Don't add a UI library, and keep dependencies to what's already there.
- Use the exact copy in `docs/content.md`. Fix typos if you see them, but don't invent new claims.
- Follow the look in `docs/brand.md`.

## Sections, in order

1. Header: logo wordmark "Everywright", links to Packages, How it works, FAQ, and a "Get a free demo" button
2. Hero
3. How it works (3 steps)
4. Packages (3 cards with prices, Growth highlighted as "Most popular")
5. Why Everywright
6. Our work (honest "coming soon" placeholder until real projects exist)
7. FAQ
8. Contact / free demo form
9. Footer

## Rules

- **Never invent testimonials, reviews, client logos, star ratings, client counts or results.** The business is brand new. Use the honest placeholders in `docs/content.md` until real ones exist.
- Mobile first. It must look great on a phone, since most owners will open it from a text or email.
- Fast: no heavy libraries, compressed images, system fonts or one web font at most.
- Accessible: real headings in order, alt text on images, good colour contrast, focus states, labels on form fields.
- Basic SEO: title, meta description, Open Graph tags, a favicon, and a `site/robots.txt` and `site/sitemap.xml` for https://everywright.com.
- Prices are in CAD.

## The contact form

The form collects: name, business name, email, phone (optional), current website (optional), and "What do you need?".
Decided: the owner chose a **Cloudflare Pages Function**. The form posts to `/api/demo-request`, implemented in `site/functions/api/demo-request.js`. That function sends the email through Resend's API, using a Pages secret named `RESEND_API_KEY`. We use Resend because Cloudflare Email Sending needs the paid Workers plan, and Pages Functions can't use the email binding anyway. The browser side is `site/src/submitDemoRequest.js`. The form has a hidden honeypot field (`company_website`) for spam. Setup steps are in `docs/deploy.md`.

## Deploying

See `docs/deploy.md`. The site deploys to Cloudflare Pages. Its Root directory is `site`, its build command is `npm run build`, and its output directory is `dist`. Domains are already registered on Cloudflare.

## Working with the user

The user is new to coding. Explain what you're doing in plain words, keep steps short, and tell them exactly what to click or type when they need to do something.
