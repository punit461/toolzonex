# ToolZoneX Refactor Report

Prepared 2026-08-16. Live version with full formatting: https://claude.ai/code/artifact/cc63193c-15d0-41c3-85bc-dd30d24d91d6

The site works and ships fine today — none of this is urgent. It's a map of where the codebase's organization will start costing time as the tool count keeps growing, ordered so it can be picked up whenever there's a free stretch.

Scope: `src/`, 317 route files, 206 live tools. Method: static grep/count audit, no runtime changes.

## At a glance

- **4x** — places a tool's name/description live in parallel, hand-kept in sync
- **136** — calculator files sitting flat in one folder, no subgrouping
- **228** — `page.tsx` files that hand-copy the same metadata boilerplate
- **84** — near-identical redirect-stub files from the last IA move
- **~130** — calculator files with zero test coverage
- **2** — single data files over 100KB doing several unrelated jobs each

Severity below is about ongoing maintenance cost, not urgency. Effort is a rough guess at focused solo time.

## Findings

### 1. Tool metadata has no single source of truth — High severity, Large effort (needs a plan first)

Every tool's name and description is typed out by hand in up to four separate files, and nothing checks that they agree. "BMI Calculator" appears in:

- `src/app/health/bmi-calculator/page.tsx` — SEO `<title>`/description, JSON-LD name
- `src/calculators/BMICalculator.tsx` — on-page `<h1>` via CalculatorShell
- `src/data/toolCategories.tsx` — homepage card + header nav + search
- `src/data/tool-blogs.ts` — blog post title/excerpt

This is the same shape of bug the previous session kept finding and fixing: Gratuity Calculator missing from nav, 74 tools missing a blog post, 71 tools missing from search. Each was one file falling out of sync with the others. As the tool count grows, that's the default outcome, not an edge case.

**Suggested fix:** one `toolRegistry.ts` per tool — name, description, route, category, icon key, keywords — that `page.tsx`, `toolCategories.tsx`, and `tool-blogs.ts` all read from instead of restating. Biggest payoff item on this list; also the most disruptive, so it's worth doing on its own branch rather than alongside feature work.

### 2. `src/calculators/*.tsx` — 136 flat files — High severity, Medium effort (mechanical)

Seven tool families got their own subfolder (`converters/`, `pdf/`, `screens/`, `paycheck/`, `qr/`, `faceshape/`, `heightcompare/`) — everything else, 136 components, sits loose in one directory.

Text tools, generators, finance calculators, dev tools and health calculators are all interleaved alphabetically by filename with no grouping. Finding "every finance calculator" means scanning 136 names, not opening one folder. The subfolder pattern already exists and clearly works — it's just applied to 7 of roughly 15 logical groups.

**Suggested fix:** sort the remaining 136 into folders mirroring the route groups that already exist in `src/app/` (finance, health, text-tools, generators, developer-tools, utilities). Pure file moves plus import-path updates — safe to do incrementally, one group at a time, verified by `tsc` after each.

### 3. 84 redirect-stub page.tsx files — Medium severity, Small effort

Every tool moved during the earlier IA restructure left behind a tiny page whose entire job is a meta-refresh to the new URL — 84 of them, each hand-written and near-identical:

```tsx
export default function RedirectPage() {
  return <meta httpEquiv="refresh" content={`0; url=${NEW_PATH}`} />;
}
```

Harmless today, but it's 84 files that show up in every directory listing and file search, and any future change to the redirect pattern (a different status signal, a delay, analytics on the redirect) means editing 84 files by hand.

**Suggested fix:** one dynamic route with a `{ oldPath: newPath }` lookup table replaces all 84. Static export supports this the same way the current per-file approach works, just data-driven instead of file-driven.

### 4. Test coverage stops at the folder boundary — Medium severity, Medium effort (ongoing)

Every `.test.ts` file in the repo lives inside `converters/`, `pdf/`, `paycheck/`, `faceshape/`, or the `pomodoro/` subsystem. The ~130 flat calculator files — including ones with real calculation logic like tax, EMI, and BMI — have none.

This tracks with the organization finding above: the subfolders are exactly where testing habits took hold, because there was a clear "this logic lives here" boundary to hang a test file off. The flat files never got that natural home for a test.

