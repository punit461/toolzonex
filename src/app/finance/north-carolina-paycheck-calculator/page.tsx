import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "North Carolina Paycheck Calculator - Take-Home Pay",
  description: "Free North Carolina paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
  keywords: ["north carolina paycheck calculator", "north carolina salary calculator", "north carolina take home pay", "north carolina tax calculator", "net pay calculator north carolina"],
  alternates: { canonical: "/finance/north-carolina-paycheck-calculator" },
  openGraph: {
    title: "North Carolina Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free North Carolina paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/north-carolina-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "North Carolina Paycheck Calculator",
  "description": "Estimate take-home pay in North Carolina after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/north-carolina-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="north-carolina" />
    </>
  );
}
