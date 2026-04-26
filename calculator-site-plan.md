# Calculator Tools Site — Full Build Plan
> India-focused Finance + Health Calculators | AdSense Ready | Static Site (GitHub Pages)

---

## 🎯 Strategy Summary

**Niche**: Indian Personal Finance + Health calculators (dual niche = higher RPM, coherent topical authority)  
**Stack**: React + Vite → static build → GitHub Pages + custom domain  
**Goal**: 20–30 well-built tool pages + blog articles → AdSense approval → organic traffic growth  
**Timeline**: ~3–4 months to AdSense-ready, 6–12 months to meaningful traffic

---

## 📋 Top 10 Tools to Build (Priority Order)

| # | Tool | Niche | Why It's High Priority |
|---|------|-------|------------------------|
| 1 | **EMI Calculator** | Finance | Massive Indian search volume — home/car/personal loan |
| 2 | **SIP Calculator** | Finance | #1 traffic driver in India per Ahrefs research |
| 3 | **GST Calculator** | Finance | India-specific, evergreen, searched daily by businesses |
| 4 | **Income Tax Calculator** | Finance | Old vs New regime — extremely high intent every year |
| 5 | **PPF / FD / RD Calculator** | Finance | Stable, long-tail keywords, low competition |
| 6 | **BMI Calculator** | Health | Huge volume, India-specific categories differentiate |
| 7 | **TDEE / Calorie Calculator** | Health | Fitness trend, high RPM health niche |
| 8 | **BMR Calculator** | Health | Goes with BMI/TDEE, builds topical cluster |
| 9 | **Rent vs Buy Calculator** | Finance | Proven viral potential, high backlink acquisition |
| 10 | **Age Calculator** | Utility | Simple, extremely high search volume globally |

---

## 🗂️ Site Architecture

```
/ (Home)                        → Showcases all categories
/calculators/emi-calculator     → EMI tool + full content
/calculators/sip-calculator     → SIP tool + full content
/calculators/gst-calculator
/calculators/income-tax-calculator
/calculators/ppf-calculator
/calculators/fd-calculator
/calculators/bmi-calculator
/calculators/tdee-calculator
/calculators/bmr-calculator
/calculators/rent-vs-buy-calculator
/calculators/age-calculator
/blog/                          → 5–10 supporting articles
/about
/contact
/privacy-policy
/terms-of-service
```

---

## 🛠️ Phase-by-Phase Plan

---

### Phase 1 — Project Setup (Day 1–2)

**Infra tasks (you do in parallel):**
- Register a domain: `calcbharat.com` / `indiacalc.in` / anything clean and memorable
- Set up GitHub repo and enable GitHub Pages
- Point custom domain DNS to GitHub Pages (A records + CNAME)

**AI IDE tasks:**
```
Prompt for AI IDE:
"Create a React + Vite project for a multi-tool calculator website.
Requirements:
- React Router with clean URL routing (no hash routing)
- Tailwind CSS for styling
- Mobile-first, fast-loading (no heavy libraries)
- Shared layout: Header (site name + nav), Footer (links to About/Privacy/Contact)
- Home page with a category grid linking to all calculator pages
- Each calculator gets its own route: /calculators/[slug]
- Create placeholder pages for: emi, sip, gst, income-tax, ppf, bmi, tdee, bmr, rent-vs-buy, age
- Add react-helmet or equivalent for per-page <title> and meta description
- Generate static build output via `vite build`
- Configure 404.html redirect trick for GitHub Pages SPA routing"
```

---

### Phase 2 — Build Each Calculator (Day 3–14)

For each tool, give your AI IDE this template prompt, swapping the specifics:

#### EMI Calculator (start here — highest traffic)
```
Prompt:
"Build a fully functional EMI Calculator page at /calculators/emi-calculator.

Calculator logic:
- Inputs: Loan Amount, Interest Rate (% per annum), Tenure (months or years toggle)
- Formula: EMI = [P × r × (1+r)^n] / [(1+r)^n – 1]
- Output: Monthly EMI, Total Interest Payable, Total Amount Payable
- Show a pie chart (use recharts) showing principal vs interest split
- Show an amortization table (collapsible)

Page content (below the calculator):
- H1: 'EMI Calculator India — Home, Car & Personal Loan'
- 200-word intro explaining what EMI is
- H2: 'How is EMI Calculated?' → explain the formula with example
- H2: 'EMI for Common Loan Types' → 3 examples (home, car, personal)
- H2: 'FAQs' → 5 questions with answers
- Schema markup: FAQPage JSON-LD

SEO meta:
- Title: 'EMI Calculator — Calculate Home, Car & Personal Loan EMI Online'
- Description: 'Free EMI calculator for home loan, car loan & personal loan. Instantly calculate monthly EMI, total interest & amortization schedule.'"
```

