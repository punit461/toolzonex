import type { Metadata } from "next";
import TextReadabilityScore from "../../../calculators/TextReadabilityScore";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Text Readability Score Calculator - Flesch Kincaid",
  description: "Calculate Flesch Reading Ease and Flesch-Kincaid Grade level of any text online. Improve your writing clarity.",
  keywords: ["text readability score", "flesch reading ease", "flesch kincaid grade level", "readability calculator", "writing clarity check", "flesch kincaid test", "flesch-kincaid calculator", "flesch kincaid calculator", "reading level calculator"],
  alternates: { canonical: "/tools/text-readability-score" },
  openGraph: {
    title: "Text Readability Score Calculator - Flesch Kincaid | ToolZoneX",
    description: "Calculate Flesch Reading Ease and Flesch-Kincaid Grade level of any text online. Improve your writing clarity.",
    url: `${SITE_URL}/tools/text-readability-score`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What Flesch Reading Ease score is considered \"easy\"?",
      "acceptedAnswer": { "@type": "Answer", "text": "Scores of 60-70 are considered plain English, easily understood by 13-15 year olds; scores above 90 are very easy to read, while scores below 30 are considered very difficult (college graduate level)." }
    },
    {
      "@type": "Question",
      "name": "What is the Flesch-Kincaid test?",
      "acceptedAnswer": { "@type": "Answer", "text": "It's actually two related formulas — the Flesch Reading Ease score (0-100, higher is easier) and the Flesch-Kincaid Grade Level (an approximate US school grade needed to understand the text). This calculator computes both at once from the same text." }
    },
    {
      "@type": "Question",
      "name": "Is there a free Flesch-Kincaid calculator?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — this tool is free, requires no sign-up, and runs entirely in your browser, so pasted text is never uploaded to a server." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TextReadabilityScore />
    </>
  );
}
