import type { Metadata } from "next";
import MorseCodeTranslator from "../../../calculators/converters/MorseCodeTranslator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Morse Code Translator - Encode & Decode Online",
  description: "Translate plain text to Morse code or decode Morse code back to text instantly. Free online translator for International Morse Code.",
  keywords: ["morse code translator", "morse code decoder", "text to morse code", "morse code converter", "learn morse code", "mos code translator", "translate morse code", "morse code to text", "morse to text translator", "morse code translator online", "morse code text translator", "how to translate morse code"],
  alternates: { canonical: "/converters/morse-code-translator" },
  openGraph: {
    title: "Morse Code Translator - Encode & Decode Online | ToolZoneX",
    description: "Translate plain text to Morse code or decode Morse code back to text instantly.",
    url: `${SITE_URL}/converters/morse-code-translator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Morse Code Translator",
  "description": "Translate plain text to Morse code or decode Morse code back to text instantly.",
  "url": `${SITE_URL}/converters/morse-code-translator`,
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
      "name": "How are words separated in Morse code?",
      "acceptedAnswer": { "@type": "Answer", "text": "Letters within a word are separated by a single space, and words are separated by a forward slash (/)." }
    },
    {
      "@type": "Question",
      "name": "How do I translate Morse code back into text?",
      "acceptedAnswer": { "@type": "Answer", "text": "Switch to \"decode\" mode, paste the Morse code (dots and dashes, with letters separated by spaces and words separated by a slash) into the input box, and click \"Translate to Text\" — the plain-text result appears on the right, ready to copy." }
    },
    {
      "@type": "Question",
      "name": "How do I translate text into Morse code?",
      "acceptedAnswer": { "@type": "Answer", "text": "Switch to \"encode\" mode, type or paste your message, and click \"Translate to Morse\" — each letter, number, and common punctuation mark is converted to its dot-dash equivalent." }
    },
    {
      "@type": "Question",
      "name": "Is this the same as a \"mos code\" translator?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — \"mos code\" is a common misspelling of \"Morse code.\" This translator works the same way no matter how you search for it: paste your text or code and hit translate." }
    },
    {
      "@type": "Question",
      "name": "Is this Morse code translator free to use?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — translation happens instantly in your browser, it's completely free to use, and no signup or installation is required." }
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
      <MorseCodeTranslator />
    </>
  );
}
