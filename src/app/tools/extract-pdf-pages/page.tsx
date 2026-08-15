import type { Metadata } from "next";
import ExtractPdfPages from "../../../calculators/pdf/ExtractPdfPages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Extract PDF Pages - Pull Pages from PDF Free",
  description: "Pull specific pages out of a PDF into a new file. Free, private, runs entirely in your browser.",
  keywords: ["extract pdf pages","pull pages from pdf","pdf page extractor"],
  alternates: { canonical: "/tools/extract-pdf-pages" },
  openGraph: {
    title: "Extract PDF Pages - Pull Pages from PDF Free | ToolZoneX",
    description: "Pull specific pages out of a PDF into a new file. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/extract-pdf-pages`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ExtractPdfPages",
  "description": "Pull specific pages out of a PDF into a new file. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/extract-pdf-pages`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <ExtractPdfPages />
    </>
  );
}
