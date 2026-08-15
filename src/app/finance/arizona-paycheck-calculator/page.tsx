import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Arizona Paycheck Calculator - Take-Home Pay",
  description: "Free Arizona paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
  keywords: ["arizona paycheck calculator", "arizona salary calculator", "arizona take home pay", "arizona tax calculator", "net pay calculator arizona"],
  alternates: { canonical: "/finance/arizona-paycheck-calculator" },
  openGraph: {
    title: "Arizona Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free Arizona paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/arizona-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Arizona Paycheck Calculator",
  "description": "Estimate take-home pay in Arizona after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/arizona-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="arizona" />
    </>
  );
}
