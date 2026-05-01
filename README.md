# ToolZoneX — Smart Tools for Every Decision

ToolZoneX is a comprehensive, open-source platform of high-performance calculators and utility tools designed to help users make smarter financial, health, and everyday decisions. Built with **Next.js 15**, **TypeScript**, and **Material UI**, it is optimized for high performance and search engine visibility (SEO) via Static Site Generation (SSG).

🚀 **Live Site:** [https://punit461.github.io/toolzonex/](https://punit461.github.io/toolzonex/)

---

## ✨ Features

### 💰 Finance Zone
- **Salary Increment Calculator:** [NEW] Project your new CTC and monthly take-home after an appraisal.
- **Retirement Calculator:** [NEW] Calculate the corpus needed for retirement and the required monthly SIP, adjusted for inflation.
- **Income Tax Calculator (FY 2025-26):** Side-by-side comparison of Old vs. New Tax Regimes with full support for deductions.
- **EMI & SIP Calculators:** Plan loans and mutual fund investments with detailed projections.
- **GST, PPF, SSY & Gratuity:** Full suite of Indian financial tools.

### 🏥 Health Zone
- **BMI & BMR Calculators:** Essential body metrics with unit support.
- **TDEE Calculator:** Total Daily Energy Expenditure planning.
- **Fitness Tests (PFT/CFT):** Specialized defense recruitment standards calculators.

### 🛠️ Utility & Tools
- **Age, Date & Percentage:** Precise calculation tools for everyday math.
- **Online Notepad:** Browser-persistent notepad for quick notes.

### 📝 Content & SEO
- **Smart Blog System:** SEO-optimized articles on tax planning and financial literacy.
- **Static Site Generation:** Every page is pre-rendered for lightning-fast loads and perfect SEO indexing.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Material UI (MUI) v6
- **SEO:** Native Next.js Metadata API, automated `sitemap.xml` and `robots.txt`
- **Deployment:** Static Export (`output: 'export'`) to GitHub Pages via GitHub Actions

---

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router (Routes, Layouts, Metadata)
├── calculators/    # Core logic for calculators (shared components)
├── components/     # Reusable UI elements (Header, Footer, Theme)
├── pages/          # Legacy page definitions (migrated to app/ structure)
└── blog/           # Markdown/TSX content for educational articles
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.18 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/punit461/ToolSite.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```bash
   # Required for contact form
   NEXT_PUBLIC_CONTACT_SHEET_URL=your_google_script_url
   ```

### Development
Start the local development server:
```bash
npm run dev
```

### Build & Export
To generate the static site in the `/out` directory:
```bash
npm run build
```

---

## 📬 Contact & Feedback

For any queries, feature requests, or bug reports, please use the **Contact Page** on the website or email directly at: `punit461bharadwaj@gmail.com`.

The contact form is integrated with **Google Sheets** for lead capture and uses **Google Apps Script** for automatic notifications.

---

## ⚖️ License
This project is open-source and available under the MIT License.
