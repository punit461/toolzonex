import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Florida Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Florida paycheck calculator. Florida has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
  keywords: ["florida paycheck calculator", "florida salary calculator", "florida take home pay", "florida tax calculator", "net pay calculator florida"],
  alternates: { canonical: "/finance/florida-paycheck-calculator" },
  openGraph: {
    title: "Florida Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Florida paycheck calculator with 2025 federal tax brackets — Florida has no state income tax.",
    url: `${SITE_URL}/finance/florida-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Florida Paycheck Calculator",
  "description": "Estimate take-home pay in Florida after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/florida-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="florida" />
    </>
  );
}
