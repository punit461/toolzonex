import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Georgia Paycheck Calculator - Take-Home Pay",
  description: "Free Georgia paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
  keywords: ["georgia paycheck calculator", "georgia salary calculator", "georgia take home pay", "georgia tax calculator", "net pay calculator georgia"],
  alternates: { canonical: "/finance/georgia-paycheck-calculator" },
  openGraph: {
    title: "Georgia Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free Georgia paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/georgia-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Georgia Paycheck Calculator",
  "description": "Estimate take-home pay in Georgia after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/georgia-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="georgia" />
    </>
  );
}
