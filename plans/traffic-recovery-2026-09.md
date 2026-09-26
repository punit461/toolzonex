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

## Update 2026-09-26 (later): Bing and Cloudflare data, second batch

### What the data says

- **Real visitors: about 5–15 a day, none from Google.** From Cloudflare Web Analytics, which only has data since the Sep 12 move and samples roughly 1 in 10 beacons. Of the 1–4K HTML hits a day in zone analytics, about 98% are bots and vulnerability scanners. Real people mostly land on niche PDF tools (ink saver, black-and-white converter, color inverter, add border) and the screen pranks.
- **Bing keyword report:** 94 impressions and 7 clicks in total. Tip screen is the strongest query here too (five variants around position 8). Five of the seven clicks were **branded** ("toolzonex pdf split", "toolzonex password generator", "toolzonex gratuity calculator"), meaning returning users searching for a specific tool. There is also a long tail at positions 3–7: salary increment with arrears and multi-year hike questions, extract PDF comments, and PDF font viewer.
- **Most of those pages were noindexed on Sep 12.** Bing obeys `noindex` too, which fits Bing dropping to zero after the cleanup.

### Changes

1. **Google-only noindex for 15 pages** (registry flag `bingIndexable`): the robots meta says `index` and the googlebot meta says `noindex`. Google's view doesn't change, so this doesn't break the no-churn rule. Bing, DuckDuckGo, Yahoo and ChatGPT search get the pages back. The pages are the ones with Bing demand or real-user evidence: salary-increment and gratuity calculators; add-pdf-border, pdf-comment-extractor, pdf-font-viewer, pdf-ink-saver, pdf-black-and-white-converter, pdf-color-inverter, remove-header-footer; multiplication-table and random-number generators; text-case-mixer, leetspeak-converter, unicode-to-text, base64-to-image. They are listed in `sitemap-bing.xml`, which is deliberately left out of robots.txt.
2. **IndexNow:** key file `public/b5b3116b5469ea3e0b2e1699186d5f41.txt` plus `npm run indexnow`. After a deploy, it submits sitemap.xml and sitemap-bing.xml, or just the paths you pass it.
3. **Tip screen upgrade:**
   - Presets: Restaurant, Coffee Shop, Joke.
   - Currency selector.
   - The buttons now work: a tap shows the total and a thank-you screen, which then resets.
   - Custom Tip entry.
   - Joke mode, where "No Tip" guilt-trips the tapper, and the No Tip button can be hidden.
   - A tip-etiquette section.
   - The title, URL and H1 are unchanged.
4. **Salary increment calculator:**
   - An arrears calculation and a year-by-year projection with a running total, answering the Bing queries.
   - The title no longer promises take-home salary, which the tool never calculated.
5. **Privacy claims fixed ahead of any launch:**
   - Add QR to PDF now generates the QR code locally with qr-code-styling, instead of calling api.qrserver.com.
   - Translate PDF's upload box now says the extracted text goes to the translation service.

6. **Fullscreen on iPhone:** Safari there only lets `<video>` go fullscreen, so on phones the screen tools' fullscreen button did nothing. The shared `useFullscreen` hook now falls back to pinning the screen over the viewport. A back swipe or Esc exits.
7. **Windows update and blue-screen pranks (the cluster with Google positions):**
   - Added:
     - the real five-dot Windows spinner
     - an update percentage that creeps and never loops (it used to race 0→100 in 12 seconds)
     - a blue screen that counts up, with its QR code
     - a stop-code picker
     - for Windows 11, a choice between the classic blue screen and the 2025 black one
   - The cursor is hidden in fullscreen.
   - Fixed the blue-screen FAQ, which described the update screen, and cross-linked the paired pages.

### Checklist

- [x] Search Console tasks and the Bing sitemap submission. Confirmed in zone logs: Google-InspectionTool fetched all nine screen pages plus 656 assets, and Bingbot fetched the key file and sitemap-bing.xml.
- [ ] After deploy: `npm run indexnow`.
- [ ] Bing Webmaster → Sitemaps: submit `https://toolzonex.com/sitemap-bing.xml`.
- [ ] Bing Webmaster → Search Performance: in 1–2 weeks, check impressions for the 15 pages.
- [ ] One genuine launch, pitched on something specific rather than the whole catalog:
  - Show HN or r/InternetIsBeautiful for "PDF tools that run in your browser"
  - an AlternativeTo listing next to iLovePDF and Smallpdf
  - a short clip of the tip-screen joke mode or the fake-update prank

### Late-October index review (after the 4-week wait)

- Consider opening the niche PDF tools and the salary calculator to Google as well, if Bing shows them earning clicks.
- Reconsider the head-term PDF pages that are indexed now (compress, merge, split, pdf-to-word). A new domain has no realistic path to page 1 against iLovePDF, Smallpdf and Adobe, while the niche tools have little competition and real users.
