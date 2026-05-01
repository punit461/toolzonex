import type { Metadata } from "next";
import GoldRateCalculator from "../../../calculators/GoldRateCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Gold Rate Calculator - Gold Price with Making Charges & GST",
  description: "Free gold rate calculator to calculate gold price including making charges and GST. Compare 24K, 22K, and 18K gold rates for jewelry purchases.",
  keywords: ["gold rate calculator", "gold price", "gold making charges", "24K gold", "22K gold", "18K gold", "gold jewelry price", "gold GST"],
  alternates: { canonical: "/finance/gold-calculator" },
  openGraph: {
    title: "Gold Rate Calculator - Gold Price with Making Charges & GST | ToolZoneX",
    description: "Calculate gold price including making charges and GST.",
    url: `${SITE_URL}/finance/gold-calculator`,
    type: "article",
  },
};

const goldCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Gold Rate Calculator",
  "description": "Calculate gold price with making charges and GST.",
  "url": `${SITE_URL}/finance/gold-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(goldCalculatorSchema) }}
      />
      <GoldRateCalculator />
    </>
  );
}
