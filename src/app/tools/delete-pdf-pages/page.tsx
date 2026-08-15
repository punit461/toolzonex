import type { Metadata } from "next";
import DeletePdfPages from "../../../calculators/pdf/DeletePdfPages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Delete PDF Pages - Remove Pages from PDF Free",
  description: "Remove specific pages from a PDF. Free, private, runs entirely in your browser.",
  keywords: ["delete pdf pages","remove pdf pages","pdf page remover"],
  alternates: { canonical: "/tools/delete-pdf-pages" },
  openGraph: {
    title: "Delete PDF Pages - Remove Pages from PDF Free | ToolZoneX",
    description: "Remove specific pages from a PDF. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/delete-pdf-pages`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "DeletePdfPages",
  "description": "Remove specific pages from a PDF. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/delete-pdf-pages`,
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
      <DeletePdfPages />
    </>
  );
}
