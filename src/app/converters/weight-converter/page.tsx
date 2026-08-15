import type { Metadata } from "next";
import WeightConverter from "../../../calculators/converters/WeightConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Weight Converter - Kilograms, Pounds, Ounces & More",
  description: "Free weight converter. Convert between kilograms, grams, pounds, ounces, metric tons, and carats.",
  keywords: ["weight converter","kg to lbs","pounds to kg","grams to ounces","mass converter"],
  alternates: { canonical: "/converters/weight-converter" },
  openGraph: {
    title: "Weight Converter - Kilograms, Pounds, Ounces & More | ToolZoneX",
    description: "Free weight converter. Convert between kilograms, grams, pounds, ounces, metric tons, and carats.",
    url: `${SITE_URL}/converters/weight-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "WeightConverter",
  "description": "Free weight converter. Convert between kilograms, grams, pounds, ounces, metric tons, and carats.",
  "url": `${SITE_URL}/converters/weight-converter`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <WeightConverter />
    </>
  );
}
