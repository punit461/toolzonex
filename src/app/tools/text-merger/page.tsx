import type { Metadata } from "next";
import TextMerger from "../../../calculators/TextMerger";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Text Merger - Combine Lists Line by Line",
  description: "Combine two lists of text line by line instantly. Perfect for merging columns of data.",
  keywords: ["text merger", "combine lists", "merge lines", "list concatenator", "combine two columns", "list combiner", "text combiner", "string append online"],
  alternates: { canonical: "/tools/text-merger" },
  openGraph: {
    title: "Text Merger - Combine Lists Line by Line | ToolZoneX",
    description: "Combine two lists of text line by line instantly. Perfect for merging columns of data.",
    url: `${SITE_URL}/tools/text-merger`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Merger",
  "description": "Combine two lists of text line by line instantly.",
  "url": `${SITE_URL}/tools/text-merger`,
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
      "name": "Is this the same as a list combiner?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — this tool works as a list combiner, pairing each line of List 1 with the matching line of List 2 so you can merge two columns without spreadsheet formulas." }
    },
    {
      "@type": "Question",
      "name": "Can I use this as a text combiner or string append tool online?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — enter your first block of text as List 1 and the text you want appended as List 2, choose a separator (or none), and the tool acts as a text combiner or string append tool, joining each pair of lines into one string." }
    },
    {
      "@type": "Question",
      "name": "What if my two lists have a different number of lines?",
      "acceptedAnswer": { "@type": "Answer", "text": "Extra lines in the longer list are left unmatched or blank-paired, depending on your settings — for best results, keep both lists the same length." }
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
      <TextMerger />
    </>
  );
}
