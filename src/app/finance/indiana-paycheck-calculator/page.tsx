import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Indiana Paycheck Calculator - Take-Home Pay",
  description: "Free Indiana paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
  keywords: ["indiana paycheck calculator", "indiana salary calculator", "indiana take home pay", "indiana tax calculator", "net pay calculator indiana"],
  alternates: { canonical: "/finance/indiana-paycheck-calculator" },
  openGraph: {
    title: "Indiana Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free Indiana paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/indiana-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Indiana Paycheck Calculator",
  "description": "Estimate take-home pay in Indiana after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/indiana-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="indiana" />
    </>
  );
}
