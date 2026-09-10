# SEO Audit Follow-Up — Outstanding TODOs

Generated 2026-09-10, following the full `/seo audit` of toolzonex.com and the fix session that followed it. Everything already fixed is committed to `main` — this file tracks what's left, roughly in priority order.

## 1. Migrate hosting: GitHub Pages → Cloudflare Pages

This is the big one — it unblocks the security-headers fix and is the only remaining item that needs your hands (account creation, DNS) rather than code.

- [ ] Create a Cloudflare account, add `toolzonex.com` as a site
- [ ] In Cloudflare Pages, connect the `toolzonex/toolzonex` GitHub repo
  - Build command: `npm run build`
  - Output directory: `out`
- [ ] Point the domain's nameservers to Cloudflare (or configure the custom domain in Pages if keeping DNS elsewhere)
- [ ] Verify the site loads correctly on the new Cloudflare Pages URL before cutting over DNS
- [ ] **Before enforcing the CSP**: `public/_headers` ships a `Content-Security-Policy-Report-Only` header on purpose. Once live on Cloudflare Pages, load the homepage, a calculator page, and a page with ads active, check the browser DevTools Console for CSP violation warnings. Only once that's clean, rename `Content-Security-Policy-Report-Only` → `Content-Security-Policy` in `public/_headers` to actually enforce it.
- [ ] Decommission the GitHub Pages deployment once Cloudflare Pages is confirmed working (check `CNAME` file / repo Pages settings)

## 2. Tool-registry bundle-size fix — attempted, reverted, still needed

The homepage/tool-page cold-load slowness (~24.5s) is very likely caused by `CalculatorShell` (client, used on every one of ~1,358 tool pages) transitively importing the full tool registry, category list, and guide data just to look up its own single entry — meaning every tool page's client bundle ships all 1,358 tools' data and icons.

I attempted a fix (`CalculatorShell` reads pre-resolved data from React Context instead, resolved server-side per page) and rolled it out across all 1,356 tool `page.tsx` files. It passed `tsc --noEmit` and the full test suite locally, but **CI's `npm run build` OOM'd** (heap exhausted during the webpack "Creating an optimized production build" phase, ~300s in) — likely because the refactor moved the heavy registry import from being reached through one shared client-side chunk (1,287 calculator components → 1 `CalculatorShell.tsx`) to being freshly re-imported at 1,356 separate server-side page entry points, which webpack/Next's static-export compiler may not dedupe as well as the client chunk graph did.

**I reverted this refactor** (`CalculatorShell.tsx` and all 1,356 `page.tsx` files back to their pre-refactor state, the 3 new helper files removed) rather than risk a second unverified CI run — see the revert commit for exact scope. The underlying bundle-size problem is still real and still worth fixing, but needs a different approach and a way to verify against a real build before merging, not just `tsc`. Ideas for next time:
- [ ] Split `toolRegistry.tsx` by top-level category (utilities/finance/health/etc.) instead of one flat 1,358-tool file, so each category's server-side entry points only pull in their own slice — smaller blast radius than the full Context-based refactor
- [ ] Or: prototype the Context-based approach on a small subset (e.g. just `/finance/*`, ~250 tools) first, run a real `next build` on that subset in a branch, and confirm memory/behavior before rolling out to all 1,358
- [ ] Whatever approach is tried, get a real `npm run build` (in CI, or locally with enough memory) as part of verifying it — `tsc --noEmit` alone was not sufficient to catch this

## 3. Smaller content/linking items

- [x] `/blog/improve-cibil-score` — added an in-body link to the Credit Utilization Calculator (right where the article discusses the 30% rule) and added the Credit Score Estimator to Related Tools
- [x] Mobile layout fix (`order: -1` to show results above inputs) rolled out from the 401(k) pilot to **702 more calculators** sharing the same two-column input/result grid pattern (verified via a structural scan, not blind regex — 52 files with a different/ambiguous layout were deliberately skipped rather than force-fixed; spot-checked one skip and confirmed it was correctly excluded, a side-by-side comparison layout with no input/result distinction). `tsc --noEmit` clean and full test suite passes across all 702 changed files
- [x] Homepage body copy — added a "Why ToolZoneX" paragraph (tool count, India-specific framing, blog cross-link) shown in the default browsing state
- [x] `scripts/gen-tool-page.mjs` rewritten to match the current `buildToolMetadata`/`buildToolSchema` + registry pattern — now scaffolds the `src/data/tools/<slug>.tsx` entry, appends it to `toolRegistry.tsx`'s import list and array, and generates a correct thin `page.tsx`. Tested against a throwaway tool end-to-end and confirmed a clean 2-line diff to the registry before reverting the test

## 4. Follow-up audits worth running later

- [ ] `/seo images` — a dedicated image-SEO pass wasn't part of the original full audit; worth running once, especially since the Images category score (48/100) in the audit report was a rough estimate, not a real pass
- [ ] Configure a `GOOGLE_API_KEY` (see `/Users/punit/.config/claude-seo/google-api.json`) so future `/seo audit` runs get real CrUX/PageSpeed/GSC field data instead of the lab-only estimates this one had to fall back on — needs your API credentials, not something I can set up
- [x] `/seo drift baseline` — captured 2026-09-10 against the live pre-this-session state

## 5. Longer-horizon content strategy (Phase 3, not urgent)

- [ ] Build a `utilities` pillar article (or 2-3 sub-pillars: Home & Appliance Cost Calculators, Everyday Math & Life Calculators, Screen Test Tools) — it's the largest tool category (339 tools) and still has zero real editorial articles
- [ ] Close the `developer-tools` guide-coverage gap (currently ~9%, the lowest of any category, despite proven engagement on jwt-explained/cron-syntax-cheatsheet)
- [ ] Third-party brand presence (YouTube, Reddit, LinkedIn company page) — flagged by the GEO audit as the highest-leverage lever for AI-answer-engine citation, but this one's on you, not something I can build
