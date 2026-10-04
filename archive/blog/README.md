# Retired blog (archived 2026-10-04)

The blog that ran at `/blog`: 18 hand-written articles, 262 templated tool guides under `/blog/tools/*`, and the `/blog` index. None of this is built or served. `archive/` sits outside `src/` and is excluded in `tsconfig.json` and `eslint.config.mjs`.

## Why it was retired

Search Console, Aug 8 – Sep 29, 2026 (all the data the property had):

| | Share of impressions | Clicks |
|---|---|---|
| Tool pages | 89% | 37 of 39 |
| `/blog/tools/*` guides | 10% | 2 |
| Hand-written articles | 1% | 0 |

The templated guides mostly repeated the tool page each one described and split queries with it. 262 near-identical pages also read as mass-produced content. The best tool sites put the explanation on the tool page instead.

## Where the old URLs go

Every old URL returns a 301:

- each article goes to the calculator it was written around
- each guide goes to its tool
- `/blog` goes to `/`

The map is `src/data/blog-redirects.ts`. `scripts/generate-redirects.mjs` turns it into `out/_redirects`, and `scripts/generate-sitemap.mjs` lists the URLs in `sitemap-cleanup.xml` so Google recrawls them.

## Restoring

Paths under `archive/blog/` mirror their original locations.

1. `git mv` the files back: `archive/blog/src/app/blog` → `src/app/blog`, and the same for `src/components/...` and `src/data/...`.
2. Remove the matching entries from `src/data/blog-redirects.ts`, and the `/blog` rule in `scripts/lib/redirect-maps.mjs`. Cloudflare applies `_redirects` before serving pages, so a leftover rule would hide the restored page.
3. Re-add the links that were cut in the same commit: the Blog item in `Header.tsx`, the guide card in `CalculatorShell.tsx`, `featuredGuides` in `CategoryDashboard.tsx` and the finance and developer-tools hubs, and the homepage "guides" sentence. `git log --follow` on any archived file finds that commit.