#### SIP Calculator
```
Prompt:
"Build a SIP Calculator page at /calculators/sip-calculator.

Calculator logic:
- Inputs: Monthly Investment (₹), Expected Annual Return (%), Investment Duration (years)
- Formula: M = P × [{(1 + r)^n – 1} / r] × (1 + r), where r = annual_rate/12/100
- Outputs: Invested Amount, Estimated Returns, Total Value
- Show a stacked bar chart: invested vs returns over time (recharts)
- Add a 'Step-Up SIP' toggle that lets users add annual increment %

Page content:
- H1: 'SIP Calculator — Estimate Mutual Fund Returns'
- Explain SIP in simple terms, India mutual fund context
- H2: 'How SIP Calculator Works'
- H2: 'SIP vs Lump Sum — Which is Better?'
- H2: 'FAQs' (5 Qs)
- FAQPage schema markup"
```

#### GST Calculator
```
Prompt:
"Build a GST Calculator at /calculators/gst-calculator.

Logic:
- Mode toggle: 'Add GST' (exclusive) vs 'Remove GST' (inclusive)
- GST rate selector: 0%, 5%, 12%, 18%, 28%
- Inputs: Amount (₹)
- Outputs: CGST, SGST (each = GST/2), Total GST, Final Amount
- Clean tabular display of the breakdown

Content:
- H1: 'GST Calculator India — Add or Remove GST Instantly'
- Explain GST slabs in India
- H2: 'How to Calculate GST?'
- H2: 'GST on Common Items' (table of categories)
- FAQs + schema"
```

#### Income Tax Calculator
```
Prompt:
"Build an Income Tax Calculator at /calculators/income-tax-calculator for FY 2025-26.

Logic:
- Regime toggle: Old Regime vs New Regime
- Inputs: Annual Income (₹), Standard Deduction, HRA, 80C, 80D (old regime only)
- Use latest tax slabs for both regimes
- Outputs: Taxable Income, Tax Payable, Effective Tax Rate, Monthly take-home estimate
- Comparison table: Old vs New regime side by side

Content:
- H1: 'Income Tax Calculator FY 2025-26 — Old vs New Regime'
- Explain both regimes
- H2: 'Which Regime is Better for You?'
- FAQs + schema"
```

#### BMI Calculator
```
Prompt:
"Build a BMI Calculator at /calculators/bmi-calculator.

Logic:
- Unit toggle: Metric (kg/cm) vs Imperial (lbs/ft-in)
- BMI = weight(kg) / height(m)²
- Output: BMI value + category (Underweight / Normal / Overweight / Obese)
- Use WHO standard AND Indian-specific cutoffs (Indians have higher risk at lower BMI)
- Show a visual BMI scale/gauge

Content:
- H1: 'BMI Calculator — Body Mass Index for Indian Adults'
- Explain BMI, its limitations, Indian-specific thresholds
- H2: 'BMI Categories for Indians' (table)
- H2: 'Is BMI Enough to Measure Health?'
- FAQs + schema"
```

#### Remaining 5 Calculators
Use the same template for: **PPF, TDEE, BMR, Rent vs Buy, Age Calculator**.  
Key inputs/formulas to give the AI for each:
- **PPF**: Principal, rate (currently 7.1%), years; compound annually
- **TDEE**: Gender, age, weight, height, activity level; Mifflin-St Jeor + activity multiplier
- **BMR**: Same as TDEE minus activity multiplier (Mifflin-St Jeor)
- **Rent vs Buy**: Monthly rent, home price, down payment, loan rate, tenure, expected appreciation; show break-even years
- **Age Calculator**: DOB input → exact years, months, days; next birthday countdown

---

### Phase 3 — Content & Blog Articles (Day 15–25)

Add 5–8 blog posts. These build topical authority and give AdSense reviewers enough text content.

**AI IDE prompt for blog:**
```
"Create a /blog route with a listing page and individual article pages.
Write full articles (800–1200 words each) for the following topics:
1. 'Should You Rent or Buy a House in India in 2026?'  → link to /calculators/rent-vs-buy-calculator
2. 'SIP vs PPF vs FD — Where Should You Invest?' → link to sip + ppf + fd calculators
3. 'How to Reduce Your Home Loan EMI — 5 Practical Tips' → link to emi calculator
4. 'Old vs New Income Tax Regime: Which is Better in 2025-26?' → link to tax calculator
5. 'BMI for Indians: Why the Standard Chart Doesn't Apply' → link to bmi calculator
6. 'What is TDEE and How to Calculate Your Daily Calorie Needs' → link to tdee calculator
7. 'Understanding GST Slabs in India — A Simple Guide' → link to gst calculator

Each article should have: H1, 3-4 H2 sections, internal links to relevant calculators, and a short FAQ block at the bottom."
```

---

### Phase 4 — SEO & Technical Polish (Day 26–30)

