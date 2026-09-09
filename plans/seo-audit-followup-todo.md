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

## 2. Verify the tool-registry refactor with a real build

I refactored `CalculatorShell` + all 1,356 tool `page.tsx` files so each tool page's client bundle only ships its own data instead of all 1,358 tools' data (was the likely cause of the ~24.5s homepage/cold-load time). This was verified with `tsc --noEmit` (clean) and the existing test suite (124/124 pass), but **not with an actual `next build`**, since that's what caused the prior CI OOM incident on this exact registry.

- [ ] Run `npm run build` once, ideally in CI or a machine with headroom, and confirm it completes without OOM
- [ ] Check the build output's per-route bundle size report (Next prints a size table) — tool page bundles should now be dramatically smaller than before this refactor
- [ ] Spot-check a few live tool pages after deploy (breadcrumbs, related tools, FAQ schema, the "read the guide" card) to confirm nothing regressed — these all moved from client-side lookup to server-resolved props, so worth an eyeball pass
- [ ] If it builds clean and pages look right, no further action — if something's off, the change is isolated to `src/components/CalculatorShell.tsx`, `src/utils/resolveShellProps.tsx`, `src/types/shellProps.ts`, and the 1,356 `page.tsx` files (see `scripts/codemod-shell-props.py` for how they were generated)

## 3. Smaller content/linking items not yet done

From the original cluster/content-architecture audit findings — lower priority, safe to batch whenever convenient:

- [ ] `/blog/improve-cibil-score` has zero contextual tool link (only reachable via the generic footer) — add a link to the nearest credit-related tool (e.g. a loan-eligibility calculator, if one exists)
- [ ] Mobile layout fix (`order: -1` to show results above inputs) was only applied to the 401(k) calculator as a proof of concept. If it reads well, consider rolling it out to other calculators with the same input-then-result layout pattern
- [ ] Homepage body copy is still minimal (~69 words) — consider adding a short "why ToolZoneX" paragraph (100-150 words) for on-page relevance, per the content audit
- [ ] `scripts/gen-tool-page.mjs` (the one-off new-tool-page generator) is stale — it still emits the old direct-schema template, not the current `buildToolMetadata`/`buildToolSchema` + `ShellPropsProvider` pattern. Update it before using it to scaffold the next new tool, or it'll generate a page that needs manual fixing afterward

## 4. Follow-up audits worth running later

- [ ] `/seo images` — a dedicated image-SEO pass wasn't part of the original full audit; worth running once, especially since the Images category score (48/100) in the audit report was a rough estimate, not a real pass
- [ ] Configure a `GOOGLE_API_KEY` (see `/Users/punit/.config/claude-seo/google-api.json`) so future `/seo audit` runs get real CrUX/PageSpeed/GSC field data instead of the lab-only estimates this one had to fall back on
- [ ] `/seo drift baseline` — capture a baseline now that this round of fixes is in, so the next audit can diff against it and catch regressions automatically

## 5. Longer-horizon content strategy (Phase 3, not urgent)

- [ ] Build a `utilities` pillar article (or 2-3 sub-pillars: Home & Appliance Cost Calculators, Everyday Math & Life Calculators, Screen Test Tools) — it's the largest tool category (339 tools) and still has zero real editorial articles
- [ ] Close the `developer-tools` guide-coverage gap (currently ~9%, the lowest of any category, despite proven engagement on jwt-explained/cron-syntax-cheatsheet)
- [ ] Third-party brand presence (YouTube, Reddit, LinkedIn company page) — flagged by the GEO audit as the highest-leverage lever for AI-answer-engine citation, but this one's on you, not something I can build
