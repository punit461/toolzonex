import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Texas Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Texas paycheck calculator. Texas has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
  keywords: ["texas paycheck calculator", "texas salary calculator", "texas take home pay", "texas tax calculator", "net pay calculator texas"],
  alternates: { canonical: "/finance/texas-paycheck-calculator" },
  openGraph: {
    title: "Texas Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Texas paycheck calculator with 2025 federal tax brackets — Texas has no state income tax.",
    url: `${SITE_URL}/finance/texas-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Texas Paycheck Calculator",
  "description": "Estimate take-home pay in Texas after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/texas-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="texas" />
    </>
  );
}
