# Everywright: putting the site online

Both domains (everywright.com and everywright.ca) are registered at Cloudflare.
Cloudflare's menus change from time to time, so check Cloudflare's current docs if a step below doesn't match what you see.

## 1. Put the site on Cloudflare Pages

The site is built with React, so Cloudflare needs to run a build step. Connect the project to a GitHub repository. Do not upload the `dist/` folder by hand: that folder doesn't include the contact form function, so the form would stop working.

1. Put this folder (`everywright-site`) in a GitHub repository.
2. In the Cloudflare dashboard, go to Workers & Pages, create a new Pages project, and connect it to that repository.
3. Use these build settings:
   - Framework preset: Vite (or None)
   - Root directory: `site`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Cloudflare gives you a preview address ending in `.pages.dev`. Check the site there on a phone and a computer.

Every change you push then builds and goes live automatically.

## 2. Connect everywright.com

1. In the Pages project, open Custom domains and add `everywright.com`, then `www.everywright.com`.
2. Cloudflare sets up the DNS and the SSL certificate (the padlock) for you.

## 3. Send everywright.ca to everywright.com

Set up a redirect rule on everywright.ca so any visit goes to https://everywright.com (a permanent 301 redirect).

## 4. Business email: hello@everywright.com

1. On everywright.com in Cloudflare, turn on Email Routing.
2. Create the address `hello@everywright.com` and forward it to the business Gmail (everywrighthq@gmail.com).
3. To also send email from hello@, set up "Send mail as" in Gmail later.

## 5. Make the contact form send emails

The form sends requests through a Cloudflare Pages Function (`site/functions/api/demo-request.js`). The function emails each request to hello@everywright.com through Resend (https://resend.com, free plan: 3,000 emails a month, 100 a day). Cloudflare's own Email Sending needs the paid Workers plan, so we don't use it.

**5a. Verify everywright.com in Resend** (done on 2026-11-18)
The Resend account uses everywrighthq@gmail.com. everywright.com was added under Domains, and "Auto configure" wrote the DNS records to Cloudflare. Verification can take a few hours. The domain's status on Resend's Domains page should say Verified.

**5b. Create an API key**
In Resend, open API keys and create a key with sending access. Copy it. Don't paste it anywhere except Cloudflare.

**5c. Add the key to the Pages project**
1. Open the `everywright` Pages project, then Settings > Environment variables. Add a variable named exactly `RESEND_API_KEY`, paste the key, and mark it as a secret (encrypted). Save.
2. Redeploy the site. Variables only apply after a new deploy.

**5d. Test it**
Fill in the form on your `.pages.dev` preview and check that the message arrives at hello@everywright.com.

If the form shows "Sending is not set up yet", step 5c is missing. If it shows "We could not send your message", check Resend's Logs page. An unverified domain is the most likely cause.

## Checklist before telling anyone about the site

- [ ] Looks right on a phone
- [ ] Every button and link works
- [ ] The form sends and the message arrives (step 5 above)
- [ ] everywright.ca and www.everywright.com both land on https://everywright.com
- [ ] No placeholder text or made-up claims left
