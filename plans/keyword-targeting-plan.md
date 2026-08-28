# ToolZoneX - Keyword Targeting Plan

## Source
OpenSEO research against `toolzonex.com` (2026-08-26): domain overview, ranked-keyword export (70 keywords), Search Console opportunity join, and `research_keywords` seeds (`paycheck calculator`, `body fat calculator`, `css minifier`, `merge pdf`, `gpa calculator`). Market = India (project default, matches GSC `gl=IN` traffic). Re-run these queries before acting on stale numbers.

## Current State
- **75** est. monthly organic visits, **70** ranked keywords total.
- Nearly all rankings sit at position 46–109 (page 5+) — pages are topically relevant to Google already, they just lack the authority/depth to break into page 1. This is a strengthening problem, not a retargeting problem.
- Search Console (last 28 days) shows only 14 pages with any impressions, all in single/low-double digits — confirms the site is still pre-traction.

---

## Phase 1: Quick Wins — Push Existing Rankings to Page 1

These keywords already rank position 46–65. Strengthening the existing page (more supporting content, FAQ depth, internal links) is the fastest available traffic lever — no new pages required.

| Page | Keyword | Volume | Current Rank |
|---|---|---|---|
| [health/body-fat-calculator](https://toolzonex.com/health/body-fat-calculator) | body fat us navy calculator | 590 | 46 |
| | body fat percentage navy calculator | 590 | 49 |
| | body fat percentage calculator navy | 590 | 54 |
| | fat percentage calculator navy | 590 | 58 |
| [tools/js-minifier](https://toolzonex.com/tools/js-minifier) | online js minifier | 480 | 54 |
| | minifier js online | 480 | 61 |
| | online javascript minifier | 480 | 61 |
| [blog/tools/bmr-calculator](https://toolzonex.com/blog/tools/bmr-calculator) | mifflin st jeor calculator | 480 | 62 |
| | mifflin-st jeor calculator | 480 | 64 |
| [utilities/basic-calculator](https://toolzonex.com/utilities/basic-calculator) | basic calculator online | 480 | 57 |
| [utilities/roman-numeral-converter](https://toolzonex.com/utilities/roman-numeral-converter) | numerals to roman numerals converter | 590 | 64 |
| [tools/user-agent-parser](https://toolzonex.com/tools/user-agent-parser) | parser user agent | 590 | 60 |

**Action**: prioritize content depth and internal linking on these 5 pages before spending effort on new tools.

---

## Phase 2: High-Value White Space (New/Expanded Targets)

### BMR calculator — top priority
The page exists but only ranks for long-tail Mifflin-St Jeor phrasing, not the head term.
- `bmr calculator` — **110,000 vol, KD 25** (huge volume, low difficulty — best single opportunity found)
- `bmr calculator to lose weight` — 1,300 vol, KD 23
- `tdee bmr calculator` — 320 vol, KD 16

**Action**: retarget page title/H1/meta directly at "BMR Calculator," expand FAQ content, cross-link from body-fat and TDEE calculator pages.

### Body fat percentage calculator
- `body fat percentage calculator` — 22,200 vol, KD 26 (currently ranking only for navy-method long-tail, not this head term)
- `body fat percentage` — 22,200 vol, KD 51
- `how to reduce body fat percentage` — 1,900 vol, KD 23

### GPA / CGPA calculator (pairs with the newly-shipped SGPA calculator)
- `gpa calculator` — 18,100 vol, KD 26
- `gpa calculator vit` — 18,100 vol, **KD 0** (VIT is a major Indian university; near-zero competition)
- `percentage to gpa calculator` — 1,300 vol, KD 5
- `gpa calculator from percentage` — 880 vol, KD 9
- `cumulative gpa calculator` — 1,300 vol, KD 30
- `how to calculate gpa from percentage` — 1,300 vol, KD 0

**Action**: build a GPA/CGPA calculator with percentage↔GPA conversion, using Indian university conventions (VIT, semester GPA, 10-point and 4.0 scales) in copy and headings.

### Minifier → Beautifier cluster (cheap to add, reuses existing minifier engine)
- `html beautifier` — 9,900 vol, KD 9
- `js beautifier` — 3,600 vol, KD 25
- `css beautifier` — 2,400 vol, KD 23
- `css minifier` — 2,400 vol, KD 18 (no dedicated page yet, only js-minifier exists)
- `html minifier` — 2,900 vol, KD 28
- `unminify js` — 1,600 vol, KD 10
- `unminify css` — 880 vol, KD 10
- `unminify html` — 590 vol, KD 11

**Action**: ship CSS minifier, HTML minifier, and JS/CSS/HTML beautifier as sibling tools to the existing JS minifier — near-zero build cost if the minify/format logic is reusable, and this whole cluster is low competition.

### PDF tools (ties to the newly-shipped PDF Editor)
Head terms are dominated by iLovePDF/Smallpdf and too competitive to chase directly:
- `merge pdf` — 3.35M vol, KD 53; `compress pdf` — 2.74M vol, KD 56

India search behavior skews toward **size-specific** and **brand-alternative** long-tail, which is much easier:
- `compress pdf to 200kb` — 201,000 vol, KD 20
- `organize pdf` — 90,500 vol, KD 15
- `split pdf online` — 110,000 vol, KD 23
- `compress pdf to 1mb` — 49,500 vol, KD 5
- `compress pdf to 300kb` — 40,500 vol, KD 5
- `11zon compress pdf` / `11zon merge pdf` / `pdf merge 11zon` — 5,400–49,500 vol, KD 8–19 (branded searches for a competing India-focused free tool — comparison/alternative-angle content could capture this)

**Action**: instead of one generic merge/compress PDF page, build dedicated landing pages per target file size ("Compress PDF to 200KB," "to 1MB," "to 500KB") — that's how the low-KD long-tail is actually structured in this market.

---

## Suggested Priority Order
1. Strengthen the 5 near-page-1 pages in Phase 1 (fastest ROI, no new build).
2. Retarget the BMR calculator page at the `bmr calculator` head term (110k vol @ KD 25 — biggest single opportunity).
3. ✅ **Done (2026-08-28, via `tools-gap-analysis-roadmap.md` Phase 3):** GPA (`/utilities/gpa-calculator`) and CGPA (`/utilities/cgpa-calculator`) calculators shipped alongside the existing SGPA calculator. Indian-university phrasing (VIT, percentage↔GPA) not yet specifically targeted in their copy — worth a follow-up pass if this is still a priority.
4. ✅ **Mostly done (2026-08-28):** CSS Beautifier, CSS Minifier, and HTML Beautifier shipped (`/developer-tools/css-beautifier`, `/developer-tools/css-minifier`, `/developer-tools/html-beautifier`); HTML/JS Minifier already existed. Still missing: a standalone JS Beautifier and the `unminify js/css/html` framing.
5. Split the PDF tool into size-specific compress/merge/split landing pages rather than one generic page — not done; `/tools/compress-pdf` shipped as one generic page (Phase 1), not size-specific variants.

## Phase 3: Category-Wide Gap Sweep (in progress, started 2026-08-26)

Broader research pass beyond the original 5 seeds — running `research_keywords` in batches of ~4-5 seeds per tool category (Health, Generators, AI Tools, Developer Tools, Converters, Text Tools), reviewing each batch before continuing. This section is updated after each batch.

### Batch 1 — Health (seeds: `bmr calculator`, `calorie calculator`, `pregnancy due date calculator`, `water intake calculator`)

Cross-checked against the 8 existing Health tools (BMI, BMR, Body Fat, CFT, Calorie, PFT, Sleep Time, TDEE calculators).

**Major finding: pregnancy/reproductive calculators — zero tools exist on the site**, despite very high volume:

| Keyword | Volume | KD |
|---|---|---|
| pregnancy calculator | 368,000 | 35 |
| period calculator | 74,000 | 3 |
| due date calculator | 49,500 | 40 |
| pregnancy due date calculator | 33,100 | 48 |
| pregnancy week calculator by LMP | 27,100 | 26 |
| pregnancy month calculator by week | 12,100 | 36 |
| how to calculate pregnancy weeks | 12,100 | 54 |
| conception date calculator | 2,900 | 35 |

`period calculator` is the standout: 74K volume at KD 3 — almost no competition for that much demand. This is a whole missing category, not a single missing page — worth an "Health > Pregnancy & Cycle" cluster (due date, period/cycle tracker, conception date, week-by-week) since the calculators share inputs (LMP date) and can cross-link.

**Secondary gaps** — site has general Calorie/BMR/TDEE tools, but not these specific angles:

| Keyword | Volume | KD | Gap |
|---|---|---|---|
| maintenance calories calculator | 33,100 | 50 | no dedicated page |
| calorie deficit calculator | 22,200 | 51 | no dedicated page |
| macro calculator | 5,400 | 10 | no protein/carb/fat macro tool at all |
| weight gain calculator | 5,400 | 19 | existing calorie calc is weight-loss framed only |
| water intake calculator | 5,400 (trending to 14,800) | 4 | near-zero competition, cheap build |

**Confirms existing pages are worth strengthening** (from Phase 1) — their seed volumes are large: BMI 1.5M, Calorie 450K, BMR 110K, TDEE 90.5K.

### Batch 1 gaps — built 2026-08-26

Cross-checking against the *live* site (not the stale Aug 23 inventory doc) showed Pregnancy Due Date and Ovulation calculators had already shipped since that doc was written. The real remaining gaps were built as 5 new tools, each with its own SEO metadata, FAQs, and Guide/Example/Use-Case content per the [[project_seo_content_structure]] template:

| Tool | Route | Target keyword(s) |
|---|---|---|
| Period Calculator | `/health/period-calculator` | period calculator (74K vol, KD 3) |
| Calorie Deficit Calculator | `/health/calorie-deficit-calculator` | calorie deficit calculator (22.2K), maintenance calories calculator (33.1K) |
| Macro Calculator | `/health/macro-calculator` | macro calculator (5.4K, KD 10) |
| Weight Gain Calculator | `/health/weight-gain-calculator` | weight gain calculator (5.4K, KD 19) |
| Water Intake Calculator | `/health/water-intake-calculator` | water intake calculator (5.4K, trending to 14.8K, KD 4) |

Also backfilled missing `tool-blogs.handwritten.ts` entries for `pregnancy-due-date-calculator`, `ovulation-calculator`, and `body-fat-percentage-calculator`, which existed as pages but had zero blog content — a gap the [[project_seo_content_structure]] discoverability checklist flags as easy to miss.

Verified: `tsc --noEmit` clean, `node scripts/audit-content-structure.mjs` shows all 5 new pages passing (Guide+FAQ+Examples+Use Cases), and `npm run build` statically exports all 5 routes successfully.

**Not built:** a dedicated "maintenance calories calculator" page — folded into the Calorie Deficit Calculator's keyword targeting instead, since TDEE and maintenance calories are the same figure and a separate near-duplicate page would cannibalize rather than help.

### Batch 2+ (Generators, AI Tools, Developer Tools, Converters, Text Tools) — blocked on OpenSEO credits

Batch 2 (`password generator`, `qr code generator`, `invoice generator`, `random name generator`) failed with `INSUFFICIENT_CREDITS`. Resume once credits are topped up at the project's OpenSEO dashboard.

---

## Notes for Next Review
- Re-pull `get_domain_overview` and `get_ranked_keywords` after Phase 1 changes land to confirm rank movement.
- Volumes above are India-market only (location code 2356); do not assume they transfer to a US/global push without re-running research for that market.
- `research_keywords` results were capped at the default 150-per-seed limit — a deeper pull (`resultLimit: 300` or `500`) could surface more long-tail if these clusters prove out.
