
# ToolZoneX Strategy — Context for Claude Code

## Goal

Punit wants to leave his job for low-stress, self-paced income. Target: ~₹1L/month, no deadlines, no luxury requirement. Build passive/semi-passive digital assets using existing AI/ML, Azure, FastAPI, React, DevOps skills. Building ToolZoneX (already live at https://toolzonex.com) is the current priority — over the broader 8-stream roadmap in the original plan doc.

## Key decisions from this conversation

**Site status:** ToolZoneX is live, ~135 tools already built, categorized (Finance, Health, Dev Tools, Converters), AdSense already connected, decent SEO structure.

**Core problem identified:** Site content/meta is heavily India-focused (EMI, SIP, PPF, GST, gold rate). This caps earnings — Indian AdSense RPM (~₹40-150/1000 views) is 5-10x lower than US/UK RPM (~₹800-1600/1000 views). Site already has a few global tools (401k Calculator, VAT Calculator) — right direction, underweighted.

**Revenue math:**

- India-audience path: need 700K–2.5M monthly pageviews to hit ₹1L/month via AdSense.
- US/UK-audience path: need ~60K–125K monthly pageviews. Far more realistic in 12-18 months.

**Strategy: don't compete on head terms.** "Mortgage calculator," "paycheck calculator" etc. are owned by huge sites (Bankrate, NerdWallet, calculator.net, PaycheckCity) spending $50-100K/month on paid acquisition. Path in is **long-tail, scenario/state-specific pages** — e.g., sites like Calcinum built 50 individual state paycheck-calculator pages instead of one generic page.

## Prioritized build list for ToolZoneX (highest ROI first)

1. **Paycheck/salary calculator by US state** (50 individual pages) — biggest lever, least competition per page, large combined volume.
2. **401(k) calculator variants** — with employer match, with catch-up contributions (base version already exists).
3. **IRA / Roth IRA / Backdoor Roth calculator** — strong intent, decent RPM.
4. **UK Stamp Duty calculator** — companion to existing VAT calculator, strong UK real estate RPM.
5. **Capital gains tax calculator (US, by state)** — same long-tail-by-state pattern.
6. **Self-employment / 1099 tax calculator** — underserved, high-intent freelancer audience.

## Things to avoid

- Don't build a SaaS product as the main play — recreates job-like pressure (uptime, support, deadlines).
- Don't freelance — trades time for money directly.
- Don't chase all 8 income streams from the original roadmap doc at once.
- Don't try to rank for competitive head terms with a newer site.

## Free/open tools recommended for keyword research & tracking

- **Google Keyword Planner** — free with Google Ads account, real search volume.
- **Google Trends** — compare regional interest (US vs India vs UK) for a term.
- **Google Search Console** — free, shows what ToolZoneX already ranks for.
- **Ahrefs Webmaster Tools** — free Ahrefs data, but only for verified own domains.
- **Bing Webmaster Tools** — free, smaller index, still useful.
- No free/open-source tool fully replaces Ahrefs' backlink/keyword database — that data is a paid-provider business even behind "open source" wrappers like OpenSEO.

## Progress log (2026-08-14/15 session)

- **Site health audit + fixes:** built a reusable Playwright crawl tool (`scripts/audit-crawl.mjs`) that hits every route at desktop + mobile viewport and flags console errors, HTTP failures, blank pages, and horizontal mobile overflow. Used it to find and fix: a hydration bug (`<ul>` inside `<p>`) hitting 10 text-tool pages, 8 mobile-overflow bugs (mostly the CSS grid/flex `min-width: auto` trap — a child won't shrink below its content's natural width without `minWidth: 0`), and removed one orphaned dead component. Re-run this script after future changes.
- **IA/URL restructure done:** the site's 9 nav categories were flattened into just 2 URL prefixes (`/tools/*`, `/utilities/*`), which hurt SEO siloing and matches the "sections not properly segregated" complaint. Moved 68 tools out of `/tools/*` into dedicated prefixes — `/text-tools/*` (19), `/generators/*` (18), `/converters/*` (18), `/developer-tools/*` (13). Old URLs now 301-equivalent redirect via static `<meta http-equiv="refresh">` stubs (this site is `output: 'export'`/static, so `next/navigation redirect()` doesn't work without JS — the old 16 `/calculators/*` stubs had this same bug and were fixed too).
- **GSC + AdSense:** already set up and verified by Punit directly in the Google portals — no code-side action needed.
- **Paycheck calculator by state — 23 states shipped:** built the actual engine (`src/calculators/paycheck/`) — federal 2025 tax brackets, FICA (SS wage base + Medicare + additional Medicare), and per-state config, modeled so flat-rate states reuse the same bracket-table logic as progressive ones (a flat tax is just a 1-bracket table; Mississippi's "no tax under $10k" is a 2-bracket table) — unit-tested against hand-calculated reference values (20 tests). Live at `/finance/<state>-paycheck-calculator` with a hub page at `/finance/paycheck-calculator`:
  - No state income tax (0%, zero data-accuracy risk): Texas, Florida, Washington, Nevada, Tennessee, Wyoming, South Dakota, Alaska, New Hampshire.
  - Flat-rate: Pennsylvania (3.07%, no deduction), Illinois (4.95%), Colorado (4.4%), Arizona (2.5%), North Carolina (4.5%), Michigan (4.25%), Utah (4.65%), Kentucky (4%), Massachusetts (5% + 4% surtax over $1M), Indiana (3.05%, excludes county tax), Georgia (5.39%), Mississippi (0% under $10k, 4.7% above).
  - Progressive brackets: California, New York.
  - Figures labeled "2025" with an in-page disclaimer since brackets shift annually; some flat-rate states approximate their deduction base off the federal standard deduction rather than the state's own (noted per-state) — verify before rolling to the next tax year or treating as authoritative. Remaining ~27 states are progressive-bracket (Ohio, Virginia, Wisconsin, Minnesota, Oregon, etc.) or have local/county tax layered on top (Maryland, Ohio municipalities) — higher data-entry care needed than the flat-rate batch.
- **SEO technical audit (Ahrefs) — fixed:** canonical URLs sitewide were resolving to the wrong domain (`punit461.github.io/toolzonex`, a leftover pre-custom-domain fallback that silently never got overridden in production) — fixed across all 158 source files. Also fixed: sitemap was including noindex redirect stubs (now excluded), `og:image` was 404ing and missing from 166 pages' metadata (every page overrides the root layout's `openGraph` object, dropping the inherited image — added it back per-page), oversized logo (1.1MB → 34KB, was displayed at 38px), 12 titles and 11 descriptions over length limits.
- **Internal linking:** added a "More in {category}" related-tools section to the shared `CalculatorShell` (used by ~250 pages) — shows the next N tools in the same category, windowed per-page so links spread across the whole category instead of always pointing at the same few tools. Along the way found or component files had a hardcoded `category="Tools"` regardless of their real category (pre-existing, harmless when category was just breadcrumb text) — fixed 63 of them to match `toolCategories.tsx`.

## Next steps (not yet done)

- Scale the paycheck calculator from 17 states to the remaining ~33 — the engine and page-generation pattern are proven, it's per-state tax-data entry (double-check each state's figures, especially ones with local/county taxes layered on top, before publishing).
- 401(k) calculator variants (catch-up contributions edge cases), IRA/Roth IRA calculator, UK Stamp Duty calculator, US capital-gains-by-state calculator, self-employment/1099 tax calculator — per the prioritized build list above, still not started.
- Keep shifting new tool meta/keywords toward US/UK terms instead of India-focused terms.
- Backlinks are the biggest remaining lever and need manual/off-platform work (directories, Reddit/HN, guest posts) — not something code can fix.
- Some blog entries (from the `remainingTools` auto-generated list in `tool-blogs.ts`) are thin/templated boilerplate — fine structurally, weak for ranking. Worth flagging which ones deserve real editorial writeups.
