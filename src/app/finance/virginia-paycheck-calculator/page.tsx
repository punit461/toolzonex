import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Virginia Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Virginia paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Virginia state tax, Social Security, and Medicare.",
  keywords: ["virginia paycheck calculator", "virginia salary calculator", "virginia take home pay", "virginia tax calculator", "net pay calculator virginia"],
  alternates: { canonical: "/finance/virginia-paycheck-calculator" },
  openGraph: {
    title: "Virginia Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Virginia paycheck calculator with 2025 federal tax brackets and Virginia state tax.",
    url: `${SITE_URL}/finance/virginia-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Virginia Paycheck Calculator",
  "description": "Estimate take-home pay in Virginia after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/virginia-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="virginia" />
    </>
  );
}
