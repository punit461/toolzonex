import type { Metadata } from "next";
import TextReadabilityScore from "../../../calculators/TextReadabilityScore";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Flesch-Kincaid Grade Level & Reading Ease Calculator",
  description: "Free Flesch-Kincaid grade level and Flesch Reading Ease calculator. Check readability score and reading level from any text instantly.",
  keywords: ["flesch kincaid test", "flesch-kincaid grade level calculator", "flesch reading ease", "flesch reading ease score", "flesch reading ease tool", "flesch reading ease score calculator", "flesch reading calculator", "flesch kincaid tool", "flesch kincaid", "flesch kincaid grade level", "flesch kincaid reading level", "flesch kincaid readability", "flesch-kincaid readability", "flesch-kincaid readability tests", "flesch kincaid scoring", "flesch kincaid scores", "flesch kincaid reading ease score", "flesch-kincaid reading ease score", "flesch kinkaid score", "readability checker flesch kincaid", "readability checker grade level", "kincaid readability", "readability tool", "readability scores", "readability score calculator", "the readability test tool", "check reading level", "writing level analysis", "reading level calculator", "text readability score", "good calculator flesch kincaid"],
  alternates: { canonical: "/tools/text-readability-score" },
  openGraph: {
    title: "Flesch-Kincaid Grade Level & Reading Ease Calculator | ToolZoneX",
    description: "Calculate Flesch Reading Ease, Flesch-Kincaid grade level, and a readability score from any text.",
    url: `${SITE_URL}/tools/text-readability-score`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Flesch-Kincaid Grade Level & Reading Ease Calculator",
  "description": "Calculate Flesch Reading Ease, Flesch-Kincaid grade level, and a readability score from any text.",
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
      "name": "What does the Flesch-Kincaid Grade Level number mean?",
      "acceptedAnswer": { "@type": "Answer", "text": "It's an approximate US school grade level needed to understand the text. For example, a Flesch-Kincaid Grade Level of 8.0 means the text should be readable by an average 8th grader (around age 13). This calculator works it out from your text's average sentence length and average syllables per word using the standard formula: 0.39 × (words ÷ sentences) + 11.8 × (syllables ÷ words) − 15.59." }
    },
    {
      "@type": "Question",
      "name": "What does a Flesch Reading Ease score of 0-100 mean?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Flesch Reading Ease score runs from 0 to 100 — the higher the number, the easier the text is to read. Roughly: 90-100 is very easy (5th-grade level), 60-70 is plain English (8th-9th grade), 30-50 is difficult (college level), and below 30 is very difficult (college-graduate/professional level)." }
    },
    {
      "@type": "Question",
      "name": "What Flesch Reading Ease score is considered \"easy\"?",
      "acceptedAnswer": { "@type": "Answer", "text": "Scores of 60-70 are considered plain English, easily understood by 13-15 year olds; scores above 90 are very easy to read, while scores below 30 are considered very difficult (college graduate level)." }
    },
    {
      "@type": "Question",
      "name": "What is the Flesch-Kincaid test?",
      "acceptedAnswer": { "@type": "Answer", "text": "It's actually two related formulas — the Flesch Reading Ease score (0-100, higher is easier) and the Flesch-Kincaid Grade Level (an approximate US school grade needed to understand the text). This calculator computes both at once from the same text, plus the Automated Readability Index (ARI) as a third readability score." }
    },
    {
      "@type": "Question",
      "name": "Is a readability checker the same as a Flesch-Kincaid calculator?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — \"readability checker\", \"readability score calculator\", \"reading level calculator\", and \"Flesch-Kincaid calculator\" all describe this same kind of tool. It analyzes sentence length and syllable count to score how easy your text is to read." }
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
