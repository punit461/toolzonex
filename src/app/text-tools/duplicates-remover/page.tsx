import type { Metadata } from "next";
import DuplicatesRemover from "../../../calculators/text-tools/DuplicatesRemover";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Duplicates Remover - Remove Duplicate Lines Online",
  description: "Remove duplicate lines from text lists instantly. Clean up email lists, keywords, and data entries online for free.",
  keywords: ["remove duplicates", "duplicate line remover", "clean list", "remove repeated lines", "unique lines extractor", "duplicate remove online", "delete duplicates online", "remove duplicates from list online", "online remove duplicates from list", "remove duplicate numbers", "duplicates remove"],
  alternates: { canonical: "/text-tools/duplicates-remover" },
  openGraph: {
    title: "Duplicates Remover - Remove Duplicate Lines Online | ToolZoneX",
    description: "Remove duplicate lines from text lists instantly. Clean up email lists, keywords, and data entries online for free.",
    url: `${SITE_URL}/text-tools/duplicates-remover`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Duplicates Remover",
  "description": "Remove duplicate lines from text lists instantly.",
  "url": `${SITE_URL}/text-tools/duplicates-remover`,
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
      "name": "How do I remove duplicates from a list online?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste your list into the input box (one item per line) and click \"Remove Duplicate Lines\". This tool works entirely in your browser, so there's nothing to install and nothing is uploaded — it's a fast way to remove duplicates from a list online for free." }
    },
    {
      "@type": "Question",
      "name": "How do I delete duplicates online for free?",
      "acceptedAnswer": { "@type": "Answer", "text": "This page is free to use with no sign-up: paste your text, click the button, and copy the cleaned result. It works for any plain-text list — names, emails, keywords, or codes." }
    },
    {
      "@type": "Question",
      "name": "Can I remove duplicate numbers with this tool?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — put one number per line and the tool removes duplicate numbers the same way it removes duplicate words or lines, keeping only the first occurrence of each." }
    },
    {
      "@type": "Question",
      "name": "Is this case-sensitive?",
      "acceptedAnswer": { "@type": "Answer", "text": "By default duplicates are matched exactly as typed — \"Apple\" and \"apple\" are treated as different lines unless case-insensitive matching is selected." }
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
      <DuplicatesRemover />
    </>
  );
}
