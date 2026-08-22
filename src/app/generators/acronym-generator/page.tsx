import type { Metadata } from "next";
import AcronymGenerator from "../../../calculators/generators/AcronymGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Acronym Generator - Phrase to Acronym & Acronym to Words",
  description: "Convert phrases to acronyms, or expand an acronym back into words — real meanings for common acronyms, backronyms for the rest. Free online abbreviation maker.",
  keywords: ["acronym generator", "abbreviation maker", "phrase to acronym", "create acronym online", "abbreviation generator", "word abbreviation generator", "word abbreviations generator", "make an abbreviation", "create an abbreviation", "abbreviations maker", "acronym maker", "abbreviate a phrase", "acronym to words generator", "acronymic sentence generator", "sentence acronym generator", "backronym generator", "what does this acronym stand for"],
  alternates: { canonical: "/generators/acronym-generator" },
  openGraph: {
    title: "Acronym Generator - Phrase to Acronym & Acronym to Words | ToolZoneX",
    description: "Convert phrases to acronyms, or expand an acronym back into words — real meanings for common acronyms, backronyms for the rest.",
    url: `${SITE_URL}/generators/acronym-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Acronym Generator",
  "description": "Instantly convert long phrases or titles into short acronyms, or expand an acronym back into its real meaning or a generated backronym.",
  "url": `${SITE_URL}/generators/acronym-generator`,
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
      "name": "Does it always skip small words like \"and\" and \"the\"?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, common stop words (and, or, of, the, a, an, in, on, at, for, to, with) are excluded by default so the acronym reads more naturally." }
    },
    {
      "@type": "Question",
      "name": "How do I create an abbreviation from a phrase?",
      "acceptedAnswer": { "@type": "Answer", "text": "Type or paste the full phrase or title into the input box and click \"Generate Acronym\" — the tool takes the first letter of each significant word (skipping stop words) and joins them into an uppercase abbreviation." }
    },
    {
      "@type": "Question",
      "name": "Can this tool expand an acronym back into the full words it stands for?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, in the \"Acronym → Words\" mode. For well-known acronyms (like NASA, ASAP, or WHO) it returns the real, recognized meaning from a curated list. For anything it doesn't recognize, it generates a backronym instead — a plausible-sounding sentence built one word per letter, clearly labeled as generated rather than an official meaning." }
    },
    {
      "@type": "Question",
      "name": "Is this the same as an abbreviation maker?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — \"acronym generator,\" \"abbreviation maker,\" and \"word abbreviation generator\" all describe the same phrase-to-acronym conversion this tool performs." }
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
      <AcronymGenerator />
    </>
  );
}
