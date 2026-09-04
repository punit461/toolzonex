# Phase 5 Incremental Execution Plan

## Why this doc exists

`tools-backlog-longtail.md` explicitly recommends against building its ~707 remaining tools wholesale. Prior sessions picked from it in a couple of larger opportunistic batches (25-30 tools each, built and shipped in one go). Per the user's request (2026-09), this replaces that approach with **smaller increments, one batch reviewed and committed before starting the next**, rather than chaining many large batches in a single sitting.

## Method

- `tools-backlog-longtail.md` is already sorted by monthly volume descending, then unresearched entries at the bottom — work through it **top to bottom, in batches of ~15 tools**, rather than re-sorting thematically. This keeps each batch's tools roughly similar in value and keeps the method mechanical/repeatable rather than requiring fresh curation every time.
- Each batch: pick the next ~15 rows off the top of `tools-backlog-longtail.md`, build them via the site's standard 3-file pattern (same as every prior phase), verify (`tsc` + `npm run build` + the duplicate/orphan audit script), remove the built rows from `tools-backlog-longtail.md`, update `existing-tools-inventory.md`'s count, commit and push, **then stop and report back** rather than immediately starting the next batch.
- ~707 tools ÷ ~15/batch ≈ 47 batches total at this pace. This doc's Progress Log tracks how many have actually shipped — it is not a pre-written schedule of all 47 batches' exact contents, since curating that far in advance isn't useful (the next batch is always just "the next ~15 rows in the file").
- Near-duplicates of already-live tools are expected to keep showing up (as they have in every phase so far) — same standing policy: build as a separate, genuinely differentiated page targeting the distinct keyword, not skipped, per the user's earlier explicit decision on this (see `tools-gap-analysis-roadmap.md`'s Source & Methodology section).

## Progress Log

| Batch | Tools | Status |
|---|---|---|
| 1 | Roofing, Exposure, Cable Length, Sound Delay, CSS Border Radius, Bubble Text, Daily Fiber, Cooking Time, Marathon Time Predictor, Freelancer Hourly Rate, Email Marketing ROI, Daily Wage Calculators/Generators (12 built) — WiFi QR, Freelancer Tax, and Weekly Salary skipped as already fully covered by existing tools | done (2026-09) |
| 2 | Real Rate of Return, Mortgage Recast, Profit Per Unit, AC Running Cost, Freight Cost, Cost Per Lead, Fuel Savings, Air Purifier Size, LED Wattage, Pallet Load, Compost, Irrigation, Classroom Capacity Calculators (13 built) — Cost Per Unit and Current Yield skipped as already fully covered by Unit Price Calculator and Bond Yield Calculator respectively | done (2026-09) |
| 3 | Room Perimeter, Stair Stringer, Appliance Wattage, Trim Text, SHA1 Hash Generator, Canonical URL Generator, CURL Command Generator, Longest Word Finder, Time Zone Finder, Name Splitter, Random Language/Fruit Generators, Would You Rather Generator (13 built) — Text to URL Encode and Character Frequency Counter skipped as already fully covered by URL Encoder and Character Distribution Analyzer respectively | done (2026-09) |
| 4 | Compliment Generator, Daily Carb/Fat Intake Calculators, Storage Converter, Inventory Turnover, Debt to Equity, Lease vs Buy, Credit Score Estimator, College Savings, Social Media ROI, Column Load, Depth of Field, Banner Size, Pizza Size, School Grade Calculators (15 built), plus Gaming Sensitivity Calculator (built separately after being dropped from the batch-4 prompt by mistake — caught during doc cleanup) | done (2026-09) |

(Rows get appended here as each batch ships, each with a done/pending status — this table is the running record of what's actually been built from Phase 5 incrementally, separate from the two earlier larger opportunistic batches already reflected in `existing-tools-inventory.md`.)
