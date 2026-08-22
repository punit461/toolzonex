import type { Metadata } from "next";
import WordCounter from "../../../calculators/WordCounter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Word Counter - Count Words & Characters Online",
  description: "Count words, characters, sentences, and paragraphs in real-time. Free online word count tool for writers, SEO, and students.",
  keywords: ["word counter", "character counter", "count words", "count characters", "letter count", "text stats", "word calculator", "words calculator", "calculate words", "word count calculator"],
  alternates: { canonical: "/text-tools/word-counter" },
  openGraph: {
    title: "Word Counter - Count Words & Characters Online | ToolZoneX",
    description: "Count words, characters, sentences, and paragraphs in real-time. Free online word count tool for writers, SEO, and students.",
    url: `${SITE_URL}/text-tools/word-counter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Word Counter",
  "description": "Count words, characters, sentences, and paragraphs in real-time. Free online word count tool.",
  "url": `${SITE_URL}/text-tools/word-counter`,
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
      "name": "Does it count words as I type?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — the word, character, sentence, and paragraph counts update live as you type or paste text." }
    },
    {
      "@type": "Question",
      "name": "Is this the same as a word calculator?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — \"word calculator\" and \"word counter\" describe the same thing here. This tool calculates the exact word, character, sentence, and paragraph totals for whatever text you paste in." }
    },
    {
      "@type": "Question",
      "name": "How do I calculate the number of words in a document?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste the full text into the box above — there's no length limit, and the word count updates instantly without needing to open Word or Google Docs." }
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
      <WordCounter />
    </>
  );
}
