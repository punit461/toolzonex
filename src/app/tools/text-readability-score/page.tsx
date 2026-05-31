import type { Metadata } from "next";
import TextReadabilityScore from "../../../calculators/TextReadabilityScore";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Text Readability Score Calculator - Flesch Kincaid",
  description: "Calculate Flesch Reading Ease and Flesch-Kincaid Grade level of any text online. Improve your writing clarity.",
  keywords: ["text readability score", "flesch reading ease", "flesch kincaid grade level", "readability calculator", "writing clarity check"],
  alternates: { canonical: "/tools/text-readability-score" },
  openGraph: {
    title: "Text Readability Score Calculator - Flesch Kincaid | ToolZoneX",
    description: "Calculate Flesch Reading Ease and Flesch-Kincaid Grade level of any text online. Improve your writing clarity.",
    url: `${SITE_URL}/tools/text-readability-score`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Readability Score Calculator",
  "description": "Calculate Flesch Reading Ease and Flesch-Kincaid Grade level of any text online.",
  "url": `${SITE_URL}/tools/text-readability-score`,
  "applicationCategory": "EducationalApplication",
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
      <TextReadabilityScore />
    </>
  );
}
