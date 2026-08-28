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

> ## Progress update (2026-08-29)
> - **Phase 1 — Flagship Quick Wins: ✅ 49/49 complete.** All shipped, verified with a full `npm run build` + sitemap check. See the "Completed" note in that section below — the original table is kept for the historical record.
> - **Phase 2 — PDF Tools Expansion: ✅ 156/157 complete.** The remaining 53 from the prior update were resolved: 47 built as new tools, 5 consolidated into an existing sibling tool rather than shipped as throwaway duplicates (Add Watermark→existing Watermark PDF, pdf-to-docx→new PDF to Word, word-advanced-to-pdf→existing Word to PDF, excel-advanced-to-pdf→existing Excel to PDF, Extract Text from PDF with OCR→new OCR PDF), and 1 (`xps-to-pdf`) genuinely deferred — see `tools-feasibility-plan.md`'s Phase 99 for why.
> - **Phase 3 — Mid-Volume: ✅ 149/149 effectively complete.** Expanded from 52 to 149: 68 tools shipped in a mid-session batch (2026-08-28, incl. Fake Name Generator, YAML Validator, DPI, NPR, FIRE, Color Contrast Checker, etc.) and 17 more shipped in a follow-up batch (Cement, Brick, Pipe Weight/Volume, Power Consumption, Electricity Bill, Percentage Decrease, Words to Number, Instagram Engagement, Loan Interest Rate, Loan Term, Rental Yield, Crypto Profit, Yes or No, Pressure Converter, Extract Phone Numbers, API Key Generator). The remaining table entries are all confirmed near-duplicates of already-live routes (JS Minifier→`/developer-tools/js-minifier`, Capitalize Text→case-converter, Morse Code Decoder→morse-code-translator, Dog Age to Human Years→dog-age-calculator, CSS Gradient→gradient-generator, Profit Margin→margin-calculator, Unix Timestamp→epoch-converter, Dummy Text→lorem-ipsum-generator, Text Difference→text-diff-tool, Standard Calculator→basic-calculator, HTML Decoder→html-entity-encode-decode).
> - **Phase 4 — Long-Tail SEO Batch: 0/234 — not started.**
> - **Phase 5 — Backlog: 0/737 — not started** (see [`tools-backlog-longtail.md`](./tools-backlog-longtail.md); confirmed no accidental overlap with work done so far).
> - **Total: 274 of the original 1,326 missing tools now shipped — 1,052 remaining.** Site is at **585 live tool pages** (up from 246), per a live route count of `toolRegistry.tsx` (2026-08-29, post-Phase-2).
> - Completion was verified by slug-matching every phase-table tool name against the live `toolRegistry.tsx`, not by trusting build logs alone — this caught and fixed a batch of 17 duplicate/mis-categorized registry entries and 16 fully-built-but-never-routed components left over from a prior work session (2026-08-28), plus 2 build-breaking syntax errors. A second such audit on 2026-08-29 caught: (a) a genuine duplicate pair from the Phase 2 batch — `convert-pdf-to-legal-size`/`convert-pdf-to-letter-size` duplicated the existing `convert-pdf-to-legal`/`convert-pdf-to-letter` tools, which also had a real bug (used `page.setSize()`, which doesn't rescale content); fixed the originals in place with the new tools' correct scale-and-center logic and removed the duplicates; (b) a long-standing, unrelated gap where the hand-maintained `/tools/pdf-tools` hub page (`PdfToolsHub.tsx`) was missing cards for 99 of 165 already-registered PDF tools (they were still discoverable via the homepage category grid and sitemap, just not on that specific hub page) — backfilled all 99.

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
| Phase 4 — Long-Tail SEO Batch | 234 | 0 | 234 | volume 100–1K |
| Phase 5 — Backlog (appendix) | 737 | 0 | 737 | volume < 100 or unresearched |
| **Total missing** | **1,326** | **274** | **1,052** | |

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

## Phase 4 — Long-Tail SEO Batch (234 tools, volume 100–1K/mo)

Bulk-buildable with the standard template; lower individual priority but collectively meaningful traffic and internal-linking surface area.

| Tool Name | Source | Monthly Volume | KD | CPC ($) |
|---|---|---|---|---|
| Budget Planner | Calculator Tools | 880 | 70 | 38.16 |
| Heart Rate Calculator | Calculator Tools | 880 | 48 | 5.72 |
| Power Converter | Calculator Tools | 880 | 35 | 21.94 |
| Sand Calculator | Calculator Tools | 880 | 11 | 0.00 |
| Zodiac Calculator | Calculator Tools | 880 | 57 | 4.77 |
| Bitcoin Mining Calculator | Calculator Tools | 880 | 38 | 11.45 |
| Aquarium Volume Calculator | Calculator Tools | 880 | 19 | 0.00 |
| Sales Tax Calculator | Calculator Tools | 880 | 54 | 0.00 |
| Binary Decoder | Utility Tools | 880 | 32 | 0.00 |
| JSON Tree Viewer | Utility Tools | 880 | 59 | 0.00 |
| Random Color Generator | Utility Tools | 880 | 50 | 0.00 |
| RGB to CMYK Converter | Utility Tools | 880 | 0 | 0.00 |
| Hex to Text | Utility Tools | 880 | 63 | 0.00 |
| CSS Box Shadow Generator | Utility Tools | 880 | 37 | 0.00 |
| Extract URLs | Utility Tools | 880 | 0 | 53.43 |
| Name Picker Wheel | Utility Tools | 880 | 77 | 0.95 |
| Random Country Generator | Utility Tools | 880 | 45 | 0.00 |
| Decimal to Fraction Calculator | Calculator Tools | 720 | 37 | 0.00 |
| Fuel Consumption Calculator | Calculator Tools | 720 | 35 | 0.00 |
| Gear Ratio Calculator | Calculator Tools | 720 | 41 | 0.00 |
| Working Capital Calculator | Calculator Tools | 720 | 0 | 64.87 |
| Wire Size Calculator | Calculator Tools | 720 | 34 | 18.13 |
| Unit Price Calculator | Calculator Tools | 720 | 17 | 0.00 |
| Cost of Living Calculator | Calculator Tools | 720 | 69 | 0.00 |
| EBITDA Calculator | Calculator Tools | 720 | 0 | 30.53 |
| Reverse Text | Utility Tools | 720 | 40 | 0.00 |
| HTML Encoder | Utility Tools | 720 | 0 | 0.00 |
| ROT13 Decoder | Utility Tools | 720 | 57 | 0.00 |
| Random Username Generator | Utility Tools | 720 | 43 | 0.00 |
| CMYK to RGB Converter | Utility Tools | 720 | 0 | 0.00 |
| BBCode to HTML | Utility Tools | 720 | 0 | 0.00 |
| HTML to BBCode | Utility Tools | 720 | 17 | 0.00 |
| Text to Hex | Utility Tools | 720 | 42 | 0.00 |
| Permutation Calculator | Calculator Tools | 590 | 31 | 0.00 |
| Speed Converter | Calculator Tools | 590 | 50 | 0.00 |
| Markup Calculator | Calculator Tools | 590 | 24 | 0.00 |
| Rule of 72 Calculator | Calculator Tools | 590 | 52 | 8.59 |
| Fertilizer Calculator | Calculator Tools | 590 | 23 | 44.84 |
| Reverse Tax Calculator | Calculator Tools | 590 | 23 | 0.00 |
| Torque Calculator | Calculator Tools | 590 | 28 | 0.00 |
| Wavelength Calculator | Calculator Tools | 590 | 30 | 0.00 |
| Battery Charging Time Calculator | Calculator Tools | 590 | 0 | 0.00 |
| Bond Yield Calculator | Calculator Tools | 590 | 29 | 18.13 |
| Reading Time Calculator | Utility Tools | 590 | 44 | 0.00 |
| Text Cleaner | Utility Tools | 590 | 29 | 0.00 |
| ASCII to Text | Utility Tools | 590 | 32 | 0.00 |
| Text to Unicode | Utility Tools | 590 | 0 | 0.00 |
| Unicode to Text | Utility Tools | 590 | 0 | 0.00 |
| XML Pretty Print | Utility Tools | 590 | 41 | 0.00 |
| SQL Validator | Utility Tools | 590 | 24 | 113.53 |
| CSS Filter Generator | Utility Tools | 590 | 14 | 0.00 |
| Extract Numbers | Utility Tools | 590 | 0 | 0.00 |
| Remove Special Characters | Utility Tools | 590 | 24 | 0.00 |
| Merge Text Files | Utility Tools | 590 | 20 | 0.00 |
| Cat Age to Human Years | Utility Tools | 590 | 0 | 0.00 |
| Shoe Size Converter | Utility Tools | 590 | 0 | 0.95 |
| Lucky Number Generator | Utility Tools | 590 | 58 | 0.00 |
| Mode Calculator | Calculator Tools | 480 | 30 | 0.00 |
| Probability Calculator | Calculator Tools | 480 | 43 | 0.00 |
| Gross Profit Calculator | Calculator Tools | 480 | 46 | 0.00 |
| Dividend Yield Calculator | Calculator Tools | 480 | 31 | 0.00 |
| Down Payment Calculator | Calculator Tools | 480 | 73 | 1.91 |
| Flight Time Calculator | Calculator Tools | 480 | 32 | 0.00 |
| LED Resistor Calculator | Calculator Tools | 480 | 36 | 0.95 |
| Linear Regression Calculator | Calculator Tools | 480 | 28 | 0.00 |
| Geometric Mean Calculator | Calculator Tools | 480 | 24 | 0.00 |
| Velocity Calculator | Calculator Tools | 480 | 23 | 0.00 |
| Frequency Calculator | Calculator Tools | 480 | 33 | 0.00 |
| Effective Interest Rate Calculator | Calculator Tools | 480 | 48 | 0.00 |
| Sentence Counter | Utility Tools | 480 | 19 | 0.95 |
| MD5 Hash Generator | Utility Tools | 480 | 29 | 0.00 |
| URL Parser | Utility Tools | 480 | 54 | 0.00 |
| Meta Tag Generator | Utility Tools | 480 | 32 | 61.06 |
| Open Graph Generator | Utility Tools | 480 | 42 | 0.00 |
| EAN-13 Barcode Generator | Utility Tools | 480 | 0 | 9.54 |
| Text to ASCII | Utility Tools | 480 | 41 | 0.00 |
| Regex Cheat Sheet | Utility Tools | 480 | 44 | 0.95 |
| Zalgo Text Generator | Utility Tools | 480 | 25 | 0.00 |
| Anagram Checker | Utility Tools | 480 | 42 | 0.00 |
| Random Animal Generator | Utility Tools | 480 | 26 | 0.00 |
| Lottery Number Generator | Utility Tools | 480 | 57 | 0.00 |
| Bingo Card Generator | Utility Tools | 480 | 61 | 0.00 |
| Countdown Calculator | Calculator Tools | 390 | 75 | 0.00 |
| Trip Cost Calculator | Calculator Tools | 390 | 45 | 13.36 |
| Paint Calculator | Calculator Tools | 390 | 32 | 25.76 |
| Hash Rate Calculator | Calculator Tools | 390 | 67 | 13.36 |
| Paper Weight Calculator | Calculator Tools | 390 | 13 | 0.00 |
| Exam Score Calculator | Calculator Tools | 390 | 29 | 0.00 |
| Cat Age Calculator | Calculator Tools | 390 | 29 | 0.00 |
| Wedding Budget Calculator | Calculator Tools | 390 | 22 | 17.17 |
| CPC Calculator | Calculator Tools | 390 | 27 | 0.00 |
| ROAS Calculator | Calculator Tools | 390 | 0 | 404.51 |
| Payroll Calculator | Calculator Tools | 390 | 59 | 36.25 |
| House Affordability Calculator | Calculator Tools | 390 | 65 | 16.22 |
| Payback Period Calculator | Calculator Tools | 390 | 42 | 0.00 |
| Percent Error Calculator | Calculator Tools | 390 | 34 | 0.00 |
| Work Calculator | Calculator Tools | 390 | 58 | 0.00 |
| Final Grade Calculator | Calculator Tools | 390 | 50 | 0.00 |
| Calories Burned Walking Calculator | Calculator Tools | 390 | 46 | 5.72 |
| Remove Empty Lines | Utility Tools | 390 | 24 | 0.00 |
| Password Hash Generator | Utility Tools | 390 | 45 | 0.00 |
| SHA256 Hash Generator | Utility Tools | 390 | 28 | 0.00 |
| Binary Encoder | Utility Tools | 390 | 25 | 0.00 |
| URL Redirect Checker | Utility Tools | 390 | 48 | 119.25 |
| HEX Color Generator | Utility Tools | 390 | 92 | 0.00 |
| RGB Color Generator | Utility Tools | 390 | 85 | 0.00 |
| TSV to CSV Converter | Utility Tools | 390 | 17 | 0.00 |
| Leap Year Checker | Utility Tools | 390 | 0 | 0.00 |
| Text Divider | Utility Tools | 390 | 0 | 0.00 |
| Team Name Generator | Utility Tools | 390 | 35 | 3.82 |
| Retirement / SIP Calculator | Calculator Tools | 320 | 0 | 20.03 |
| Break-Even Point Calculator | Calculator Tools | 320 | 0 | 0.00 |
| BMR & TDEE Calculator | Calculator Tools | 320 | 0 | 5.72 |
| Energy Converter | Calculator Tools | 320 | 43 | 0.00 |
| Tile Calculator | Calculator Tools | 320 | 31 | 12.40 |
| Flooring Calculator | Calculator Tools | 320 | 16 | 0.00 |
| Internet Speed Calculator | Calculator Tools | 320 | 70 | 0.00 |
| Split Bill Calculator | Calculator Tools | 320 | 19 | 16.22 |
| Cashback Calculator | Calculator Tools | 320 | 0 | 0.00 |
| Current Ratio Calculator | Calculator Tools | 320 | 33 | 0.00 |
| Swimming Pool Volume Calculator | Calculator Tools | 320 | 23 | 0.00 |
| Hourly to Salary Calculator | Calculator Tools | 320 | 0 | 0.00 |
| Salary to Hourly Calculator | Calculator Tools | 320 | 45 | 0.00 |
| Ratio Simplifier | Calculator Tools | 320 | 39 | 0.00 |
| Force Calculator | Calculator Tools | 320 | 25 | 0.00 |
| Wind Load Calculator | Calculator Tools | 320 | 28 | 0.00 |
| Target Heart Rate Calculator | Calculator Tools | 320 | 43 | 0.00 |
| Speaking Time Calculator | Utility Tools | 320 | 32 | 0.00 |
| Remove Duplicate Lines | Utility Tools | 320 | 33 | 0.00 |
| Remove Extra Spaces | Utility Tools | 320 | 24 | 0.00 |
| CSS Animation Generator | Utility Tools | 320 | 38 | 97.31 |
| Truth or Dare Generator | Utility Tools | 320 | 23 | 0.00 |
| EV Charging Cost Calculator | Calculator Tools | 260 | 25 | 0.00 |
| Tire Size Calculator | Calculator Tools | 260 | 57 | 0.00 |
| Gravel Calculator | Calculator Tools | 260 | 18 | 0.00 |
| Risk Reward Calculator | Calculator Tools | 260 | 20 | 0.00 |
| Asphalt Calculator | Calculator Tools | 260 | 18 | 0.00 |
| AC BTU Calculator | Calculator Tools | 260 | 23 | 0.00 |
| Annual Salary Calculator | Calculator Tools | 260 | 50 | 0.00 |
| Customer Lifetime Value Calculator | Calculator Tools | 260 | 0 | 47.70 |
| Pipe Flow Calculator | Calculator Tools | 260 | 20 | 40.07 |
| Weighted Average Calculator | Calculator Tools | 260 | 36 | 0.00 |
| Kinetic Energy Calculator | Calculator Tools | 260 | 34 | 0.00 |
| Bond Price Calculator | Calculator Tools | 260 | 43 | 18.13 |
| Calories Burned Running Calculator | Calculator Tools | 260 | 43 | 4.77 |
| Twitter Card Generator | Utility Tools | 260 | 12 | 0.00 |
| YAML Viewer | Utility Tools | 260 | 36 | 0.00 |
| Word Frequency Counter | Utility Tools | 260 | 23 | 0.00 |
| Alphabetical Sorter | Utility Tools | 260 | 0 | 0.00 |
| Roman Numeral Generator | Utility Tools | 260 | 29 | 0.00 |
| Ethereum Mining Calculator | Calculator Tools | 210 | 57 | 0.00 |
| CPU Bottleneck Calculator | Calculator Tools | 210 | 52 | 0.00 |
| Child Height Predictor | Calculator Tools | 210 | 44 | 249.95 |
| Pace to Speed Calculator | Calculator Tools | 210 | 38 | 0.00 |
| Travel Budget Calculator | Calculator Tools | 210 | 22 | 9.54 |
| Economic Order Quantity Calculator | Calculator Tools | 210 | 35 | 0.00 |
| Inventory Days Calculator | Calculator Tools | 210 | 0 | 0.00 |
| Normal Distribution Calculator | Calculator Tools | 210 | 39 | 1.91 |
| Momentum Calculator | Calculator Tools | 210 | 24 | 0.00 |
| Inductance Calculator | Calculator Tools | 210 | 30 | 0.00 |
| Calories Burned Cycling Calculator | Calculator Tools | 210 | 37 | 0.00 |
| Wall Area Calculator | Calculator Tools | 210 | 21 | 0.00 |
| UUID Validator | Utility Tools | 210 | 22 | 0.00 |
| CSS Clip Path Generator | Utility Tools | 210 | 43 | 0.00 |
| Remove Punctuation | Utility Tools | 210 | 19 | 0.00 |
| Random Emoji Generator | Utility Tools | 210 | 23 | 0.00 |
| Wide Text Generator | Utility Tools | 210 | 29 | 0.00 |
| Birthstone Finder | Utility Tools | 210 | 33 | 5.72 |
| Horsepower Calculator | Calculator Tools | 170 | 19 | 0.00 |
| Pixel Density Calculator | Calculator Tools | 170 | 44 | 0.00 |
| Fixed Deposit Maturity Calculator | Calculator Tools | 170 | 57 | 18.13 |
| Rental ROI Calculator | Calculator Tools | 170 | 21 | 0.00 |
| Baby Growth Calculator | Calculator Tools | 170 | 37 | 247.09 |
| FOV Calculator | Calculator Tools | 170 | 20 | 0.00 |
| Rebar Calculator | Calculator Tools | 170 | 23 | 0.00 |
| Inverter Size Calculator | Calculator Tools | 170 | 12 | 0.00 |
| Mortgage Down Payment Calculator | Calculator Tools | 170 | 0 | 5.72 |
| Weighted Grade Calculator | Calculator Tools | 170 | 38 | 0.00 |
| Confidence Interval Calculator | Calculator Tools | 170 | 39 | 0.00 |
| Correlation Coefficient Calculator | Calculator Tools | 170 | 20 | 0.00 |
| Capacitance Calculator | Calculator Tools | 170 | 22 | 0.00 |
| Fake Profile Generator | Utility Tools | 170 | 66 | 0.00 |
| Store Name Generator | Utility Tools | 170 | 70 | 4.77 |
| Bra Size Converter | Utility Tools | 170 | 31 | 3.82 |
| Excuse Generator | Utility Tools | 170 | 14 | 0.00 |
| Step to Distance Calculator | Calculator Tools | 140 | 0 | 3.82 |
| Net Profit Calculator | Calculator Tools | 140 | 38 | 0.00 |
| Loan Affordability Calculator | Calculator Tools | 140 | 60 | 8.59 |
| Refinance Calculator | Calculator Tools | 140 | 70 | 0.00 |
| Focal Length Calculator | Calculator Tools | 140 | 24 | 0.00 |
| Paver Calculator | Calculator Tools | 140 | 0 | 0.00 |
| Curtain Size Calculator | Calculator Tools | 140 | 22 | 0.00 |
| Financial Independence Calculator | Calculator Tools | 140 | 27 | 11.45 |
| Ceiling Fan Size Calculator | Calculator Tools | 140 | 15 | 0.00 |
| Cash Flow Calculator | Calculator Tools | 140 | 41 | 0.00 |
| Property Appreciation Calculator | Calculator Tools | 140 | 17 | 0.00 |
| Harmonic Mean Calculator | Calculator Tools | 140 | 14 | 0.00 |
| Potential Energy Calculator | Calculator Tools | 140 | 17 | 0.00 |
| Semester Percentage Calculator | Calculator Tools | 140 | 27 | 0.00 |
| Body Frame Size Calculator | Calculator Tools | 140 | 0 | 0.00 |
| CSV Validator | Utility Tools | 140 | 27 | 0.00 |
| CSS Text Shadow Generator | Utility Tools | 140 | 18 | 0.00 |
| Word List Generator | Utility Tools | 140 | 0 | 0.00 |
| Keyword Extractor | Utility Tools | 140 | 0 | 0.00 |
| Text Similarity Checker | Utility Tools | 140 | 36 | 0.00 |
| Random City Generator | Utility Tools | 140 | 47 | 0.00 |
| Upload Time Calculator | Calculator Tools | 110 | 0 | 0.00 |
| Sale Price Calculator | Calculator Tools | 110 | 30 | 0.00 |
| Credit Utilization Calculator | Calculator Tools | 110 | 48 | 0.00 |
| Beam Load Calculator | Calculator Tools | 110 | 32 | 0.00 |
| kWh Cost Calculator | Calculator Tools | 110 | 0 | 0.00 |
| UPS Runtime Calculator | Calculator Tools | 110 | 0 | 0.00 |
| RAM Calculator | Calculator Tools | 110 | 28 | 0.00 |
| Monitor PPI Calculator | Calculator Tools | 110 | 36 | 0.00 |
| Mulch Calculator | Calculator Tools | 110 | 0 | 0.00 |
| Leave Balance Calculator | Calculator Tools | 110 | 24 | 0.00 |
| CPA Calculator | Calculator Tools | 110 | 23 | 0.00 |
| Savings Goal Calculator | Calculator Tools | 110 | 38 | 0.00 |
| Mortgage Affordability Calculator | Calculator Tools | 110 | 64 | 5.72 |
| Room Volume Calculator | Calculator Tools | 110 | 25 | 0.00 |
| Conversion Rate Calculator | Calculator Tools | 110 | 42 | 0.00 |
| Business Valuation Calculator | Calculator Tools | 110 | 33 | 24.80 |
| Scale Factor Calculator | Calculator Tools | 110 | 38 | 0.00 |
| Morse Code Encoder | Utility Tools | 110 | 42 | 0.00 |
| Color Blindness Simulator | Utility Tools | 110 | 0 | 0.00 |
| Code128 Barcode Generator | Utility Tools | 110 | 0 | 98.26 |
| Random Hash Generator | Utility Tools | 110 | 18 | 0.00 |
| CSS Triangle Generator | Utility Tools | 110 | 0 | 0.00 |
| Extract Email Addresses | Utility Tools | 110 | 0 | 0.00 |
| Random Decision Maker | Utility Tools | 110 | 16 | 0.00 |
| WiFi Password QR Generator | Utility Tools | 110 | 32 | 0.95 |
| Calendar Generator | Utility Tools | 110 | 40 | 58.20 |
| Contrast Color Finder | Utility Tools | 110 | 68 | 0.00 |
| Anniversary Countdown | Utility Tools | 110 | 25 | 0.00 |

## Phase 5 — Backlog

737 tools with volume under 100/mo or no keyword-research data at all (mostly very narrow DIY/construction calculators, niche generators, and long-tail utility variants). See [`tools-backlog-longtail.md`](./tools-backlog-longtail.md) for the full list. Recommendation: don't schedule this as a phase — pull from it opportunistically rather than committing engineering time up front.

---

## Already Covered — pre-2026-08-23 baseline (66 tools)

For completeness, these proposed tools already existed on the site *before* Phase 1 work started (see [`existing-tools-inventory.md`](./existing-tools-inventory.md) for their live routes): Mortgage, Compound Interest, BMI, Calorie, Age, Time Zone Converter, Percentage, Scientific Calculator, Prime Number Checker, Random Number Generator, Length/Weight/Temperature/Area/Volume Converters, Aspect Ratio, Password Strength Checker, Password Generator, Tip, Discount, Margin (Forex), Rent vs Buy, VAT, Flatten/HTML-to/CSV-to/Split/Delete-Pages/Organize/Merge/Word-to/Excel-to PDF, GST, Income Tax, Retirement, Word Counter, Text Repeater, Lorem Ipsum Generator, UUID Generator, URL Extractor, User Agent Parser, HTML/CSS Minifier, JSON Formatter, CSV↔JSON, SQL Formatter, Regex Tester, Random String Generator, QR Code Generator, Barcode Generator, Markdown to HTML, Binary↔Text, XML↔JSON, CSS Grid Generator, Duplicate Word Finder, Coin Flip, Roman Numeral Converter, Number to Words, Morse Code Translator, Palindrome Checker, Acronym Generator, Business Name Generator, Vertical Text Generator.

## Built since (2026-08-28 status) — 222 tools

The 49 Phase 1 tools, 104 Phase 2 PDF tools, and 149 Phase 3 mid-volume tools are now live — see the phase sections above for exactly which, and run a route count on `toolRegistry.tsx` for the full current route list (542 tools as of the Phase 3 completion). A few pre-existing Health/PDF tools were also added outside this roadmap's phase tables during the same work (Period Calculator, Calorie Deficit Calculator, Macro Calculator, Weight Gain Calculator, Water Intake Calculator, and several PDF page-manipulation tools like Resize & Rescale PDF, Reverse PDF Pages, Signature Maker) — these came from a separate live-keyword-research pass (see `keyword-targeting-plan.md`), not from this spreadsheet-derived list, so they aren't reflected in the phase completion counts above.
