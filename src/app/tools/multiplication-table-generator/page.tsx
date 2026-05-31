import type { Metadata } from "next";
import MultiplicationTableGenerator from "../../../calculators/MultiplicationTableGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Multiplication Table Generator - Print Times Tables Online",
  description: "Instantly generate and print custom multiplication times tables for students and teachers. Free educational math tool.",
  keywords: ["multiplication table", "times table generator", "print times tables", "math tables", "multiplication chart"],
  alternates: { canonical: "/tools/multiplication-table-generator" },
  openGraph: {
    title: "Multiplication Table Generator - Print Times Tables Online | ToolZoneX",
    description: "Instantly generate and print custom multiplication times tables for students and teachers.",
    url: `${SITE_URL}/tools/multiplication-table-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Multiplication Table Generator",
  "description": "Instantly generate and print custom multiplication times tables for students and teachers.",
  "url": `${SITE_URL}/tools/multiplication-table-generator`,
  "applicationCategory": "EducationalApplication",
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
      <MultiplicationTableGenerator />
    </>
  );
}
