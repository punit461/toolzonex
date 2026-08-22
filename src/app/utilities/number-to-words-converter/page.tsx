import type { Metadata } from "next";
import NumberToWordsConverter from "../../../calculators/utilities/NumberToWordsConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Number to Words Converter - Write Numbers in English Words",
  description: "Convert any whole number to English words instantly — see 23,698, 518,500, and 10,795 spelled out. Perfect for writing checks, legal documents, and large numbers.",
  keywords: [
    "number to words",
    "numbers to words converter",
    "how to spell number",
    "amount in words generator",
    "check writing number to words",
    "number to word english",
    "writing numbers to words",
    "numbers in words conversion",
    "numbers in words in english",
    "write in letters",
    "numbers to words in english",
    "spell out numbers",
    "write number in words",
    "convert number to words",
    "23698 in words",
    "518500 in words",
    "10795 in words",
    "367.5 in words",
    "decimal number to words",
  ],
  alternates: { canonical: "/utilities/number-to-words-converter" },
  openGraph: {
    title: "Number to Words Converter - Write Numbers in English Words | ToolZoneX",
    description: "Convert any whole number to English words instantly — see 23,698, 518,500, and 10,795 spelled out. Perfect for writing checks, legal documents, and large numbers.",
    url: `${SITE_URL}/utilities/number-to-words-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Number to Words Converter",
  "description": "Convert any whole number to English words instantly.",
  "url": `${SITE_URL}/utilities/number-to-words-converter`,
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
      "name": "How do I convert a number to words in English?",
      "acceptedAnswer": { "@type": "Answer", "text": "Type the number into the input field (digits only, commas are fine) and the English word form appears immediately in the results panel — no button press needed. This works the same whether you think of it as converting a number to words, writing a number in letters, or spelling a number out." }
    },
    {
      "@type": "Question",
      "name": "What is 23,698 in words?",
      "acceptedAnswer": { "@type": "Answer", "text": "23,698 in words is \"twenty-three thousand, six hundred ninety-eight\"." }
    },
    {
      "@type": "Question",
      "name": "What is 518,500 in words?",
      "acceptedAnswer": { "@type": "Answer", "text": "518,500 in words is \"five hundred eighteen thousand, five hundred\"." }
    },
    {
      "@type": "Question",
      "name": "What is 10,795 in words?",
      "acceptedAnswer": { "@type": "Answer", "text": "10,795 in words is \"ten thousand, seven hundred ninety-five\"." }
    },
    {
      "@type": "Question",
      "name": "Does this tool convert decimal numbers, like 367.5, to words?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — enter a decimal point and the digits after it are read out individually, the standard way decimals are spoken. 367.5 in words is \"three hundred sixty-seven point five\"." }
    },
    {
      "@type": "Question",
      "name": "What's the largest number this can convert?",
      "acceptedAnswer": { "@type": "Answer", "text": "The converter supports whole numbers up into the trillions (just under 1 quadrillion)." }
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
      <NumberToWordsConverter />
    </>
  );
}
