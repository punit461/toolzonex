import type { Metadata } from "next";
import CsvToPdf from "../../../calculators/pdf/CsvToPdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "CSV to PDF - Convert CSV to PDF Table Free",
  description: "Convert a CSV file into a simple PDF table. Free, private, runs entirely in your browser.",
  keywords: ["csv to pdf","csv to pdf converter","convert spreadsheet to pdf","csv convert to pdf"],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does it preserve cell formatting or formulas?",
      "acceptedAnswer": { "@type": "Answer", "text": "No, this is a plain-text table conversion — formulas, colors, and formatting from the original spreadsheet aren't preserved." }
    },
    {
      "@type": "Question",
      "name": "Is my file uploaded anywhere?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — conversion happens entirely in your browser." }
    },
    {
      "@type": "Question",
      "name": "How do I csv convert to pdf on this page?",
      "acceptedAnswer": { "@type": "Answer", "text": "Upload your .csv file using the file picker, then click \"Convert to PDF\" — the file downloads automatically as a landscape PDF table with the first row bolded as a header." }
    },
    {
      "@type": "Question",
      "name": "Is there a size or row limit for the CSV file?",
      "acceptedAnswer": { "@type": "Answer", "text": "There's no hard limit — the tool adds new pages automatically as rows fill the page, so a large CSV will simply produce a multi-page PDF." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CsvToPdf />
    </>
  );
}