**Suggested fix:** no big-bang effort needed — once a tool moves into a proper subfolder (finding #2), pull its calculation logic into a plain function and add one test file alongside it, the same shape as `paycheckEngine.test.ts` already uses. Do it opportunistically per-folder rather than as a separate pass.

### 5. `src/views/` vs `src/components/` — Low severity, Small effort

Six full-page components — About, Contact, FAQ, PrivacyPolicy, TermsOfService, BlogList — live in a top-level `src/views/` that sits alongside `src/components/` with no documented rule for which new file goes where.

Not costing anything today since there are only six of them, but a new contributor (or anyone returning to this in six months) has no way to know why `ToolBlogTemplate.tsx` is a "component" and `BlogList.tsx` is a "view" — they're the same kind of thing.

**Suggested fix:** fold `views/` into `components/` under a `pages/` subfolder, or write one sentence in a README pinning down the distinction. Either resolves it; the second is a five-minute fix if the folder split is intentional.

### 6. `src/data/tool-blogs.ts` — 1,119 lines, 3 jobs — Low severity, Small effort

One file holds 44 hand-written blog entries, a generic-blog generator function, and an 89-entry list that feeds that generator — three distinct concerns stacked in a single 104KB file.

Works fine mechanically (it's just data plus one function), but scrolling past 900 lines of hand-written blog copy to find the generator function — or vice versa — is the kind of friction that discourages touching the file at all.

**Suggested fix:** split into `tool-blogs.handwritten.ts`, `tool-blogs.generated.ts`, and a small `tool-blogs.ts` barrel that re-exports `allToolBlogs`. No logic changes, just a file split.

## Suggested order

1. **Split the two grab-bag data files** — lowest risk, lowest effort, and it makes the next two phases easier to review (smaller diffs once tool-blogs.ts isn't one 1,100-line file). Why first: unblocks everything else without touching any tool's actual behavior.
2. **Collapse the 84 redirects into one dynamic route** — self-contained, fully mechanical, easy to verify against the crawl script. Why now: frees up 84 fewer files to see while doing phase 3's folder sort.
3. **Sort the 136 flat calculator files into folders** — biggest mechanical lift, but each group (finance, health, text-tools, …) can be its own small PR, verified independently with `tsc` and the existing crawl audit. Why here: sets up natural homes for the test files phase 5 wants to add.
4. **Build the shared tool registry** — the big one. Do this once the folder structure it will live alongside is settled, so the registry's own organization doesn't need a second pass right after. Why last: highest payoff, but touches every tool page, so it wants a stable foundation under it.
5. **Backfill tests, folder by folder** — ongoing, not a single pass. Add a test file whenever already touching a tool's logic for another reason, using the newly-organized folders as the natural home. Why ongoing: ties test-writing to work being done anyway instead of a dedicated sprint.

## Rough time estimates

| Phase | Solo, by hand | Delegated to an agent session |
|---|---|---|
| 1. Split the 2 data files | 30–60 min | ~15–20 min |
| 2. Collapse 84 redirects → 1 route | 1–2 hrs | ~30–45 min |
| 3. Sort 136 flat files into folders | 5–10 hrs (spread over several sessions — import paths everywhere need updating) | ~3–5 hrs, verified incrementally with `tsc`/build between groups |
| 4. Shared tool registry | 2–4 full days — touches all ~206 tools' page.tsx + component + data entries | ~1–2 days, done in batches with checkpoints |
| 5. Backfill tests | No fixed block — a few minutes each time already touching a tool for something else | same |

Total for phases 1–4 if done as one push: roughly 1.5–2 weeks solo, or 2–3 focused sessions if delegated. Phase 4 (the registry) is the one most likely to run over — it's a real architecture change, not a mechanical move, so it deserves its own planning pass rather than a time-boxed estimate taken as a promise. None of this needs to happen in one sitting — phases 1–3 are safely choppable into small, independently-verifiable chunks, which is exactly why the report orders them that way.

None of this blocks shipping more tools in the meantime — it's exactly the kind of thing worth batching for a quiet week rather than working in around feature requests.
