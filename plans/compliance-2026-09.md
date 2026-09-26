# Legal & Accessibility Compliance — September 2026

Written 2026-09-26 after a compliance pass on toolzonex.com. This is not legal advice. It records what was checked, what changed in code, and what only the owner can do.

## What the site actually does with data (verified in code)

| Where | What leaves the browser | To whom |
|---|---|---|
| Contact form | email, message, optional name/subject, timestamp | Google Apps Script → Google Sheet; notification → punit@toolzonex.com (Microsoft 365) |
| Every page | IP, browser details, ad cookies | Google AdSense (Auto Ads) — not on `/utilities/alphabet-learning-tool` |
| Every page | page, referrer, browser, country (no cookies) | Cloudflare Web Analytics; Cloudflare hosting/security |
| Currency converters | chosen currencies (not amounts) | api.frankfurter.dev |
| What Is My IP | IP, on page load | ipapi.co / api.ipify.org |
| Translate PDF | the PDF's extracted text | api.mymemory.translated.net |
| Font Library | font requests | Google Fonts |
| Face Shape Detector, AI Pomodoro | model downloads only (photos/camera stay local) | jsDelivr, Google Cloud Storage |
| ~11 PDF tools | pdf.js worker download (PDF stays local) | cdnjs |

Browser storage (first-party, stays on device): `toolzonex-color-mode`, `calcbharat_notepad`, `ai-pomodoro-settings` (localStorage), `ai-pomodoro-db` (IndexedDB). The site sets no cookies of its own. Google Analytics code exists but is **not enabled** in production.

## Shipped (commits fdf7569 … 459f9ed)

- **Legal pages**:
  - `/privacy-policy`, `/terms-of-service` (Terms and Conditions), `/cookie-policy` and `/refund-policy`, on a shared `LegalPage` shell.
  - Operator details in `src/data/siteInfo.ts`: `LEGAL_EFFECTIVE_DATE`, `CONTACT_EMAIL` and others. Bump the date whenever a policy changes in substance.
- **Contact form**:
  - Unticked consent checkbox and a notice at the point of collection.
  - Name is optional.
  - Uses native validation instead of a permanently disabled button.
- **Consent plumbing**:
  - `googlefc` callback queue for the published AdSense *European regulations* message.
  - "Privacy and cookie settings" button on `/cookie-policy`.
  - GA4 consent defaults (denied in EEA/UK/CH) in case GA is ever enabled.
  - AdSense is not loaded on child-directed pages (`src/data/adFreeRoutes.ts`).
- **Accessibility** (axe-core over 266 live pages before the changes):
  - 948 aria-labels via `scripts/a11y-label-codemod.mjs`.
  - Theme: heading mapping, contrast, focus ring, input borders.
  - Breadcrumb and header keyboard support, skip link.
  - 31 mouse-only controls made keyboard-operable (`ui/keyboardClickable`).
  - Contrast fixes on the screen tools, BMI, Percentage and hash tools.
- **Claims**:
  - About, FAQ, homepage and meta: no "every tool is accurate", no "nothing ever leaves the browser", and the real tool count.
  - GST calculator updated to the 22 Sep 2025 slabs.
- **Risky tools**:
  - Redact PDF: "visual cover only" warning.
  - Remove Restrictions and watermark remover: authorisation notice.
  - What Is My IP: third-party disclosure.
  - Windows pranks: Microsoft trademark note.
  - Finance and Health pages: "estimate, not advice" note.
- **IP**:
  - Unlicensed broken-screen photos replaced with generated art.
  - DVD logo replaced with text.
  - `LICENSE` added: MIT for code, with brand and editorial content reserved.
- **Third parties**:
  - AI Pomodoro no longer loads Google Fonts.
  - MediaPipe pinned to 1.0.1 (was `@latest`).

## Owner checklist (only you can do these)

- [ ] **Apps Script:**
  1. Paste `contact-sheet.gs` into the Apps Script editor and deploy a new version. It now notifies `punit@toolzonex.com` and includes `purgeOldContacts()`.
  2. Add a daily time-driven trigger for `purgeOldContacts` (Privacy Policy promises deletion after 12 months).
  3. Delete old contact notification emails from both Gmail inboxes, and set up the same 12-month clean-up for `punit@toolzonex.com`.
- [ ] **AdSense → Auto ads → page exclusions:** add `toolzonex.com/utilities/alphabet-learning-tool`. That covers visitors who arrive there from another page, where the ad script had already loaded.
- [ ] **AdSense → Privacy & messaging** (optional): publish a **US state regulations** message too. It adds a "Do not sell or share" link for the US states that require one.
- [ ] **Cloudflare Turnstile** (spam): create a site key, set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in the Cloudflare Pages env, and put the secret in the Apps Script's Script Properties as `TURNSTILE_SECRET`. Right now anyone can POST to the Apps Script URL.
- [ ] **Confirm** the jurisdiction (courts at Bengaluru) and that you're happy to be named as grievance officer. Both are in the Terms and Privacy Policy.
- [ ] **Respond** to privacy or grievance emails within 30 days, which is what the policy promises. DPDP allows up to 90 days, GDPR one month.
- [ ] **Git history** (optional): the removed broken-screen photos and DVD logo are still in the public repo's history. Purging them needs `git filter-repo` and a force-push, which rewrites history for every clone. It's only worth doing if a rights holder complains.
- [ ] **Google account security:** turn on 2-step verification for the Google and Microsoft accounts that hold contact messages.

## Timeline to watch

- **DPDP Act** substantive obligations (notice, consent, children, rights, breach reporting) apply from **14 May 2027**; an acceleration to Nov 2026 was proposed for Significant Data Fiduciaries only. Before then:
  - Check whether Google's consent tool (or another certified CMP) can show an India consent message. Ad tracking isn't a DPDP "legitimate use", so Indian visitors will need a consent choice.
  - Re-read the notice requirements in Rule 3 against the Privacy Policy.
- **Income Tax Act, 2025** is in force from 1 April 2026. The income tax calculator is still labelled FY 2025-26 and cites 1961-Act section numbers (e.g. 87A); slabs are unchanged for 2026-27.

## Known residual issues

- 4 upload buttons use MUI's `component="label"` pattern. They're keyboard-operable, but axe flags the role (minor).
- Image Color Picker's click-to-pick on the canvas is mouse/touch only.
- `scripts/a11y-label-codemod.mjs` covers the common patterns; run it after adding tools (`node scripts/a11y-label-codemod.mjs`) to see new unlabelled controls.
