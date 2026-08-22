import type { Metadata } from "next";
import TextSorter from "../../../calculators/text-tools/TextSorter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Text Sorter - Sort Lines Alphabetically Online",
  description: "Sort lists alphabetically or by line length. Easily arrange your text in alphabetical order (A-Z or Z-A). Free online text sorter.",
  keywords: ["text sorter", "sort alphabetically", "alphabetical order", "sort list online", "A-Z sorter", "sort by length"],
  alternates: { canonical: "/text-tools/text-sorter" },
  openGraph: {
    title: "Text Sorter - Sort Lines Alphabetically Online | ToolZoneX",
    description: "Sort lists alphabetically or by line length. Easily arrange your text in alphabetical order (A-Z or Z-A). Free online text sorter.",
    url: `${SITE_URL}/text-tools/text-sorter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Sorter",
  "description": "Sort lists alphabetically or by line length. Easily arrange your text in alphabetical order (A-Z or Z-A).",
  "url": `${SITE_URL}/text-tools/text-sorter`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <TextSorter />
    </>
  );
}
