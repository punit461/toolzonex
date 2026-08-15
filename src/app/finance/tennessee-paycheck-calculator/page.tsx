import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Tennessee Paycheck Calculator - Take-Home Pay",
  description: "Free Tennessee paycheck calculator. Tennessee has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
  keywords: ["tennessee paycheck calculator", "tennessee salary calculator", "tennessee take home pay", "tennessee tax calculator", "net pay calculator tennessee"],
  alternates: { canonical: "/finance/tennessee-paycheck-calculator" },
  openGraph: {
    title: "Tennessee Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free Tennessee paycheck calculator. Tennessee has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/tennessee-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Tennessee Paycheck Calculator",
  "description": "Estimate take-home pay in Tennessee after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/tennessee-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="tennessee" />
    </>
  );
}
