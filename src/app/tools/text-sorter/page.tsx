import type { Metadata } from "next";
import TextSorter from "../../../calculators/TextSorter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Text Sorter - Sort Lines Alphabetically Online",
  description: "Sort lists alphabetically or by line length. Easily arrange your text in alphabetical order (A-Z or Z-A). Free online text sorter.",
  keywords: ["text sorter", "sort alphabetically", "alphabetical order", "sort list online", "A-Z sorter", "sort by length"],
  alternates: { canonical: "/tools/text-sorter" },
  openGraph: {
    title: "Text Sorter - Sort Lines Alphabetically Online | ToolZoneX",
    description: "Sort lists alphabetically or by line length. Easily arrange your text in alphabetical order (A-Z or Z-A). Free online text sorter.",
    url: `${SITE_URL}/tools/text-sorter`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Sorter",
  "description": "Sort lists alphabetically or by line length. Easily arrange your text in alphabetical order (A-Z or Z-A).",
  "url": `${SITE_URL}/tools/text-sorter`,
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
