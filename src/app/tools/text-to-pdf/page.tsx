import type { Metadata } from "next";
import TxtToPdf from "../../../calculators/pdf/TxtToPdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Text to PDF - Convert Text to PDF Free Online",
  description: "Convert plain text into a PDF document. Free, private, runs entirely in your browser.",
  keywords: ["text to pdf","txt to pdf converter","convert text to pdf online"],
  alternates: { canonical: "/tools/text-to-pdf" },
  openGraph: {
    title: "Text to PDF - Convert Text to PDF Free Online | ToolZoneX",
    description: "Convert plain text into a PDF document. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/text-to-pdf`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TxtToPdf",
  "description": "Convert plain text into a PDF document. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/text-to-pdf`,
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
      <TxtToPdf />
    </>
  );
}
