import type { Metadata } from "next";
import MarginCalculator from "../../../calculators/MarginCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Margin Calculator - Calculate Profit Margin & Markup Online",
  description: "Calculate gross profit, profit margin, and markup percentage instantly. Free online margin calculator for businesses.",
  keywords: ["margin calculator", "profit margin calculator", "markup calculator", "gross profit calculator"],
  alternates: { canonical: "/utilities/margin-calculator" },
  openGraph: {
    title: "Margin Calculator - Calculate Profit Margin & Markup Online | ToolZoneX",
    description: "Calculate gross profit, profit margin, and markup percentage instantly.",
    url: `${SITE_URL}/utilities/margin-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Margin Calculator",
  "description": "Calculate gross profit, profit margin, and markup percentage instantly.",
  "url": `${SITE_URL}/utilities/margin-calculator`,
  "applicationCategory": "BusinessApplication",
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
      <MarginCalculator />
    </>
  );
}
