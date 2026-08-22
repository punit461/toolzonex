import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Ohio Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Ohio paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Ohio state tax, Social Security, and Medicare.",
  keywords: ["ohio paycheck calculator", "ohio salary calculator", "ohio take home pay", "ohio tax calculator", "net pay calculator ohio"],
  alternates: { canonical: "/finance/ohio-paycheck-calculator" },
  openGraph: {
    title: "Ohio Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Ohio paycheck calculator with 2025 federal tax brackets and Ohio state tax.",
    url: `${SITE_URL}/finance/ohio-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Ohio Paycheck Calculator",
  "description": "Estimate take-home pay in Ohio after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/ohio-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="ohio" />
    </>
  );
}
