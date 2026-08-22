import type { Metadata } from "next";
import BinaryConverter from "../../../calculators/BinaryConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Binary to Text Converter - Translate Binary Code Online",
  description: "Easily convert binary code to plain text or encode text into binary. Free online binary translation tool.",
  keywords: ["binary to text", "text to binary", "binary translator", "binary decoder", "binary code converter", "binary code to text", "translator for binary", "bimary translator", "convert binary to text", "binary text converter", "binary to text converter online"],
  alternates: { canonical: "/converters/binary-to-text" },
  openGraph: {
    title: "Binary to Text Converter - Translate Binary Code Online | ToolZoneX",
    description: "Easily convert binary code to plain text or encode text into binary.",
    url: `${SITE_URL}/converters/binary-to-text`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Binary to Text Converter",
  "description": "Easily convert binary code to plain text or encode text into binary.",
  "url": `${SITE_URL}/converters/binary-to-text`,
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
      "name": "Why 8 bits per character?",
      "acceptedAnswer": { "@type": "Answer", "text": "8 bits (1 byte) can represent 256 values, enough to cover the standard ASCII character set used for basic English text and symbols." }
    },
    {
      "@type": "Question",
      "name": "How do I convert binary code to text?",
      "acceptedAnswer": { "@type": "Answer", "text": "Make sure the tool is in \"Binary to Text\" (decode) mode, paste your space-separated binary (e.g. 01001000 01100101) into the input box, and click \"Convert to Text\" — this acts as the translator for binary, turning each 8-bit group back into its matching character." }
    },
    {
      "@type": "Question",
      "name": "What format does the binary input need to be in?",
      "acceptedAnswer": { "@type": "Answer", "text": "Each character should be represented as an 8-bit binary group (only 0s and 1s), with a single space between groups — for example 01001000 01101001 decodes to \"Hi\". Binary that isn't space-separated or contains characters other than 0 and 1 will show an error." }
    },
    {
      "@type": "Question",
      "name": "Is \"bimary translator\" the same tool?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — \"bimary\" is a common typo for \"binary.\" This binary-to-text translator works the same either way: paste your binary or text and convert." }
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
      <BinaryConverter />
    </>
  );
}
