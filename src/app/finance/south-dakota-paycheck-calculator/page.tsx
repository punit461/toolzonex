import type { Metadata } from "next";
import PaycheckCalculator from "../../../calculators/paycheck/PaycheckCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "South Dakota Paycheck Calculator - Take-Home Pay",
  description: "Free South Dakota paycheck calculator. South Dakota has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
  keywords: ["south dakota paycheck calculator", "south dakota salary calculator", "south dakota take home pay", "south dakota tax calculator", "net pay calculator south dakota"],
  alternates: { canonical: "/finance/south-dakota-paycheck-calculator" },
  openGraph: {
    title: "South Dakota Paycheck Calculator - Take-Home Pay | ToolZoneX",
    description: "Free South Dakota paycheck calculator. South Dakota has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    url: `${SITE_URL}/finance/south-dakota-paycheck-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "South Dakota Paycheck Calculator",
  "description": "Estimate take-home pay in South Dakota after federal tax, Social Security, and Medicare.",
  "url": `${SITE_URL}/finance/south-dakota-paycheck-calculator`,
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
      <PaycheckCalculator stateSlug="south-dakota" />
    </>
  );
}
