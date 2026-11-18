# Everywright: how the site is hosted

This is how everywright.com is set up today (as of 2026-11-17) and how to change it.
Everything runs on Cloudflare (account: everywrighthq@gmail.com), plus Resend for the contact form email.
Cloudflare's menus change from time to time, so check Cloudflare's current docs if a step doesn't match what you see.

## At a glance

| Piece | Where it lives | Status |
| --- | --- | --- |
| Website | Cloudflare Pages project `everywright`, built from GitHub `Trolleger/EveryWright`, branch `master` | Live at https://everywright.com |
| www.everywright.com | Redirect rule on everywright.com (www to root) | 301 to https://everywright.com |
| everywright.ca and www.everywright.ca | Redirect rule on everywright.ca | 301 to https://everywright.com |
| everywright.pages.dev | Bulk Redirect `pages_dev_to_everywright` | 301 to https://everywright.com |
| Contact form | Pages Function `site/functions/api/demo-request.js`, sends with Resend | Working, tested end to end |
| hello@everywright.com | Cloudflare Email Routing | Forwards to everywrighthq@gmail.com |

## 1. The website (Cloudflare Pages)

The site is a React app in `site/`. Cloudflare builds it from GitHub every time something is pushed to `master`.

Pages project `everywright`, build settings:
- Production branch: `master`
- Root directory: `site`
- Build command: `npm run build`
- Build directory: `dist`

To publish a change: commit it and run `git push origin master` from the `everywright-site` folder. Cloudflare builds it, and it's live in a minute or two. Other branches get their own preview links on `<something>.everywright.pages.dev`.

Don't upload the `dist/` folder by hand. It doesn't include the contact form function, so the form would break.

The repository also has a `main` branch from the first push. It's out of date and Cloudflare ignores it. Keep working on `master`.

## 2. Domains and redirects

**everywright.com and www.everywright.com**
Both are added under the Pages project's Custom domains. Cloudflare created the DNS records (CNAMEs to `everywright.pages.dev`) and the SSL certificates.

A redirect rule on the everywright.com zone ("Redirect from WWW to root") sends www.everywright.com to https://everywright.com, so there's one main address.

**everywright.ca**
The .ca zone has two placeholder DNS records, `everywright.ca` and `www.everywright.ca`, both type A, `192.0.2.1`, proxied. They exist only so Cloudflare can catch the traffic. A redirect rule ("Send everywright.ca to everywright.com") sends every request to https://everywright.com as a 301 and keeps query strings.

**everywright.pages.dev**
Every Pages project keeps a `.pages.dev` address, and it can't be deleted. A Bulk Redirect (account level: Bulk Redirects, list `pages_dev_to_everywright`, rule "Redirect pages.dev to everywright.com") sends it to https://everywright.com. "Include subdomains" is off, so preview links still work.

## 3. Business email: hello@everywright.com

Cloudflare Email Routing is on for everywright.com. One rule forwards hello@everywright.com to everywrighthq@gmail.com. Other addresses at the domain are dropped (the catch-all is set to Drop).

To add another address, for example sales@: Email Routing, then Routing rules, then Create routing rule.

To send email *from* hello@, set up "Send mail as" in Gmail. That isn't done yet.

## 4. The contact form

The form on the site posts to `/api/demo-request`. That Pages Function checks the fields and emails the request to hello@everywright.com through Resend (https://resend.com, free plan: 3,000 emails a month, 100 a day). We don't use Cloudflare's own Email Sending because it needs the paid Workers plan.

Setup:
- Resend account: signed in with everywrighthq@gmail.com.
- Sending domain: everywright.com, verified. "Auto configure" added the Resend DNS records (`resend._domainkey`, `send`, `rsend`, `_dmarc`).
- API key: named `everywright-site` in Resend, saved in the Pages project as the secret `RESEND_API_KEY` (Settings, Environment variables).
- The form has a hidden spam-trap field (`company_website`). Submissions that fill it in are quietly ignored.

If the form says "Sending is not set up yet", the `RESEND_API_KEY` secret is missing, or the site wasn't redeployed after adding it.
If it says "We could not send your message", check Resend's Logs and Emails pages.

If Resend marks hello@ as bounced, it adds the address to its Suppressions list and blocks future sends to it. That happened once during setup. Fix it in Resend under Emails, then Suppressions, then remove the address.

To swap the API key: create a new key in Resend, replace `RESEND_API_KEY` in Cloudflare, redeploy, then delete the old key in Resend. A key with sending-only access is safer than full access.

## Launch checklist

- [x] Looks right on a phone (checked 2026-11-17 at 375px wide)
- [x] Every button and link works
- [x] The form sends and the message arrives
- [x] everywright.ca, www.everywright.ca, www.everywright.com and everywright.pages.dev all land on https://everywright.com
- [x] No placeholder text or made-up claims left (the "Our work" section is an honest "coming soon")
