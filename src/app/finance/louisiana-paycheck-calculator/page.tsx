import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Louisiana Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Louisiana paycheck calculator with the 2025 flat 3% state tax rate. See net pay after federal tax, Louisiana state tax, Social Security, and Medicare.",
  keywords: ["louisiana paycheck calculator", "louisiana salary calculator", "louisiana take home pay", "louisiana tax calculator", "net pay calculator louisiana"],
  alternates: { canonical: "/finance/louisiana-paycheck-calculator" },
  openGraph: {
    title: "Louisiana Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Louisiana paycheck calculator with 2025 federal tax brackets and Louisiana's flat 3% state tax.",
    url: `${SITE_URL}/finance/louisiana-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Louisiana Paycheck Calculator",
  "description": "Estimate take-home pay in Louisiana after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/louisiana-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="louisiana" />
    </>
  );
}
