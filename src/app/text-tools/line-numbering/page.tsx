import type { Metadata } from "next";
import LineNumbering from "../../../calculators/LineNumbering";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Line Numbering - Add Numbers to Text Lines Online",
  description: "Automatically add line numbers to text or lists. Free online utility for coding, document formatting, and text manipulation.",
  keywords: ["line numbering", "add numbers to lines", "number text lines", "list numbering tool", "auto number list", "line number calculator", "add line number"],
  alternates: { canonical: "/text-tools/line-numbering" },
  openGraph: {
    title: "Line Numbering - Add Numbers to Text Lines Online | ToolZoneX",
    description: "Automatically add line numbers to text or lists. Free online utility.",
    url: `${SITE_URL}/text-tools/line-numbering`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Line Numbering",
  "description": "Automatically add line numbers to text or lists.",
  "url": `${SITE_URL}/text-tools/line-numbering`,
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
      "name": "Is this the same as a line number calculator?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — people search for a \"line number calculator\" when they want sequential numbers added to a list or document; this tool does exactly that, working out and inserting the correct number for every line automatically." }
    },
    {
      "@type": "Question",
      "name": "How do I add line numbers to my text?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste your text into the box, choose your numbering options (skip empty lines, dot or no dot after the number), and click \"Add Line Numbers\" — every line gets numbered instantly." }
    },
    {
      "@type": "Question",
      "name": "Can I number only non-empty lines?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — enable \"skip empty lines\" and blank lines are left as-is without incrementing the counter." }
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
      <LineNumbering />
    </>
  );
}
