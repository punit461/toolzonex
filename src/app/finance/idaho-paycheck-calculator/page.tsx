import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Idaho Paycheck Calculator - Estimate Your Take-Home Pay",
  description: "Free Idaho paycheck calculator with the 2025 flat 5.3% state tax rate. See net pay after federal tax, Idaho state tax, Social Security, and Medicare.",
  keywords: ["idaho paycheck calculator", "idaho salary calculator", "idaho take home pay", "idaho tax calculator", "net pay calculator idaho"],
  alternates: { canonical: "/finance/idaho-paycheck-calculator" },
  openGraph: {
    title: "Idaho Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    description: "Free Idaho paycheck calculator with 2025 federal tax brackets and Idaho's flat 5.3% state tax.",
    url: `${SITE_URL}/finance/idaho-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Idaho Paycheck Calculator",
  "description": "Estimate take-home pay in Idaho after federal tax, state tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/idaho-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="idaho" />
    </>
  );
}
