# Traffic Recovery — September 2026

Written 2026-09-26 from the Search Console export covering the last 6 months (data through 2026-09-23). Follows the 2026-09-12 index cleanup (`6f1b6fa`, `6519a1a`).

## What the data says

| Period | Impressions/day | Avg position | Clicks/day |
|---|---|---|---|
| Aug 10 – Sep 1 | 1,000 – 5,000 | 62 – 74 | ~2 |
| Aug 27 – 28 | 6 – 13 | — | 0 |
| Sep 2 – Sep 23 | 0 – 12 | — | ~0 |

- Before the drop the site was **being tested, not ranking**: 43.7K impressions, 37 clicks in total, almost all at position 60–90. Desktop (39.6K impressions) averaged position 71; mobile averaged 40.
- The one page that genuinely ranked was `/utilities/tip-screen` ("tip screen", position ~8, 790 impressions).
- **Timing:** the Sep 2 collapse lines up with an *unconfirmed* Google ranking update dated ~Sep 2 (Marie Haynes) / Sep 3–4 (Glenn Gabe). Some affected sites bounced back on Sep 13; this one didn't.
- **Ruled out** (see `6f1b6fa`): manual action, deindexing, robots/noindex mistakes, the Cloudflare move (Sep 12, after the drop), and the August 2026 spam update (Aug 18–21; traffic grew after it).
- **Most plausible cause:** a site-level quality classification. A four-month-old domain with no links went from 173 pages to 1,399 in six weeks, all built on one template (and another ~550 tools shipped Sep 4–8, after the drop).
- **Live risk:** Google's September 2026 spam update began Sep 24 and can take up to two weeks (to ~Oct 8). The faster Google processes the noindex cleanup, the better.

### The only cluster with real traction: screens and pranks

| Query | Position |
|---|---|
| tip screen full screen | 2 |
| windows 10 fake update blue screen | 6.2 |
| fake error screen windows 11 | 7.2 |
| add a tip screen | 7.0 |
| tip screen | 8.1 |
| fake blue screen windows 11 | 14.8 |
| blue screen error prank | 16.5 (2/2 clicks) |

Pages: tip-screen 9.3, broken-screen 24 (13% CTR), windows-11-blue-screen 33, windows-10-update-screen 35, windows-10-blue-screen 49. Everything else on the site sits at 60+. This niche (the colorscreen.co / whitescreen.online / pranx.com space) has real demand and competition a small site can beat.

## Changes shipped 2026-09-26

1. **robots.txt stopped blocking `/_next/`.** It had been there since 2026-05-02. Every page's CSS and JS lives under `/_next/static/`, so Googlebot rendered every tool unstyled and non-functional. Google explicitly warns against this.
2. **Real 301s for the 84 legacy `/tools/*` and `/calculators/*` URLs.** Generated at build time as `out/_redirects` from `src/data/legacy-redirects.ts` (`scripts/generate-redirects.mjs`). Before this they were meta-refresh stubs, and both URLs were collecting impressions (e.g. crossword generator: 151 on `/tools/`, 171 on `/generators/`).
3. **`sitemap-cleanup.xml`** lists every noindexed or redirected URL (~1,600) with a fresh lastmod, and robots.txt references it, so Googlebot recrawls those URLs and acts on the noindex/301 soon rather than eventually. **Remove it** (the block in `scripts/generate-sitemap.mjs` and its robots line) once the GSC Pages report shows them excluded.
4. **All 262 `/blog/tools/` guides are noindexed.** The 8 kept on Sep 12 ranked 65–94, and either split queries with their own tool page or stood in for a noindexed one. **Four tools were reindexed** in their place: `/tools/what-is-my-ip`, `/converters/hex-to-rgb`, `/tools/image-color-picker`, `/finance/capital-gains-tax-calculator`.
5. **Screen cluster:** reindexed `/utilities/windows-10-update-screen`, `/utilities/windows-11-update-screen`, `/utilities/black-screen` (its guide ranked #8) and `/utilities/dvd-screensaver`, all of which have position data. Black Screen got its own content instead of the shared color template. Tip Screen was added to the `/utilities/screen-test` hub, which had been missing the site's best page.
6. **Related-tools links now follow the nav category and list indexed pages first.** Every screen page used to show the same six links (Age, Percentage, Date, Margin, Discount and Tip calculators), because the shell category "Utilities" doesn't contain the screens. Screens now link to screens, and paycheck calculators to paycheck calculators.
7. The registry `noindex` flag on the 3 hubs (`pdf-tools`, `screen-test`, `paycheck-calculator`) never took effect, because their pages use hand-written metadata. The flag was removed so the data matches reality.
8. The AI Pomodoro `/dashboard` and `/settings` sub-pages are now noindexed.

## Checklist — needs Search Console (only you can do these)

- [ ] After deploy: **Sitemaps** → submit `https://toolzonex.com/sitemap-cleanup.xml` and resubmit `sitemap.xml`.
- [ ] **URL Inspection → Test live URL** on `/utilities/tip-screen` → *View tested page → Screenshot*. It should now render styled. This confirms the `/_next/` unblock worked.
- [ ] **Request indexing** (about 10 a day allowed) for: `/utilities/tip-screen`, `/utilities/screen-test`, `/utilities/windows-10-update-screen`, `/utilities/windows-11-update-screen`, `/utilities/windows-10-blue-screen`, `/utilities/windows-11-blue-screen`, `/utilities/broken-screen`, `/utilities/black-screen`, `/utilities/dvd-screensaver`, `/`.
- [ ] Re-check **Security & Manual actions** (should still be empty).

## Rules until impressions come back

- **No new tool pages.** Every page added reinforces the "scaled content" pattern. Improve the indexed ones instead, starting with the screen cluster.
- **Don't keep flipping indexing.** Give each change 4+ weeks. Churn looks like more manipulation, not less.
- **Earn a few real mentions** for the screen tools. They're shareable (office pranks, tip-screen memes). A handful of genuine links or posts beats any on-page tweak for a domain with no links.

## When to look again

- **~Oct 10** (after the spam update finishes): GSC Performance for the screen pages. Pages report: "Excluded by noindex" should be climbing toward ~1,500, and indexed pages should settle near ~170.
- **~Oct 24:** if the Pages report shows the cleanup processed, remove `sitemap-cleanup.xml`.
- **The next core update** is the realistic point for a site-level reassessment. Recoveries from this kind of demotion are usually measured in months, not days.
