import type { Metadata } from "next";
import RentVsBuyCalculator from "../../../calculators/RentVsBuyCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Rent vs Buy Calculator - Make Smart Property Decisions",
  description: "Free rent vs buy calculator to compare renting vs buying a home. Make informed property decisions with this comprehensive financial comparison tool.",
  keywords: ["rent vs buy calculator", "rent or buy", "property decision", "home loan vs rent", "real estate calculator", "property investment"],
  alternates: { canonical: "/finance/rent-vs-buy-calculator" },
  openGraph: {
    title: "Rent vs Buy Calculator - Make Smart Property Decisions | ToolZoneX",
    description: "Compare renting vs buying a home with this comprehensive calculator.",
    url: `${SITE_URL}/finance/rent-vs-buy-calculator`,
    type: "article",
  },
};

const rentVsBuyCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Rent vs Buy Calculator",
  "description": "Compare renting vs buying a home.",
  "url": `${SITE_URL}/finance/rent-vs-buy-calculator`,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rentVsBuyCalculatorSchema) }}
      />
      <RentVsBuyCalculator />
    </>
  );
}
