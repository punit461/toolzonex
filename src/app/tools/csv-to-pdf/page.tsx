import type { Metadata } from "next";
import CsvToPdf from "../../../calculators/pdf/CsvToPdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "CSV to PDF - Convert CSV to PDF Table Free",
  description: "Convert a CSV file into a simple PDF table. Free, private, runs entirely in your browser.",
  keywords: ["csv to pdf","csv to pdf converter","convert spreadsheet to pdf"],
  alternates: { canonical: "/tools/csv-to-pdf" },
  openGraph: {
    title: "CSV to PDF - Convert CSV to PDF Table Free | ToolZoneX",
    description: "Convert a CSV file into a simple PDF table. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/csv-to-pdf`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CsvToPdf",
  "description": "Convert a CSV file into a simple PDF table. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/csv-to-pdf`,
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
      <CsvToPdf />
    </>
  );
}
