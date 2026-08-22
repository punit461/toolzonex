import type { Metadata } from "next";
import LeetspeakConverter from "../../../calculators/text-tools/LeetspeakConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Leetspeak Converter - Convert Text to 1337 Speak",
  description: "Convert text to leetspeak (1337 speak) with number substitutions and random casing. Free online text encoder.",
  keywords: ["leetspeak converter","1337 speak","leet translator","text to leetspeak","leet generator","l33t translator","leet name generator","leet username generator","1337 translator","leetspeak name generator","convert text to leet"],
  alternates: { canonical: "/text-tools/leetspeak-converter" },
  openGraph: {
    title: "Leetspeak Converter - Convert Text to 1337 Speak | ToolZoneX",
    description: "Convert text to leetspeak (1337 speak) with number substitutions and random casing. Free online text encoder.",
    url: `${SITE_URL}/text-tools/leetspeak-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LeetspeakConverter",
  "description": "Convert text to leetspeak (1337 speak) with number substitutions and random casing. Free online text encoder.",
  "url": `${SITE_URL}/text-tools/leetspeak-converter`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I convert leetspeak back to normal text?",
      "acceptedAnswer": { "@type": "Answer", "text": "Not with this tool — it's one-way, since number substitutions aren't always reversible unambiguously." }
    },
    {
      "@type": "Question",
      "name": "Can I use this as a leet name generator for my username?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — type your name (or any word) into the input box and convert it; the result is a ready-to-use 1337-style name or gamertag." }
    },
    {
      "@type": "Question",
      "name": "Why does the same input give different output each time?",
      "acceptedAnswer": { "@type": "Answer", "text": "The random-case option randomizes on every conversion — turn it off for consistent, repeatable output." }
    },
    {
      "@type": "Question",
      "name": "Is my text uploaded anywhere?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — conversion happens entirely in your browser." }
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
      <LeetspeakConverter />
    </>
  );
}
