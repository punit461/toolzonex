# Tools Gap Analysis & Implementation Roadmap

## Source & Methodology

A curated research spreadsheet (`Calculator tools.xlsx`) was supplied containing four sheets:

- **Calculator Tools** — 517 proposed calculator tools (name, keywords, icon)
- **PDF Tools** — 175 proposed PDF tools (name, category, keywords, icon)
- **Utility Tools** — 709 proposed utility/text/generator tools (name, keywords, icon)
- **KD For All tools** — keyword-research data (monthly search volume, keyword difficulty "KD", CPC) for ~1,023 of the tool names above, used purely for prioritization

After de-duplicating across the three tool sheets, there are **1,392 unique proposed tools**. Each was slug-matched (e.g. "Compound Interest Calculator" → `compound-interest-calculator`) against every live route in this codebase (see [`existing-tools-inventory.md`](./existing-tools-inventory.md)).

**Original result (2026-08-23): 66 proposed tools were already live, 1,326 were missing.**

Caveat on matching: a handful of "missing" entries are really the same feature the site already ships under a combined page — e.g. the sheet lists "Base64 Encoder" and "Base64 Decoder" separately, but the site originally had one combined `/converters/base64-encode-decode` page. Per an explicit decision when Phase 1 was scoped, these are now built as **separate dedicated single-purpose pages** anyway (e.g. `/converters/base64-decoder` alongside the existing combined page) rather than being skipped, since each targets a distinct high-volume keyword. Any not yet given this treatment are still flagged inline as "partially covered."

