import type { Metadata } from "next";
import DiscountCalculator from "../../../calculators/DiscountCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Discount Calculator - Find Final Price and Savings Online",
  description: "Calculate the final price and amount saved after a percentage discount is applied. Free online discount calculator for shopping and sales.",
  keywords: ["discount calculator", "percent off calculator", "sales tax calculator", "price after discount"],
  alternates: { canonical: "/utilities/discount-calculator" },
  openGraph: {
    title: "Discount Calculator - Find Final Price and Savings Online | ToolZoneX",
    description: "Calculate the final price and amount saved after a percentage discount is applied.",
    url: `${SITE_URL}/utilities/discount-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Discount Calculator",
  "description": "Calculate the final price and amount saved after a percentage discount is applied.",
  "url": `${SITE_URL}/utilities/discount-calculator`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <DiscountCalculator />
    </>
  );
}
