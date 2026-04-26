# ToolZoneX — Smart Tools for Every Decision

ToolZoneX is a comprehensive, open-source platform of high-performance calculators and utility tools designed to help users make smarter financial, health, and everyday decisions. Built with React, TypeScript, and Material UI, it focuses on accuracy, speed, and premium user experience.

🚀 **Live Site:** [https://punit461.github.io/toolzonex/](https://punit461.github.io/toolzonex/)

---

## ✨ Features

### 💰 Finance Zone
- **Income Tax Calculator (FY 2025-26):** Side-by-side comparison of Old vs. New Tax Regimes with full support for HRA, 80C, 80D, NPS, and more.
- **EMI Calculator:** Plan your loans with detailed amortization schedules.
- **SIP Calculator:** Project your mutual fund returns and wealth creation.
- **GST Calculator:** Quick calculation of IGST, CGST, and SGST.
- **PPF & SSY Calculators:** Long-term savings projections for Public Provident Fund and Sukanya Samriddhi Yojana.
- **Gold & Silver Rate Calculators:** Real-time calculation based on weight and purity.
- **Gratuity & Rent vs Buy:** Specialized financial decision-making tools.

### 🏥 Health Zone
- **BMI & BMR Calculators:** Essential body metrics with unit support (Metric/Imperial).
- **TDEE Calculator:** Total Daily Energy Expenditure to plan your diet.
- **Fitness Tests (PFT/CFT):** Specialized Physical and Combat Fitness Test calculators for defense recruitment standards.

### 🛠️ Utility & Tools
- **Age & Date Calculators:** Accurate age calculation and date duration tools.
- **Percentage Calculator:** Multi-mode percentage math.
- **Online Notepad:** Simple, browser-persistent notepad for quick jottings.

### 📝 Content & Education
- **Smart Blog System:** A categorized, searchable blog with tags covering tax planning, investment strategies, and financial literacy.

---

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite (for lightning-fast development)
- **Language:** TypeScript (for type-safety and reliability)
- **Styling:** Material UI (MUI) v6+ (for a premium, responsive design)
- **Routing:** React Router v6
- **SEO:** React Helmet Async (for dynamic meta tags)
- **CI/CD:** GitHub Actions (automated deployment to GitHub Pages)

---

## 📁 Project Structure

```text
src/
├── calculators/    # Individual tool implementations
├── components/     # Reusable UI elements (Header, Footer, Layout, SEO)
├── pages/          # Main page views (Home, Blog, About, Contact)
│   └── blogs/      # Educational articles (TSX format)
├── App.tsx         # Route configuration
└── main.tsx        # App entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/punit461/ToolSite.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

### Development
Start the local development server:
```bash
npm run dev
```

### Build & Deploy
To build the production bundle:
```bash
npm run build
```
Note: If deploying to a sub-path (like GitHub Pages), ensure `base` in `vite.config.ts` is set correctly (e.g., `base: '/toolzonex/'`).

---

## 📬 Contact & Feedback

For any queries, feature requests, or bug reports, please use the **Contact Page** on the website or email directly at: `punit461bharadwaj@gmail.com`.

The contact form is integrated with **Google Sheets** for lead capture and uses **Google Apps Script** for automatic email notifications.

---

## ⚖️ License
This project is open-source and available under the MIT License.
