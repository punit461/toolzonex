import type { Metadata } from "next";
import JpgToPdf from "../../../calculators/pdf/JpgToPdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "JPG to PDF - Convert Images to PDF Free",
  description: "Convert JPG or PNG images into a single PDF, one image per page. Free, private, runs entirely in your browser.",
  keywords: ["jpg to pdf","png to pdf","image to pdf converter free"],
  alternates: { canonical: "/tools/jpg-to-pdf" },
  openGraph: {
    title: "JPG to PDF - Convert Images to PDF Free | ToolZoneX",
    description: "Convert JPG or PNG images into a single PDF, one image per page. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/jpg-to-pdf`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JpgToPdf",
  "description": "Convert JPG or PNG images into a single PDF, one image per page. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/jpg-to-pdf`,
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
      <JpgToPdf />
    </>
  );
}
