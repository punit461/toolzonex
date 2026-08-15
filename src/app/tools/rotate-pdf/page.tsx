import type { Metadata } from "next";
import RotatePdf from "../../../calculators/pdf/RotatePdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Rotate PDF - Rotate PDF Pages Online Free",
  description: "Rotate all pages in a PDF by 90, 180, or 270 degrees. Free, private, runs entirely in your browser.",
  keywords: ["rotate pdf","rotate pdf pages","fix pdf orientation","turn pdf online"],
  alternates: { canonical: "/tools/rotate-pdf" },
  openGraph: {
    title: "Rotate PDF - Rotate PDF Pages Online Free | ToolZoneX",
    description: "Rotate all pages in a PDF by 90, 180, or 270 degrees. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/rotate-pdf`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "RotatePdf",
  "description": "Rotate all pages in a PDF by 90, 180, or 270 degrees. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/rotate-pdf`,
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
      <RotatePdf />
    </>
  );
}
