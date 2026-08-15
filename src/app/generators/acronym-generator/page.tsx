import type { Metadata } from "next";
import AcronymGenerator from "../../../calculators/AcronymGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Acronym Generator - Convert Phrases to Abbreviations Online",
  description: "Instantly convert long phrases or titles into short acronyms. Free online abbreviation maker that ignores stop words.",
  keywords: ["acronym generator", "abbreviation maker", "phrase to acronym", "create acronym online", "abbreviation generator"],
  alternates: { canonical: "/generators/acronym-generator" },
  openGraph: {
    title: "Acronym Generator - Convert Phrases to Abbreviations Online | ToolZoneX",
    description: "Instantly convert long phrases or titles into short acronyms. Free online abbreviation maker.",
    url: `${SITE_URL}/generators/acronym-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Acronym Generator",
  "description": "Instantly convert long phrases or titles into short acronyms.",
  "url": `${SITE_URL}/generators/acronym-generator`,
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
      <AcronymGenerator />
    </>
  );
}
