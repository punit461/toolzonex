import type { Metadata } from "next";
import LinePrefixSuffix from "../../../calculators/LinePrefixSuffixTool";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Add Prefix & Suffix to Lines Online - Text Formatting Tool",
  description: "Add text to the beginning or end of every line instantly. Free online list formatting tool for developers to add prefixes or suffixes to text lists.",
  keywords: ["line prefix tool", "add prefix to text", "add suffix to text", "add text to each line", "format list online"],
  alternates: { canonical: "/text-tools/line-prefix-suffix-tool" },
  openGraph: {
    title: "Add Prefix & Suffix to Lines Online - Text Formatting Tool | ToolZoneX",
    description: "Add text to the beginning or end of every line instantly. Free online list formatting tool.",
    url: `${SITE_URL}/text-tools/line-prefix-suffix-tool`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Line Prefix & Suffix Tool",
  "description": "Add text to the beginning or end of every line instantly.",
  "url": `${SITE_URL}/text-tools/line-prefix-suffix-tool`,
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
      "name": "How do I add a prefix to text?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste your text or list into the box, type the text you want at the start of every line into the \"Prefix\" field, and click \"Apply Prefix & Suffix\". To add a prefix to text without a suffix, just leave the suffix field empty." }
    },
    {
      "@type": "Question",
      "name": "Can I add both a prefix and suffix at once?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, set both fields and they'll be applied to every line simultaneously." }
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
      <LinePrefixSuffix />
    </>
  );
}
