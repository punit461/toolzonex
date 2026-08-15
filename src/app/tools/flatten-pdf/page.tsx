import type { Metadata } from "next";
import FlattenPdf from "../../../calculators/pdf/FlattenPdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Flatten PDF - Flatten Form Fields Free Online",
  description: "Flatten a PDF's fillable form fields into permanent page content. Free, private, runs entirely in your browser.",
  keywords: ["flatten pdf","flatten pdf form","lock pdf form fields"],
  alternates: { canonical: "/tools/flatten-pdf" },
  openGraph: {
    title: "Flatten PDF - Flatten Form Fields Free Online | ToolZoneX",
    description: "Flatten a PDF's fillable form fields into permanent page content. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/flatten-pdf`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "FlattenPdf",
  "description": "Flatten a PDF's fillable form fields into permanent page content. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/flatten-pdf`,
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
      <FlattenPdf />
    </>
  );
}
