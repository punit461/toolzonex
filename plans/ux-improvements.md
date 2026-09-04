# UX Improvements Backlog

Tracks site-wide UX/architecture work that isn't about *which tools to build* (see `tools-gap-analysis-roadmap.md` for that) but *how the site presents the tools it already has*.

## ✅ Per-category dashboard pages (requested 2026-09, shipped 2026-09)

**Problem**: the homepage (`src/app/page.tsx`) rendered every tool from every category on one page, grouped by heading but still one continuous grid. At ~870+ tools across 13 categories, this was genuinely cluttered — slow to scan, heavy to load, bad for a user who only cared about one category.

**What shipped**:
- New shared `src/components/CategoryDashboard.tsx` — sources tools straight from `categories` in `src/data/toolCategories.tsx` (no second hand-maintained list), renders a breadcrumb, intro, local search (`toolMatchesQuery`), and the same card-grid markup the homepage already used.
- 9 dashboard pages now live: `/finance` (Finance + Paycheck Calculators), `/health`, `/utilities` (Utilities + Time & Productivity + Screens), `/converters`, `/text-tools`, `/generators`, `/developer-tools`, `/tools`, `/ai`. `/tools/pdf-tools` (`PdfToolsHub.tsx`) was left as its existing dedicated hub, unchanged.
- Homepage (`/`) now shows a 10-tile category grid by default (tool count + a few icon previews per tile, linking to its dashboard) instead of the full tool dump. Typing in the search box still searches every tool across all categories, same as before.
- `CalculatorShell.tsx`'s breadcrumb category link now points at the real dashboard route instead of always `/`.
- `Header.tsx`'s nav dropdowns each got a "View all `<Category>` tools →" link at the bottom, deduplicated where multiple sub-categories share one dashboard (e.g. Finance + Paycheck Calculators → one link to `/finance`).

**Not done from the original proposal** — deliberately out of scope, not an oversight: a "popular/trending tools" highlight strip on the homepage. Revisit if there's a reason to prioritize it later; the core clutter problem is fixed without it.
