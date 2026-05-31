import type { Metadata } from "next";
import DuplicatesRemover from "../../../calculators/DuplicatesRemover";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Duplicates Remover - Remove Duplicate Lines Online",
  description: "Remove duplicate lines from text lists instantly. Clean up email lists, keywords, and data entries online for free.",
  keywords: ["remove duplicates", "duplicate line remover", "clean list", "remove repeated lines", "unique lines extractor"],
  alternates: { canonical: "/tools/duplicates-remover" },
  openGraph: {
    title: "Duplicates Remover - Remove Duplicate Lines Online | ToolZoneX",
    description: "Remove duplicate lines from text lists instantly. Clean up email lists, keywords, and data entries online for free.",
    url: `${SITE_URL}/tools/duplicates-remover`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Duplicates Remover",
  "description": "Remove duplicate lines from text lists instantly.",
  "url": `${SITE_URL}/tools/duplicates-remover`,
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
      <DuplicatesRemover />
    </>
  );
}
