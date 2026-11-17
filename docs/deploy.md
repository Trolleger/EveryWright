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

The form sends requests through a small Cloudflare Pages Function (`site/functions/api/demo-request.js`). It emails each request to hello@everywright.com. Cloudflare's menus change, so check their current docs if a name below doesn't match.

1. In the Cloudflare dashboard, go to Compute > Email Service > Email Sending, choose "Onboard Domain", pick everywright.com, and follow the steps. Cloudflare adds the DNS records for you. This can take 5 to 15 minutes, and up to 24 hours.
2. Until the domain is onboarded, Cloudflare only sends to addresses you have verified. So verify hello@everywright.com (or your own address) in the same area if the steps ask you to.
3. Open the `everywright` Pages project, then Settings > Bindings (or Functions > Bindings). Add a binding of type **Send email**, set the variable name to exactly `EMAIL`, and save.
4. Redeploy the site (push a change, or upload the new build). Bindings only apply after a new deploy.
5. Test it: fill in the form on your `.pages.dev` preview, and check that the message arrives at hello@everywright.com.

If the form shows "Sending is not set up yet", step 3 is missing. If it shows "We could not send your message", check the Email Service logs in the dashboard.

## Checklist before telling anyone about the site

- [ ] Looks right on a phone
- [ ] Every button and link works
- [ ] The form sends and the message arrives (step 5 above)
- [ ] everywright.ca and www.everywright.com both land on https://everywright.com
- [ ] No placeholder text or made-up claims left
