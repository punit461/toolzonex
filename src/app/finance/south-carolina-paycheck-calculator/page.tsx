import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "South Carolina Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free South Carolina paycheck calculator with 2025 state tax brackets. See net pay after federal tax, South Carolina state tax, Social Security, and Medicare.",
  keywords: ["south carolina paycheck calculator", "south carolina salary calculator", "south carolina take home pay", "south carolina tax calculator", "net pay calculator south carolina"],
  alternates: { canonical: "/finance/south-carolina-paycheck-calculator" },
  openGraph: {
    title: "South Carolina Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free South Carolina paycheck calculator with 2025 federal tax brackets and South Carolina state tax.",
    url: `${SITE_URL}/finance/south-carolina-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "South Carolina Paycheck Calculator",
  "description": "Estimate take-home pay in South Carolina after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/south-carolina-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="south-carolina" />
    </>
  );
}
