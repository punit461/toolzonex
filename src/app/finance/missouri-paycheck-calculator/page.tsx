import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Missouri Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Missouri paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Missouri state tax, Social Security, and Medicare.",
  keywords: ["missouri paycheck calculator", "missouri salary calculator", "missouri take home pay", "missouri tax calculator", "net pay calculator missouri"],
  alternates: { canonical: "/finance/missouri-paycheck-calculator" },
  openGraph: {
    title: "Missouri Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Missouri paycheck calculator with 2025 federal tax brackets and Missouri state tax.",
    url: `${SITE_URL}/finance/missouri-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Missouri Paycheck Calculator",
  "description": "Estimate take-home pay in Missouri after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/missouri-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="missouri" />
    </>
  );
}
