import type { Metadata } from "next";
import TextSizeCalculator from "../../../calculators/TextSizeCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Text Size Calculator - Check Text Size Online",
  description: "Check text size online: character count, word count, byte size, and reading time. Free online text size calculator for any text.",
  keywords: ["text size calculator", "check text size online", "find text size", "text size checker", "online text size tool", "text analyzer", "character count", "word count", "reading time calculator", "text statistics", "content analysis", "text metrics", "text length calculator"],
  alternates: { canonical: "/tools/text-size-calculator" },
  openGraph: {
    title: "Text Size Calculator - Check Text Size Online | ToolZoneX",
    description: "Analyze text with character count, word count, reading time, and more. Free online text size calculator for content analysis.",
    url: `${SITE_URL}/tools/text-size-calculator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const textSizeCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Size Calculator",
  "description": "Analyze text with character count, word count, reading time, and more. Free online text size calculator for content analysis.",
  "url": `${SITE_URL}/tools/text-size-calculator`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I check text size online?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste or type your text into the box above — character count (with and without spaces), word count, sentence count, paragraphs, lines, byte size, and estimated reading/speaking time all calculate instantly, with nothing uploaded to a server." }
    },
    {
      "@type": "Question",
      "name": "What counts as \"text size\" — words, characters, or bytes?",
      "acceptedAnswer": { "@type": "Answer", "text": "This tool measures all three: character count (with and without spaces), word count, and the actual byte size of the text (useful for checking limits in databases, APIs, or file uploads), alongside sentence, paragraph, and line counts." }
    },
    {
      "@type": "Question",
      "name": "Does the reading time estimate account for different reading speeds?",
      "acceptedAnswer": { "@type": "Answer", "text": "It uses an average adult reading speed (roughly 200-250 words per minute); actual reading time will vary by individual and text complexity." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(textSizeCalculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TextSizeCalculator />
    </>
  );
}