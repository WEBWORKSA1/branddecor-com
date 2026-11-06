# BrandDecor.com — Phase-wise Build Prompts

**Concept:** BrandDecor = *the Branded Spaces Hub*. Free tools, idea guides and quote matching for businesses branding physical spaces (offices, retail, restaurants, trade-show booths, signage, studios).

**Why this idea wins:** commercial-intent B2B traffic (signage, office fit-out, trade-show and window-film keywords carry far higher ad bids than home décor), plus every visitor is a potential paid lead for sign makers, installers and exhibit builders.

**Revenue stack:** Google AdSense (Auto ads) → quote-request leads (refer/sell to pros) → featured directory listings → tool/guide/contest sponsorships → supporter donations → later: affiliate links (materials, neon, film kits) and sale of the site/domain via web.works/contact.

---

## Phase 1 — Foundation, compliance & shell
> Build a static Jekyll site for GitHub Pages (main branch, root). Create `_layouts/default.html` with: the AdSense script `ca-pub-6620975821265271` in `<head>`, a sticky top bar on every page reading "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership" linked to https://web.works/contact, responsive header with nav, dark/light toggle, footer with newsletter form, legal links and a trademark/copyright disclosure that makes no claim to "brand decor". Add `ads.txt`, `robots.txt`, Liquid-generated `sitemap.xml` and `feed.xml`, `CNAME`, manifest, favicon, OG image, cookie notice, 404. Route **all** forms to the owner inbox through FormSubmit AJAX with the address XOR-encoded in JS — never print the email in HTML.

## Phase 2 — Lead-generation engine (highest priority)
> Build `get-quotes.html`: a 4-step form (space → scope → size/budget/timeline → details → contact) with progress bar, per-step validation, honeypot, consent checkbox and prefill from URL params (`?space=`, `?project=`, `?style=`) and from the visualizer spec. Add a short 1-screen quote form on the home page. Put "Get quotes" CTAs at the end of every tool result, guide and style card, plus a sticky mobile CTA bar.

## Phase 3 — Interactive tools (traffic + engagement)
> Build `visualizer.html`: type a brand name, choose a typeface, 7 sign finishes (vinyl, acrylic, wood, brushed metal, brass, LED neon, halo-lit), 6 wall surfaces, 8 wall colours, lighting and width; render live with CSS; output letter height, viewing range and a planning cost range; save spec to localStorage and send to the quote form. Build `tools.html` with tabbed calculators: sign letter height (1 in/10 ft optimal, 1 in/30 ft max), mural cost, booth budget + ROI, brand palette + WCAG contrast, window film, office branding budget.

## Phase 4 — Content for AdSense approval & SEO
> Write 10+ original long-form guides (700–1,000 words each) using a `guide` layout with Article schema, byline, update date, TOC, tables, callouts, CTA band and auto-related guides. Build `ideas/index.html` that lists every page with `article: true` automatically, with live search. Add `style-lab.html` (24 data-driven style recipes with filters) and a 12-month campaign calendar. Add About, Contact, Privacy (AdSense cookie wording + opt-out links), Terms, Disclaimer, Cookies, Trademark & Copyright.

## Phase 5 — Community & monetization pages
> `directory.html` (8 pro categories + "List your business" with Basic/Featured/Exclusive tiers), `contest.html` (monthly auto-rotating theme, countdown to month-end, prizes, judging, rules, entry form), `support.html` (one-time/monthly pledges, purpose selector: operations, prizes, hiring, promotion), `careers.html` (talent network), `advertise.html` (sponsorship menu + media-kit form), `videos.html` (YouTube privacy-enhanced facades, real video IDs only).

## Phase 6 — Self-updating & automation
> Drive dynamic content from `assets/js/data.js`: Idea of the Day (rotates daily), seasonal planner (current + next month), contest theme and countdown (roll monthly), directory cards, Style Lab. Liquid builds the sitemap, RSS feed, guide index, related guides and "last updated" stamps on every build — adding a new `.md` guide with `article: true` updates all of them.

## Phase 7 — QA, deploy, launch
> Validate HTML structure, JS syntax, no exposed email, mobile layout, form flows. Push to `WEBWORKSA1/branddecor-com` main → Settings → Pages → Deploy from branch `main` / root. Point DNS (apex A records 185.199.108–111.153, `www` CNAME to `webworksa1.github.io`), enable HTTPS, submit sitemap to Search Console, then apply to AdSense once the domain serves over HTTPS.

## Phase 8 — Growth (post-launch)
> Publish 2 guides/week (city + industry pages: "dental clinic branding", "gym wall graphics", "Toronto sign permits"), add a certified CMP for EEA/UK consent, add affiliate product boxes, launch the newsletter, sell Featured listings, recruit sponsors per guide category, and add case studies from contest winners.
