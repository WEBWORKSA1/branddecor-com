# BrandDecor.com — Branded Spaces Hub

Static Jekyll site for GitHub Pages (free plan, `main` branch, root folder).

## Publish
1. Repo **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.
2. Custom domain: `branddecor.com` (already in `CNAME`). DNS at your registrar:
   - Apex `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` → `CNAME` → `webworksa1.github.io`
3. Tick **Enforce HTTPS** once the certificate is issued.
4. Submit `https://branddecor.com/sitemap.xml` in Google Search Console, then apply in AdSense.

## Structure
- `_layouts/default.html` — head (AdSense, schema, OG), top bar, nav, footer, cookie notice
- `_layouts/guide.html` — article layout used by `ideas/*.md`
- `assets/js/data.js` — style recipes, daily ideas, seasonal calendar, directory categories (edit here → pages update)
- `assets/js/main.js` — forms, visualizer, calculators, style lab, contest countdown, video facades
- Forms post via FormSubmit AJAX to a private inbox encoded in `main.js` (never shown in HTML). The **first** submission triggers a one-time FormSubmit activation email — click it to start receiving forms.

## Add a guide
Create `ideas/your-slug.md` with front matter `layout: guide`, `article: true`, `title`, `h1`, `description`, `summary`, `category`, `read`. The guide index, RSS feed, sitemap and related-guide blocks update automatically on the next build.

## Notes
- AdSense uses Auto ads (no manual slot IDs needed). For EEA/UK/CH visitors, enable a Google-certified CMP in AdSense → Privacy & messaging.
- All prices on the site are labelled planning estimates.
- See `BUILD-PROMPTS.md` (phase-wise build prompts) and `RESEARCH.md` (niche research).
