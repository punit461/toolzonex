import type { Metadata } from "next";
import IraRothCalculator from "../../../calculators/finance/IraRothCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "IRA & Roth IRA Calculator - 2026 Contribution Limits & Eligibility",
  description: "Free IRA and Roth IRA calculator. Check your 2026 contribution limit, Roth IRA income eligibility, and Traditional IRA deduction phase-out by filing status.",
  keywords: ["ira calculator", "roth ira calculator", "roth ira income limit", "traditional ira deduction", "ira contribution limit 2026", "backdoor roth"],
  alternates: { canonical: "/finance/ira-roth-calculator" },
  openGraph: {
    title: "IRA & Roth IRA Calculator - 2026 Contribution Limits & Eligibility | ToolZoneX",
    description: "Check your 2026 IRA contribution limit, Roth eligibility by income, and Traditional IRA deduction phase-out.",
    url: `${SITE_URL}/finance/ira-roth-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "IRA & Roth IRA Contribution Calculator",
  "description": "Check your 2026 IRA contribution limit, Roth IRA eligibility by income, and Traditional IRA deduction phase-out.",
  "url": `${SITE_URL}/finance/ira-roth-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <IraRothCalculator />
    </>
  );
}
