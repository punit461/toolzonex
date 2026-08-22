import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Iowa Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Iowa paycheck calculator with the 2025 flat 3.8% state tax rate. See net pay after federal tax, Iowa state tax, Social Security, and Medicare.",
  keywords: ["iowa paycheck calculator", "iowa salary calculator", "iowa take home pay", "iowa tax calculator", "net pay calculator iowa"],
  alternates: { canonical: "/finance/iowa-paycheck-calculator" },
  openGraph: {
    title: "Iowa Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Iowa paycheck calculator with 2025 federal tax brackets and Iowa's flat 3.8% state tax.",
    url: `${SITE_URL}/finance/iowa-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Iowa Paycheck Calculator",
  "description": "Estimate take-home pay in Iowa after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/iowa-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="iowa" />
    </>
  );
}
