import type { Metadata } from "next";
import WordCounter from "../../../calculators/WordCounter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Word Count Calculator - Free Word Counter Online",
  description: "Use this free online word count tool to count words, characters, sentences, and paragraphs in real time. Just paste your text and see the count instantly.",
  keywords: ["word counter", "word count calculator", "online word count calculator", "words counter online", "word count typer", "words count calculator", "online word count tool", "online word count", "count the word", "how many words is this", "words calculation", "word count text", "word count", "words and characters count", "letter word counter", "words to characters", "character counter", "count words", "count characters", "letter count", "text stats", "word calculator", "words calculator", "calculate words"],
  alternates: { canonical: "/text-tools/word-counter" },
  openGraph: {
    title: "Word Count Calculator - Free Word Counter Online | ToolZoneX",
    description: "Count words, characters, sentences, and paragraphs in real time with a free word count calculator.",
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
    },
    {
      "@type": "Question",
      "name": "How many words is this text?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste it into the box above — the word count (along with character, sentence, and paragraph counts) appears immediately, updating live as you edit." }
    },
    {
      "@type": "Question",
      "name": "How do I convert words to characters?",
      "acceptedAnswer": { "@type": "Answer", "text": "There's no fixed ratio since word length varies, but English averages roughly 5-6 characters per word including the space after it — so 300 words is typically around 1,500-1,800 characters. For an exact count of your own text, paste it above and read the word and character counts side by side." }
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
