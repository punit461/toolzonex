import type { Metadata } from "next";
import CsvToJsonConverter from "../../../calculators/CsvToJsonConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "CSV to JSON Converter - Free Online Data Tool",
  description: "Convert CSV data into a JSON array instantly. Free online data conversion tool for developers with export functionality.",
  keywords: ["csv to json", "convert csv to json", "excel to json", "online csv converter", "json exporter"],
  alternates: { canonical: "/tools/csv-to-json" },
  openGraph: {
    title: "CSV to JSON Converter - Free Online Data Tool | ToolZoneX",
    description: "Convert CSV data into a JSON array instantly.",
    url: `${SITE_URL}/tools/csv-to-json`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CSV to JSON Converter",
  "description": "Convert CSV data into a JSON array instantly.",
  "url": `${SITE_URL}/tools/csv-to-json`,
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <CsvToJsonConverter />
    </>
  );
}
