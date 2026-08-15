import type { Metadata } from "next";
import SplitPdf from "../../../calculators/pdf/SplitPdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Split PDF - Split PDF Files Online Free",
  description: "Split a PDF into multiple files at the page numbers you choose. Free, private, runs entirely in your browser.",
  keywords: ["split pdf","divide pdf","pdf splitter free","split pdf pages"],
  alternates: { canonical: "/tools/split-pdf" },
  openGraph: {
    title: "Split PDF - Split PDF Files Online Free | ToolZoneX",
    description: "Split a PDF into multiple files at the page numbers you choose. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/split-pdf`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SplitPdf",
  "description": "Split a PDF into multiple files at the page numbers you choose. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/split-pdf`,
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
      <SplitPdf />
    </>
  );
}
