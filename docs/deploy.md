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

The form sends requests through a Cloudflare Pages Function (`site/functions/api/demo-request.js`). That function hands each request to a private mailer Worker (`mailer/`), which sends it to hello@everywright.com. Cloudflare's menus change, so check their current docs if a name below doesn't match.

**5a. Onboard the sending domain**
1. In the Cloudflare dashboard, open Email Service and choose Email Sending, then "Onboard Domain". Pick everywright.com and follow the steps. Cloudflare adds the DNS records. This can take 5 to 15 minutes, and up to 24 hours.
2. Until the domain is onboarded, Cloudflare only sends to addresses you have verified. Verify hello@everywright.com if the steps ask you to.

**5b. Deploy the mailer Worker** (run in a terminal, in the `mailer/` folder)
```bash
npm install
npx wrangler login
npx wrangler deploy
```
`wrangler login` opens a browser window to sign in to your Cloudflare account. The deploy creates a Worker named `everywright-mailer`, with no public web address.

**5c. Connect the Pages site to the mailer**
1. Open the `everywright` Pages project, then Settings > Bindings. Add a **Service binding**, set the variable name to exactly `MAILER`, and choose the `everywright-mailer` Worker. Save.
2. Redeploy the site (push a change, or re-run the deploy). Bindings only apply after a new deploy.

**5d. Test it**
Fill in the form on your `.pages.dev` preview and check that the message arrives at hello@everywright.com.

If the form shows "Sending is not set up yet", step 5c is missing. If it shows "We could not send your message", check the mailer's logs under the everywright-mailer Worker in the dashboard.

## Checklist before telling anyone about the site

- [ ] Looks right on a phone
- [ ] Every button and link works
- [ ] The form sends and the message arrives (step 5 above)
- [ ] everywright.ca and www.everywright.com both land on https://everywright.com
- [ ] No placeholder text or made-up claims left
