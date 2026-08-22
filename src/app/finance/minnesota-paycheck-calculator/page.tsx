import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Minnesota Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Minnesota paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Minnesota state tax, Social Security, and Medicare.",
  keywords: ["minnesota paycheck calculator", "minnesota salary calculator", "minnesota take home pay", "minnesota tax calculator", "net pay calculator minnesota"],
  alternates: { canonical: "/finance/minnesota-paycheck-calculator" },
  openGraph: {
    title: "Minnesota Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Minnesota paycheck calculator with 2025 federal tax brackets and Minnesota state tax.",
    url: `${SITE_URL}/finance/minnesota-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Minnesota Paycheck Calculator",
  "description": "Estimate take-home pay in Minnesota after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/minnesota-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="minnesota" />
    </>
  );
}