**AI IDE prompt:**
```
"Add the following SEO and technical improvements to the project:

1. Generate a sitemap.xml at build time listing all calculator and blog URLs
2. Add robots.txt allowing all crawlers
3. Add structured data (JSON-LD) to every calculator page:
   - WebApplication schema for the calculator
   - FAQPage schema for the FAQ section
4. Add canonical tags on every page
5. Optimize all images with lazy loading and width/height attributes
6. Add a 404.html page that redirects to home for GitHub Pages SPA compatibility
7. Add Open Graph meta tags (og:title, og:description, og:url) to every page
8. Create the following static pages with real content:
   - /about (who runs the site, what it's for)
   - /contact (simple contact form or email)
   - /privacy-policy (standard privacy policy mentioning Google AdSense)
   - /terms-of-service
9. Ensure Lighthouse score > 90 on Performance, Accessibility, SEO, Best Practices
10. Add Google Analytics 4 (leave placeholder for measurement ID)"
```

---

### Phase 5 — Deploy & Index (Day 30–35)

**You do:**
1. Push build to GitHub Pages branch
2. Configure custom domain in GitHub repo settings
3. Enable HTTPS (automatic via GitHub Pages)
4. Go to [search.google.com/search-console](https://search.google.com/search-console)
5. Add property → verify via DNS TXT record or HTML meta tag
6. Submit `sitemap.xml`
7. Use URL Inspection to request indexing for your 5 most important pages first

---

### Phase 6 — AdSense Application (Week 6–8)

**Wait until you have:**
- [ ] At least 15 live pages (calculators + blog articles)
- [ ] Site has been live and indexed for 4+ weeks
- [ ] Privacy Policy is clearly linked in footer
- [ ] No broken pages or console errors
- [ ] Mobile-friendly (test at search.google.com/test/mobile-friendly)

**Apply:**
1. Go to [adsense.google.com](https://adsense.google.com) → sign up
2. Add the verification `<script>` snippet to your HTML `<head>` (in your Vite index.html template)
3. Submit for review — takes 1–4 weeks
4. During review: keep publishing, don't restructure the site

---

### Phase 7 — Growth Loop (Month 2 onwards)

- Monitor Google Search Console weekly: look for pages getting impressions but low CTR → improve title/meta
- Add 2–3 new calculators per month based on what keywords bring traffic
- Answer finance/health questions on Reddit India, Quora — link to your calculator when genuinely useful
- Add a "Share result" button on calculators (generates a shareable text/link) for virality

---

## 📁 Recommended Project Structure

```
/project-root
├── public/
│   ├── sitemap.xml
│   ├── robots.txt
│   └── 404.html
├── src/
│   ├── components/
│   │   ├── Layout.jsx          (header + footer)
│   │   ├── CalculatorShell.jsx (shared wrapper for all calculator pages)
│   │   └── SEOHead.jsx         (helmet/meta manager)
│   ├── calculators/
│   │   ├── EMICalculator.jsx
│   │   ├── SIPCalculator.jsx
│   │   ├── GSTCalculator.jsx
│   │   └── ... (one file per calculator)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Blog.jsx
│   │   ├── About.jsx
│   │   └── BlogArticle.jsx
│   ├── blog-content/           (MDX or plain JS objects with article content)
│   └── App.jsx                 (Router setup)
├── index.html                  (AdSense + GA4 scripts go here)
└── vite.config.js
```

---

## ⚙️ Tech Stack Decisions

| Concern | Decision | Reason |
|--------|----------|--------|
| Framework | React + Vite | Fast build, static output, easy for AI IDEs |
| Routing | React Router (HashRouter as fallback) | SPA on GitHub Pages |
| Styling | Tailwind CSS | Utility-first, fast, small bundle |
| Charts | Recharts | Lightweight, works great for finance charts |
| SEO heads | react-helmet-async | Per-page meta/title control |
| Hosting | GitHub Pages | Free, reliable, custom domain support |
| Analytics | Google Analytics 4 | Required for AdSense performance data |
| Ads | Google AdSense | Applied after content milestone |

---

## 💡 Competitive Differentiation Tips

1. **India-specific data** — use ₹, Indian tax slabs, RBI rates, Indian BMI cutoffs. Generic sites don't do this.
2. **Contextual explanations** — every calculator has a "What does this mean?" section with real Indian examples (₹50 lakh home loan, ₹10,000/month SIP, etc.)
3. **Comparison mode** — e.g., EMI calculator lets you compare two loan scenarios side by side
4. **Result sharing** — "Copy result" or "Share as text" button increases return visitors and backlinks
5. **Blog × Calculator interlinking** — every article links to a calculator; every calculator links to relevant articles. This is your moat.

---

## ⚠️ Key Don'ts

- Don't build file converters first — too competitive, heavier infrastructure
- Don't launch with only calculators and no text content — AdSense will reject
- Don't use a GitHub subdomain for AdSense — use a custom domain
- Don't add ads before approval — against AdSense policy
- Don't skip the FAQ sections — they are your best shot at featured snippet rankings
