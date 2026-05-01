import type { Metadata } from "next";
import SilverRateCalculator from "../../../calculators/SilverRateCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Silver Rate Calculator - Silver Price with Making Charges & GST",
  description: "Free silver rate calculator to calculate silver price including making charges and GST. Get accurate silver rate calculations for jewelry and investment.",
  keywords: ["silver rate calculator", "silver price", "silver making charges", "silver GST", "silver jewelry price", "silver investment"],
  alternates: { canonical: "/finance/silver-calculator" },
  openGraph: {
    title: "Silver Rate Calculator - Silver Price with Making Charges & GST | ToolZoneX",
    description: "Calculate silver price including making charges and GST.",
    url: `${SITE_URL}/finance/silver-calculator`,
    type: "article",
  },
};

const silverCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Silver Rate Calculator",
  "description": "Calculate silver price with making charges and GST.",
  "url": `${SITE_URL}/finance/silver-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(silverCalculatorSchema) }}
      />
      <SilverRateCalculator />
    </>
  );
}
