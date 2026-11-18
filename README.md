# everywright.com

The website for Everywright, a Toronto web studio. Live at https://everywright.com.

## What's in here

- `CLAUDE.md`: instructions Claude Code reads automatically
- `docs/brief.md`: the business, the offer and the packages
- `docs/content.md`: all the words on the website
- `docs/brand.md`: name, voice, colours and look
- `docs/deploy.md`: how the site, domains, email and contact form are set up, and how to change them
- `site/`: the website itself (React + Vite)
  - `site/src/`: the page, its sections and the styles
  - `site/functions/api/demo-request.js`: sends the contact form to hello@everywright.com
  - `site/public/`: favicon, 404 page, robots.txt, sitemap.xml

## Changing the website

Edit the words in `docs/content.md`, then ask Claude Code to update the site to match. Or ask Claude Code directly, for example "change the Growth price to $900".

To see your changes on your computer first, run these in the `site` folder:

```bash
npm install
npm run dev
```

## Publishing

Commit your change, then run this from the `everywright-site` folder:

```bash
git push origin master
```

Cloudflare builds and publishes it in a minute or two. See `docs/deploy.md` for details.
