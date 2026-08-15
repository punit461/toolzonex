import type { Metadata } from "next";
import WatermarkPdf from "../../../calculators/pdf/WatermarkPdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Watermark PDF - Add Text Watermark Free Online",
  description: "Add a diagonal text watermark to every page of a PDF. Free, private, runs entirely in your browser.",
  keywords: ["watermark pdf","add watermark to pdf","pdf watermark tool"],
  alternates: { canonical: "/tools/watermark-pdf" },
  openGraph: {
    title: "Watermark PDF - Add Text Watermark Free Online | ToolZoneX",
    description: "Add a diagonal text watermark to every page of a PDF. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/watermark-pdf`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "WatermarkPdf",
  "description": "Add a diagonal text watermark to every page of a PDF. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/watermark-pdf`,
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
      <WatermarkPdf />
    </>
  );
}
