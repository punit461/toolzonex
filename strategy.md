
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
- **Internal linking:** added a "More in {category}" related-tools section to the shared `CalculatorShell` (used by ~250 pages) — shows the next N tools in the same category, windowed per-page so links spread across the whole category instead of always pointing at the same few tools. Along the way found calculator component files had a hardcoded `category="Tools"` regardless of their real category (pre-existing, harmless when category was just breadcrumb text) — fixed 63 of them to match `toolCategories.tsx`.
- **Paycheck calculator: 23 states live** (not 17 as an earlier note here said — corrected).
- **New tool batches (colleague's tool-idea list, cross-checked against unitconverters.net and calculator.net's sitemap for completeness), decided per-tool feasibility first, then built what's realistic client-side-only:**
  - **Batch A:** Word Scrambler, Leetspeak Converter, Tip Screen (fullscreen POS-style tipping display).
  - **Batch B:** 6 unit converters (length, temperature, area, volume, weight, time) — shared conversion engine (`src/calculators/converters/unitData.ts`) with a factor-based table for 5 categories and formula-based conversion for temperature (offsets, not just scale); 20 tests verifying known reference conversions.
  - **Batch C:** whitescreen.ai-style fullscreen screens — 8 solid color screens + zoom-lighting screen, dead pixel test, DVD screensaver (real bounce animation, not a static image), broken-screen prank (deterministic SVG crack pattern — no `Math.random()`, to avoid hydration mismatches), and 4 fake Windows 10/11 BSOD + update screens. All 16 built on a shared `useFullscreen` hook (F/Space to enter, Esc to exit) and grouped under one hub page (`/utilities/screen-test`) rather than 16 separate nav entries.
  - Explicitly skipped per user direction: PDF compress/protect/unlock/redact/OCR, AI text detector, full Photopea-level image editor, PDF→Word/Excel/PPT, and other formats with no viable client-side library (ODT/ODS/ODP, HWP, Pages).
  - **Since built (confirmed live in codebase as of 2026-08-22):** PDF manipulation tools — 16 tools under `/tools/*-pdf` (merge, split, rotate, watermark, flatten, organize, extract/delete/number pages, csv/excel/html/jpg/text/word→PDF). Face shape detector (`/tools/face-shape-detector`) and height comparison tool (`/tools/height-comparison`) are also live.
- **2026-08-22 session — Track B (global-audience) tools + content:** shipped a US Mortgage Calculator (`/finance/mortgage-calculator` — full PITI payment with property tax, insurance, PMI auto-cancellation at 78% LTV, HOA, 15/30-year amortization chart) and 4 new technical blog posts leaning AI/DevOps instead of India-finance: LLM API pricing guide, cloud GPU pricing guide, JWT structure explainer (companion to the JWT Decoder tool), and a cron syntax cheatsheet (companion to the Cron Expression Parser tool). Deliberately did *not* build standalone "Token Calculator" / "Prompt Cost Estimator" tools from an earlier roadmap list — the existing LLM Cost Calculator already estimates tokens from pasted text and prices calls, so separate tools would have been near-duplicates.
- **2026-08-22 session (cont'd) — prioritized build list, items 2-6:** confirmed the 401(k) calculator's catch-up logic (age 50+ and the age 60-63 "super catch-up") was already correct — no changes needed there. Built four new finance tools: IRA & Roth IRA Calculator (`/finance/ira-roth-calculator` — 2026 contribution limits, Roth MAGI phase-out, Traditional deduction phase-out incl. the "spouse covered" MFJ case), UK Stamp Duty Calculator (`/finance/uk-stamp-duty-calculator` — SDLT slice bands, first-time buyer relief, additional-property 5% surcharge), Self-Employment Tax Calculator (`/finance/self-employment-tax-calculator` — SE tax on 1099 profit, reuses the paycheck engine's 2025 federal module for consistency), and Capital Gains Tax Calculator (`/finance/capital-gains-tax-calculator` — federal short/long-term + NIIT + a state estimate that reuses the existing `STATE_TAX_CONFIGS` from the paycheck engine rather than inventing a new 50-state dataset). All federal figures for the new tools (2026 ordinary brackets, LTCG brackets, IRA limits/phase-outs, SDLT bands) were verified via web search against IRS/gov.uk sources, not recalled from memory, given the accuracy stakes of publishing real tax figures. Also added 3 more states to the paycheck calculator (Idaho, Iowa, Louisiana — all flat-rate, verified against official state DOR pages), bringing it to 26/50 states.
- Deliberately scoped the paycheck-calculator expansion to just these 3 flat-rate states this pass, not all ~24 remaining. The rest are progressive-bracket and/or have local/county tax layers (Ohio, Virginia, Wisconsin, Minnesota, Oregon, Maryland, etc.) — each needs its own careful per-state research pass, same caution as previously noted below.

## Next steps (not yet done)

- Scale the paycheck calculator from 26 states to the remaining ~24 — progressive-bracket and/or locally-taxed states (Ohio, Virginia, Wisconsin, Minnesota, Oregon, Maryland, etc.) need more careful per-state data entry than the flat-rate batch.
- Keep shifting new tool meta/keywords toward US/UK terms instead of India-focused terms.
- Backlinks are the biggest remaining lever and need manual/off-platform work (directories, Reddit/HN, guest posts) — not something code can fix.
- Some blog entries are thin/templated (auto-generated via `remainingTools` in `tool-blogs.ts`) — worth flagging which ones deserve real editorial writeups.
