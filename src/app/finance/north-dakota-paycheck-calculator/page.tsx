import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "North Dakota Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free North Dakota paycheck calculator with 2025 state tax brackets. See net pay after federal tax, North Dakota state tax, Social Security, and Medicare.",
  keywords: ["north dakota paycheck calculator", "north dakota salary calculator", "north dakota take home pay", "north dakota tax calculator", "net pay calculator north dakota"],
  alternates: { canonical: "/finance/north-dakota-paycheck-calculator" },
  openGraph: {
    title: "North Dakota Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free North Dakota paycheck calculator with 2025 federal tax brackets and North Dakota state tax.",
    url: `${SITE_URL}/finance/north-dakota-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "North Dakota Paycheck Calculator",
  "description": "Estimate take-home pay in North Dakota after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/north-dakota-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="north-dakota" />
    </>
  );
}
