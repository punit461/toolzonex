import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Colorado Paycheck Calculator - Take-Home Pay",
  description: "Free Colorado paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
  keywords: ["colorado paycheck calculator", "colorado salary calculator", "colorado take home pay", "colorado tax calculator", "net pay calculator colorado"],
  alternates: { canonical: "/finance/colorado-paycheck-calculator" },
  openGraph: {
    title: "Colorado Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free Colorado paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/colorado-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Colorado Paycheck Calculator",
  "description": "Estimate take-home pay in Colorado after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/colorado-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="colorado" />
    </>
  );
}
