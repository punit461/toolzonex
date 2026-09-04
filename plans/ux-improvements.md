# UX Improvements Backlog

Tracks site-wide UX/architecture work that isn't about *which tools to build* (see `tools-gap-analysis-roadmap.md` for that) but *how the site presents the tools it already has*.

## ☐ Per-category dashboard pages (requested 2026-09, not started)

**Problem**: the homepage (`src/app/page.tsx`) renders every tool from every category on one page, grouped by heading but still one continuous grid. At ~870 tools across 13 categories, this is genuinely cluttered — slow to scan, heavy to load, bad for a user who only cares about one category (e.g. "just show me Finance tools").

**Current state**:
- `src/data/toolCategories.tsx`'s `categories` array already groups every tool by `navCategory` with `{ title, description, path, icon }` — the data layer needs zero changes, this is a pure UI/routing restructure.
- `/tools/pdf-tools` (`src/calculators/pdf/PdfToolsHub.tsx`) already does exactly this for PDF Tools specifically — a dedicated hub page with its own card grid. Use it as the template.
- The other category root routes are currently either dead-end redirects to `/` (`src/app/finance/page.tsx`, `health/page.tsx`, `utilities/page.tsx` — all literally `redirect('/')`) or don't exist at all as a page (`/converters`, `/text-tools`, `/generators`, `/developer-tools` have no `page.tsx`, so those routes 404 today).

**Proposed fix**:
1. Build one dashboard page per category at its natural root route: `/finance`, `/health`, `/utilities`, `/converters`, `/text-tools`, `/generators`, `/developer-tools` (`/tools/pdf-tools` already exists; decide whether `Screens`, `Time & Productivity`, `Paycheck Calculators`, `AI`, `Tools` also warrant their own page or fold into a parent — e.g. Paycheck Calculators could live inside the Finance dashboard as a sub-section rather than get a whole separate route).
2. Each dashboard: `categories.find(c => c.label === '<Category>')`, render that category's tools in the same card-grid markup already used on the homepage (`src/app/page.tsx` lines ~59-82) or `PdfToolsHub.tsx`, plus its own local search/filter (reuse `toolMatchesQuery` from `src/utils/search.ts`).
3. Redesign the homepage itself: replace the full per-category tool dump with a lighter landing page — hero, a tile per category linking to its new dashboard (tile shows tool count + maybe 3-4 icons as a preview), a "popular/trending tools" highlight strip, and keep the global search bar but have it search across all categories and deep-link to the right tool or dashboard.
4. Wire the new routes into `NAV_GROUPS` in `src/components/Header.tsx` if the nav should link to the dashboards directly instead of (or in addition to) anchor-scrolling the homepage.

**Not started yet** — flagging here so it doesn't get lost, and so whoever picks it up doesn't have to re-derive the "redirect stubs + missing pages" discovery above.