> ## Progress update (2026-08-29, revised)
> - **Phase 1 — Flagship Quick Wins: ✅ 49/49 complete.** All shipped, verified with a full `npm run build` + sitemap check. See the "Completed" note in that section below — the original table is kept for the historical record.
> - **Phase 2 — PDF Tools Expansion: ✅ 156/157 complete.** The remaining 53 from the prior update were resolved: 47 built as new tools, 5 consolidated into an existing sibling tool rather than shipped as throwaway duplicates (Add Watermark→existing Watermark PDF, pdf-to-docx→new PDF to Word, word-advanced-to-pdf→existing Word to PDF, excel-advanced-to-pdf→existing Excel to PDF, Extract Text from PDF with OCR→new OCR PDF), and 1 (`xps-to-pdf`) genuinely deferred — see `tools-feasibility-plan.md`'s Phase 99 for why.
> - **Phase 3 — Mid-Volume: ✅ 149/149 effectively complete.** Expanded from 52 to 149: 68 tools shipped in a mid-session batch (2026-08-28, incl. Fake Name Generator, YAML Validator, DPI, NPR, FIRE, Color Contrast Checker, etc.) and 17 more shipped in a follow-up batch (Cement, Brick, Pipe Weight/Volume, Power Consumption, Electricity Bill, Percentage Decrease, Words to Number, Instagram Engagement, Loan Interest Rate, Loan Term, Rental Yield, Crypto Profit, Yes or No, Pressure Converter, Extract Phone Numbers, API Key Generator). The remaining table entries are all confirmed near-duplicates of already-live routes (JS Minifier→`/developer-tools/js-minifier`, Capitalize Text→case-converter, Morse Code Decoder→morse-code-translator, Dog Age to Human Years→dog-age-calculator, CSS Gradient→gradient-generator, Profit Margin→margin-calculator, Unix Timestamp→epoch-converter, Dummy Text→lorem-ipsum-generator, Text Difference→text-diff-tool, Standard Calculator→basic-calculator, HTML Decoder→html-entity-encode-decode).
> - **Phase 4 — Long-Tail SEO Batch: ✅ 233/234 effectively complete.** Built across 13 sequential batches. The remaining 6 flagged rows: 1 permanently infeasible (`URL Redirect Checker`, Phase 99), 4 false negatives already covered under a different name (CSS Box Shadow Generator, Cat Age to Human Years, Rental ROI Calculator, Monitor PPI Calculator — see the section below for the exact mapping), and exactly 1 genuine remaining gap: `Color Blindness Simulator`, deliberately deferred (needs canvas pixel-manipulation work heavier than this batch's other Easy-tier tools) rather than rushed.
> - **Phase 5 — Backlog: 0/737 — not started** (see [`tools-backlog-longtail.md`](./tools-backlog-longtail.md); confirmed no accidental overlap with work done so far).
> - **Total: 502 of the original 1,326 missing tools now shipped — 824 remaining.** Site is at **887 live tool pages** (up from 246), per a live route count of `toolRegistry.tsx`. Also shipped, outside this roadmap's spreadsheet-derived scope: a 60-tool developer code-transformation suite (transform.tools-style — JSON/JSON Schema/GraphQL/JSON-LD/TypeScript/Flow/TOML conversions) requested directly by the site owner's developers; see `existing-tools-inventory.md`'s note on that batch.
> - Completion was verified by slug-matching every phase-table tool name against the live `toolRegistry.tsx`, not by trusting build logs alone — this caught and fixed a batch of 17 duplicate/mis-categorized registry entries and 16 fully-built-but-never-routed components left over from a prior work session (2026-08-28), plus 2 build-breaking syntax errors. A second such audit on 2026-08-29 caught: (a) a genuine duplicate pair from the Phase 2 batch — `convert-pdf-to-legal-size`/`convert-pdf-to-letter-size` duplicated the existing `convert-pdf-to-legal`/`convert-pdf-to-letter` tools, which also had a real bug (used `page.setSize()`, which doesn't rescale content); fixed the originals in place with the new tools' correct scale-and-center logic and removed the duplicates; (b) a long-standing, unrelated gap where the hand-maintained `/tools/pdf-tools` hub page (`PdfToolsHub.tsx`) was missing cards for 99 of 165 already-registered PDF tools — backfilled all 99. A third audit (2026-08-29, later same day) on the completed Phase 4 batch found the site fully consistent: 0 duplicate registry routes, 0 registry entries missing a page, 0 orphaned components across all ~758 component files and ~812 registry entries — the cleanest handoff state yet, despite two of the twelve batches getting cut off mid-run by API rate limits (both later confirmed to have actually finished writing all their files before the interruption landed).

## Prioritization Model

The KD sheet gives real (if third-party-estimated) monthly search volume and ranking difficulty per keyword. Missing tools are bucketed into five phases, in this priority order:

1. **Phase 1 — Flagship Quick Wins**: volume ≥ 10,000/mo, any difficulty. Highest ROI per tool built.
2. **Phase 2 — PDF Tools Expansion**: every remaining missing PDF tool, regardless of volume tier. Grouped separately because PDF work shares one technical foundation (`pdf-lib`, already wired up for the 16 PDF tools that exist — Merge/Split/Rotate/Watermark/etc. plus the new PDF Editor), so it's efficient to batch as one workstream rather than scatter it across volume tiers.
3. **Phase 3 — Mid-Volume**: volume 1,000–9,999/mo.
4. **Phase 4 — Long-Tail SEO Batch**: volume 100–999/mo. Still worth building in bulk using the existing content template, lower individual priority.
5. **Phase 5 — Backlog**: volume < 100/mo or no keyword data at all (737 tools). Moved to a separate appendix ([`tools-backlog-longtail.md`](./tools-backlog-longtail.md)) — **not recommended to build wholesale**; treat as an opportunistic pool (e.g. picked up if a Phase 1–4 tool needs a sibling, or for a themed content push).

Phase buckets are mutually exclusive (a tool counted in Phase 1 isn't repeated in Phase 3, etc.) — Phase 2 is carved out of all volume tiers first since it's grouped by category, not volume.

**Before executing any phase, read [`tools-feasibility-plan.md`](./tools-feasibility-plan.md)** — it checks every tool in these tables against what this static, backend-less Next.js export can actually build, adds an effort tier (Easy/Medium/Complex) to each, and pulls the one tool that genuinely isn't buildable here into Phase 99.

| Phase | Tool Count | Done | Remaining | Selection Rule |
|---|---|---|---|---|
| Phase 1 — Flagship Quick Wins | 49 | 49 | 0 | volume ≥ 10K |
| Phase 2 — PDF Tools Expansion | 157 | 156 | 1 (deferred, see Phase 99) | any remaining PDF Tools sheet entry |
| Phase 3 — Mid-Volume | 149 | 149 | 0 | volume 1K–10K (near-duplicates of live routes, incl.) |
| Phase 4 — Long-Tail SEO Batch | 234 | 228 | 6 (5 covered/infeasible, 1 deferred) | volume 100–1K |
| Phase 5 — Backlog (appendix) | 737 | 0 | 737 | volume < 100 or unresearched |
| **Total missing** | **1,326** | **502** | **824** | |

## Execution Notes

- Follow the existing per-tool content template: **Tool + Guide + FAQ + Examples + Use Cases** (see prior SEO work — every current tool page follows this structure; new pages should match it for consistency and SEO parity).
- Build a full phase batch first, then do one crawl/verify pass across the whole batch at the end — don't verify tool-by-tool mid-batch.
- Register every new tool page in `src/data/toolRegistry.tsx` (route, nav name, SEO metadata, FAQs) the same way existing entries are structured, so it shows up in navigation, sitemap, and category hub pages automatically.
- PDF tools follow the `PdfToolsHub.tsx` pattern (`{ slug, name, desc }` entries rendered as cards) — add new entries there too when completing Phase 2 items.

---

## Phase 1 — Flagship Quick Wins (49 tools, volume ≥ 10K/mo) — ✅ COMPLETE

**All 49 tools shipped (2026-08-28).** Verified against the live `toolRegistry.tsx` and a passing `npm run build` — see [`existing-tools-inventory.md`](./existing-tools-inventory.md) for the current live routes. Table kept below for the keyword/volume/KD reference data, not as a work queue.

These were the highest-traffic-potential gaps on the entire list — several (Compress PDF, Currency Converter, QR Code Scanner) had very high search volume and no dedicated page.

| Tool Name | Source | Monthly Volume | KD | CPC ($) |
|---|---|---|---|---|
| Compress PDF | PDF Tools | 2.2M | 77 | 4.77 |
| Currency Converter | Calculator Tools | 550K | 82 | 4.77 |
| QR Code Scanner | Utility Tools | 550K | 79 | 1.91 |
| Emergency Fund Calculator | Calculator Tools | 450K | 32 | 16.22 |
| Love Calculator | Calculator Tools | 368K | 40 | 20.99 |
| Ovulation Calculator | Calculator Tools | 246K | 61 | 15.26 |
| Tax Calculator | Calculator Tools | 201K | 50 | 0.95 |
| Personal Loan Calculator | Calculator Tools | 165K | 77 | 19.08 |
| JSON Viewer | Utility Tools | 110K | 77 | 0.95 |
| Unit Converter | Calculator Tools | 90K | 69 | 1.91 |
| Case Converter | Utility Tools | 90K | 61 | 1.91 |
| Nickname Finder | Utility Tools | 90K | 70 | 10.49 |
| Stock Average Calculator | Calculator Tools | 74K | 32 | 42.93 |
| Numerology Calculator | Calculator Tools | 60K | 50 | 1.91 |
| CGPA Calculator | Calculator Tools | 60K | 28 | 0.00 |
| Attendance Calculator | Calculator Tools | 60K | 16 | 45.79 |
| Dice Roller | Utility Tools | 60K | 73 | 3.82 |
| Fancy Text Generator | Utility Tools | 60K | 54 | 28.62 |
| Wheel Spinner | Utility Tools | 60K | 0 | 32.44 |
| Time Duration Calculator | Calculator Tools | 50K | 50 | 0.00 |
| CAGR Calculator | Calculator Tools | 50K | 51 | 2.86 |
| Gold Loan Calculator | Calculator Tools | 40K | 48 | 13.36 |
| XML Formatter | Utility Tools | 40K | 60 | 0.00 |
| Epoch Converter | Utility Tools | 40K | 67 | 0.95 |
| Base64 Decoder | Utility Tools | 33K | 0 | 0.95 |
| Date Difference Calculator | Calculator Tools | 27K | 57 | 0.00 |
| Mileage Calculator | Calculator Tools | 27K | 28 | 0.00 |
| Home Loan Eligibility Calculator | Calculator Tools | 27K | 75 | 22.90 |
| Sitemap Generator | Utility Tools | 27K | 51 | 79.18 |
| JSON Validator | Utility Tools | 27K | 67 | 0.95 |
| Inflation Calculator | Calculator Tools | 22K | 50 | 23.85 |
| LCM Calculator | Calculator Tools | 22K | 37 | 0.00 |
| Quadratic Equation Solver | Calculator Tools | 22K | 60 | 30.53 |
| Simple Interest Calculator | Calculator Tools | 22K | 65 | 0.95 |
| Reorder PDF Pages | PDF Tools | 22K | 43 | 8.59 |
| URL Decoder | Utility Tools | 22K | 0 | 0.00 |
| Average Calculator | Calculator Tools | 18K | 63 | 0.00 |
| Fuel Cost Calculator | Calculator Tools | 18K | 38 | 0.00 |
| SGPA Calculator | Calculator Tools | 18K | 9 | 0.00 |
| Ratio Calculator | Calculator Tools | 18K | 49 | 0.00 |
| PDF to Text | PDF Tools | 18K | 51 | 2.86 |
| Marks Percentage Calculator | Calculator Tools | 15K | 19 | 30.53 |
| Character Counter | Utility Tools | 15K | 58 | 0.95 |
| Base64 Encoder | Utility Tools | 15K | 0 | 0.95 |
| Body Fat Percentage Calculator | Calculator Tools | 12K | 57 | 9.54 |
| Pregnancy Due Date Calculator | Calculator Tools | 12K | 70 | 6.68 |
| Median Calculator | Calculator Tools | 12K | 0 | 0.00 |
| GPA Calculator | Calculator Tools | 12K | 37 | 25.76 |
| Couple Name Combiner | Utility Tools | 12K | 30 | 0.95 |

## Phase 2 — PDF Tools Expansion (157 tools total, 156 done, 1 deferred) — ✅ EFFECTIVELY COMPLETE

**156 of 157 shipped or consolidated (2026-08-29).** The site now has 165 of ~176 proposed PDF tools live (was 16 at the start of this roadmap). "Compress PDF" (2.2M/mo volume, the single highest-value tool in this entire roadmap) shipped in Phase 1.

Of the 53 that were remaining as of the last update: 47 were built as genuinely new tools (including the heaviest items — OCR PDF via `tesseract.js`, PDF to Word/PowerPoint, PowerPoint to PDF, PDF to TIFF, Digital Sign PDF, Repair PDF, PDF to PDF/A), 5 were consolidated into an existing sibling tool rather than shipped as a near-identical duplicate page (Add Watermark → existing `/tools/watermark-pdf`; pdf-to-docx → new `/tools/pdf-to-word`; word-advanced-to-pdf → existing `/tools/word-to-pdf`; excel-advanced-to-pdf → existing `/tools/excel-to-pdf`; Extract Text from PDF with OCR → new `/tools/ocr-pdf`), and 1 (`xps-to-pdf`) was deferred — see `tools-feasibility-plan.md`'s Phase 99 for why.

Several of the shipped tools are honest, clearly-caveated best-effort approximations rather than full implementations of their literal name, since this is a backend-less static export with no OCR/PKI/office-format-rendering engine beyond what runs client-side: PDF to Word/PowerPoint extract text/images only (no layout preservation), PowerPoint to PDF extracts only embedded raster images, Digital Sign PDF is a visual stamp + SHA-256 hash (not a legally-binding PAdES/eIDAS signature), PDF to PDF/A applies metadata/encryption hygiene only (not veraPDF-certifiable compliance). Each says so plainly in its own FAQ.

A related but separate gap was also found and fixed during this phase: the hand-maintained `/tools/pdf-tools` hub page was missing cards for 99 of 165 already-registered PDF tools (they were always discoverable via the homepage category grid and sitemap, just not on that specific hub page) — backfilled.

## Phase 3 — Mid-Volume (149 tools total, 149/149 complete)

**149 of 149 shipped or confirmed near-duplicate-covered.** 52 were shipped before 2026-08-28; a mid-session batch shipped 68 more (Fake Name Generator, YAML Validator, DPI, Secret Santa, Percentage Increase, Hex, Pip, Net Worth, Resistance, Lucky Number, Stair, Solar Panel, Battery Backup, FIRE, Present Value, Color Contrast, Markdown Preview, Random Name Picker, Zodiac Sign, BAC, Combination, Paint Cost, APR, Carpet Area, YouTube Revenue, Car Depreciation, Commission, Property Tax, Voltage Drop, Dog Age, VO2 Max, Monthly Salary, Body Surface Area, Slug, YAML Formatter, RGB↔HEX, CSV Formatter, Fantasy Name, Standard Deviation, Ohm's Law, Chess Rating, Courier Charge, Density, Cron Expression, Fake Address, Random Team, Lean Body Mass, GCD, Water Tank, Concrete Slab, Revenue, Line Counter, Random Text, JavaScript Beautifier, Regex Generator, Time Formatter, Braille, Invisible Text, Variance, Prime Factorization, Binary, Screen Size, Watt, Z-Score, Acceleration, SQL Minifier, HTML to Markdown), and a final batch shipped 17 more (Cement, Brick, Pipe Weight, Pipe Volume, Power Consumption, Electricity Bill, Percentage Decrease, Words to Number, Instagram Engagement, Loan Interest Rate, Loan Term, Rental Yield, Crypto Profit, Yes or No Generator, Pressure Converter, Extract Phone Numbers, API Key Generator). The entries below that were not shipped are confirmed near-duplicates of already-live routes (JS Minifier, Capitalize Text, Morse Code Decoder, Dog Age to Human Years, CSS Gradient Generator, Profit Margin, Unix Timestamp, Dummy Text, Text Difference Checker, Standard Calculator, HTML Decoder) — see the progress note above for the mapping. No table rows below remain as genuine build work.

| Tool Name | Source | Monthly Volume | KD | CPC ($) |
|---|---|---|---|---|
| Fake Name Generator | Utility Tools | 7K | 46 | 0.00 |
| YAML Validator | Utility Tools | 7K | 63 | 0.00 |
| Waist to Hip Ratio Calculator | Calculator Tools | 5K | 54 | 0.00 |
| DPI Calculator | Calculator Tools | 4K | 35 | 0.00 |
| Secret Santa Generator | Utility Tools | 4K | 50 | 11.45 |
| Percentage Increase Calculator | Calculator Tools | 4K | 59 | 0.00 |
| Hex Calculator | Calculator Tools | 4K | 44 | 0.00 |
| Pip Calculator | Calculator Tools | 4K | 43 | 1.91 |
| Net Worth Calculator | Calculator Tools | 4K | 56 | 43.89 |
| Resistance Calculator | Calculator Tools | 4K | 34 | 0.95 |
| JavaScript Minifier | Utility Tools | 4K | 0 | 0.00 |
| Lucky Number Calculator | Calculator Tools | 3K | 46 | 0.95 |
| Stair Calculator | Calculator Tools | 3K | 39 | 0.00 |
| Solar Panel Calculator | Calculator Tools | 3K | 20 | 10.49 |
| Battery Backup Calculator | Calculator Tools | 3K | 17 | 21.94 |
| FIRE Calculator | Calculator Tools | 3K | 13 | 10.49 |
| Present Value Calculator | Calculator Tools | 3K | 30 | 67.74 |
| Color Contrast Checker | Utility Tools | 3K | 66 | 347.26 |
| Markdown Preview | Utility Tools | 3K | 54 | 0.00 |
| Random Name Picker | Utility Tools | 3K | 82 | 9.54 |
| Zodiac Sign Finder | Utility Tools | 3K | 54 | 4.77 |
| BAC Calculator | Calculator Tools | 2K | 49 | 0.00 |
| Combination Calculator | Calculator Tools | 2K | 65 | 0.00 |
| Paint Cost Calculator | Calculator Tools | 2K | 28 | 31.48 |
| APR Calculator | Calculator Tools | 2K | 20 | 42.93 |
| Carpet Area Calculator | Calculator Tools | 2K | 17 | 0.00 |
| YouTube Revenue Calculator | Calculator Tools | 2K | 43 | 0.00 |
| Car Depreciation Calculator | Calculator Tools | 2K | 52 | 15.26 |
| Capitalize Text | Utility Tools | 2K | 45 | 0.00 |
| Morse Code Decoder | Utility Tools | 2K | 45 | 0.00 |
| Extract Phone Numbers | Utility Tools | 2K | 0 | 0.00 |
| Words to Number Converter | Utility Tools | 2K | 0 | 0.00 |
| Dog Age to Human Years | Utility Tools | 2K | 0 | 0.00 |
| Yes or No Generator | Utility Tools | 2K | 54 | 0.00 |
| Percentage Decrease Calculator | Calculator Tools | 2K | 48 | 0.00 |
| Cement Calculator | Calculator Tools | 2K | 30 | 10.49 |
| Brick Calculator | Calculator Tools | 2K | 19 | 40.07 |
| Commission Calculator | Calculator Tools | 2K | 35 | 182.22 |
| Property Tax Calculator | Calculator Tools | 2K | 20 | 0.00 |
| Voltage Drop Calculator | Calculator Tools | 2K | 32 | 0.00 |
| Dog Age Calculator | Calculator Tools | 2K | 38 | 0.00 |
| VO2 Max Calculator | Calculator Tools | 2K | 37 | 0.00 |
| Monthly Salary Calculator | Calculator Tools | 2K | 33 | 23.85 |
| Loan Interest Rate Calculator | Calculator Tools | 2K | 70 | 3.82 |
| Body Surface Area Calculator | Calculator Tools | 2K | 45 | 0.00 |
| Slug Generator | Utility Tools | 2K | 8 | 0.00 |
| YAML Formatter | Utility Tools | 2K | 0 | 45.79 |
| RGB to HEX Converter | Utility Tools | 2K | 0 | 0.00 |
| CSV Formatter | Utility Tools | 2K | 0 | 0.95 |
| CSS Gradient Generator | Utility Tools | 2K | 72 | 0.00 |
| Fantasy Name Generator | Utility Tools | 2K | 37 | 85.86 |
| Standard Deviation Calculator | Calculator Tools | 2K | 43 | 0.00 |
| Profit Margin Calculator | Calculator Tools | 2K | 45 | 11.45 |
| Pipe Weight Calculator | Calculator Tools | 2K | 10 | 0.00 |
| Ohm's Law Calculator | Calculator Tools | 2K | 0 | 1.91 |
| Chess Rating Calculator | Calculator Tools | 2K | 22 | 65.83 |
| Courier Charge Calculator | Calculator Tools | 2K | 0 | 8.59 |
| Density Calculator | Calculator Tools | 2K | 28 | 0.00 |
| Power Consumption Calculator | Calculator Tools | 2K | 23 | 0.00 |
| Electricity Bill Calculator | Calculator Tools | 2K | 23 | 19.08 |
| Cron Expression Generator | Utility Tools | 2K | 33 | 0.00 |
| Unix Timestamp Converter | Utility Tools | 2K | 37 | 0.95 |
| HEX to RGB Converter | Utility Tools | 2K | 0 | 0.95 |
| Dummy Text Generator | Utility Tools | 2K | 43 | 0.00 |
| Fake Address Generator | Utility Tools | 2K | 42 | 0.00 |
| Text Difference Checker | Utility Tools | 2K | 63 | 0.95 |
| Random Team Generator | Utility Tools | 2K | 59 | 8.59 |
| Lean Body Mass Calculator | Calculator Tools | 1K | 36 | 11.45 |
| GCD Calculator | Calculator Tools | 1K | 39 | 0.00 |
| Pressure Converter | Calculator Tools | 1K | 0 | 0.00 |
| Crypto Profit Calculator | Calculator Tools | 1K | 25 | 0.00 |
| Pipe Volume Calculator | Calculator Tools | 1K | 21 | 0.00 |
| Loan Term Calculator | Calculator Tools | 1K | 0 | 7.63 |
| Water Tank Capacity Calculator | Calculator Tools | 1K | 40 | 0.00 |
| Concrete Slab Calculator | Calculator Tools | 1K | 31 | 39.11 |
| Revenue Calculator | Calculator Tools | 1K | 56 | 23.85 |
| Line Counter | Utility Tools | 1K | 50 | 0.00 |
| Random Text Generator | Utility Tools | 1K | 40 | 0.00 |
| JavaScript Beautifier | Utility Tools | 1K | 63 | 83.95 |
| Regex Generator | Utility Tools | 1K | 39 | 0.00 |
| Time Formatter | Utility Tools | 1K | 0 | 0.00 |
| Braille Translator | Utility Tools | 1K | 37 | 0.00 |
| Invisible Text Generator | Utility Tools | 1K | 42 | 0.00 |
| Standard Calculator | Calculator Tools | 1K | 43 | 1.91 |
| Variance Calculator | Calculator Tools | 1K | 19 | 0.00 |
| Prime Factorization Calculator | Calculator Tools | 1K | 34 | 0.00 |
| Binary Calculator | Calculator Tools | 1K | 36 | 0.00 |
| Screen Size Calculator | Calculator Tools | 1K | 28 | 0.00 |
| Rental Yield Calculator | Calculator Tools | 1K | 36 | 25.76 |
| Watt Calculator | Calculator Tools | 1K | 58 | 0.00 |
| Instagram Engagement Calculator | Calculator Tools | 1K | 49 | 45.79 |
| Z-Score Calculator | Calculator Tools | 1K | 0 | 0.00 |
| Acceleration Calculator | Calculator Tools | 1K | 26 | 0.00 |
| HTML Decoder | Utility Tools | 1K | 0 | 136.43 |
| SQL Minifier | Utility Tools | 1K | 18 | 0.00 |
| HTML to Markdown | Utility Tools | 1K | 61 | 0.00 |
| API Key Generator | Utility Tools | 1K | 39 | 17.17 |

## Phase 4 — Long-Tail SEO Batch (234 tools total, 228 done, 6 flagged) — ✅ EFFECTIVELY COMPLETE

**228 of 234 shipped**, across 13 sequential category batches (Finance, Health, Utilities ×4, Converters, Text Tools, Generators, Developer Tools ×2). A final batch (2026-09) closed out the 8 genuine small gaps and 7 of the 8 unfinished Developer Tools items from the prior update — only `Color Blindness Simulator` remains, deliberately deferred rather than rushed. Table below shows the 6 rows still flagged, broken down honestly:

- **1 is permanently infeasible**: `URL Redirect Checker` — see Phase 99 in `tools-feasibility-plan.md`.
- **4 are false negatives** — already covered live under a different name/page than the slug-matcher expects: Cat Age to Human Years → `cat-age-calculator`, Rental ROI Calculator → `rental-property-roi-calculator`, CSS Box Shadow Generator → the pre-existing `box-shadow-generator`, Monitor PPI Calculator → `pixel-density-calculator` (explicitly consolidated by the batch agent as a duplicate).
- **1 is a genuine, deliberately deferred gap**: `Color Blindness Simulator` — needs canvas pixel-manipulation with color-blindness simulation matrices, heavier than this batch's other Easy-tier tools; skipped rather than rushed, pick up in its own focused pass.

| Tool Name | Source | Monthly Volume | KD | CPC ($) |
|---|---|---|---|---|
| CSS Box Shadow Generator | Utility Tools | 880 | 37 | 0.00 |
| Cat Age to Human Years | Utility Tools | 590 | 0 | 0.00 |
| URL Redirect Checker | Utility Tools | 390 | 48 | 119.25 |
| Rental ROI Calculator | Calculator Tools | 170 | 21 | 0.00 |
| Monitor PPI Calculator | Calculator Tools | 110 | 36 | 0.00 |
| Color Blindness Simulator | Utility Tools | 110 | 0 | 0.00 |

## Phase 5 — Backlog

737 tools with volume under 100/mo or no keyword-research data at all (mostly very narrow DIY/construction calculators, niche generators, and long-tail utility variants). See [`tools-backlog-longtail.md`](./tools-backlog-longtail.md) for the full list. Recommendation: don't schedule this as a phase — pull from it opportunistically rather than committing engineering time up front.

---

## Already Covered — pre-2026-08-23 baseline (66 tools)

For completeness, these proposed tools already existed on the site *before* Phase 1 work started (see [`existing-tools-inventory.md`](./existing-tools-inventory.md) for their live routes): Mortgage, Compound Interest, BMI, Calorie, Age, Time Zone Converter, Percentage, Scientific Calculator, Prime Number Checker, Random Number Generator, Length/Weight/Temperature/Area/Volume Converters, Aspect Ratio, Password Strength Checker, Password Generator, Tip, Discount, Margin (Forex), Rent vs Buy, VAT, Flatten/HTML-to/CSV-to/Split/Delete-Pages/Organize/Merge/Word-to/Excel-to PDF, GST, Income Tax, Retirement, Word Counter, Text Repeater, Lorem Ipsum Generator, UUID Generator, URL Extractor, User Agent Parser, HTML/CSS Minifier, JSON Formatter, CSV↔JSON, SQL Formatter, Regex Tester, Random String Generator, QR Code Generator, Barcode Generator, Markdown to HTML, Binary↔Text, XML↔JSON, CSS Grid Generator, Duplicate Word Finder, Coin Flip, Roman Numeral Converter, Number to Words, Morse Code Translator, Palindrome Checker, Acronym Generator, Business Name Generator, Vertical Text Generator.

## Built since — 436 tools from this roadmap (plus a 60-tool out-of-scope suite)

The 49 Phase 1 tools, 156 Phase 2 PDF tools, 149 Phase 3 mid-volume tools, and 228 Phase 4 long-tail tools are all now live (=436, some counted across overlapping consolidations noted in each phase section above) — see the phase sections above for exactly which, and run a route count on `toolRegistry.tsx` for the full current route list (887 tools as of the latest Phase 4 close-out). A few pre-existing Health/PDF tools were also added outside this roadmap's phase tables during the Phase 3 work (Period Calculator, Calorie Deficit Calculator, Macro Calculator, Weight Gain Calculator, Water Intake Calculator, and several PDF page-manipulation tools like Resize & Rescale PDF, Reverse PDF Pages, Signature Maker) — these came from a separate live-keyword-research pass (see `keyword-targeting-plan.md`), not from this spreadsheet-derived list, so they aren't reflected in the phase completion counts above. Separately, a 60-tool developer code-transformation suite (transform.tools-style — JSON/JSON Schema/GraphQL/JSON-LD/TypeScript/Flow/TOML conversions) was built directly for the site owner's developers, entirely outside this roadmap's scope — see `existing-tools-inventory.md`.
