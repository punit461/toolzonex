import type { Metadata } from "next";
import ExcelToPdf from "../../../calculators/pdf/ExcelToPdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Excel to PDF - Convert XLSX to PDF Free Online",
  description: "Convert an Excel spreadsheet into a PDF table. Free, private, runs entirely in your browser.",
  keywords: ["excel to pdf","xlsx to pdf","convert excel to pdf free","spreadsheet to pdf"],
  alternates: { canonical: "/tools/excel-to-pdf" },
  openGraph: {
    title: "Excel to PDF - Convert XLSX to PDF Free Online | ToolZoneX",
    description: "Convert an Excel spreadsheet into a PDF table. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/excel-to-pdf`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ExcelToPdf",
  "description": "Convert an Excel spreadsheet into a PDF table. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/excel-to-pdf`,
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
      <ExcelToPdf />
    </>
  );
}
