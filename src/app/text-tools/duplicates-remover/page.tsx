import type { Metadata } from "next";
import DuplicatesRemover from "../../../calculators/DuplicatesRemover";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Duplicates Remover - Remove Duplicate Lines Online",
  description: "Remove duplicate lines from text lists instantly. Clean up email lists, keywords, and data entries online for free.",
  keywords: ["remove duplicates", "duplicate line remover", "clean list", "remove repeated lines", "unique lines extractor"],
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
