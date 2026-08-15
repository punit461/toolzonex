import type { Metadata } from "next";
import MultiplicationTableGenerator from "../../../calculators/MultiplicationTableGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Multiplication Table Generator - Print Times Tables Online",
  description: "Instantly generate and print custom multiplication times tables for students and teachers. Free educational math tool.",
  keywords: ["multiplication table", "times table generator", "print times tables", "math tables", "multiplication chart"],
  alternates: { canonical: "/generators/multiplication-table-generator" },
  openGraph: {
    title: "Multiplication Table Generator - Print Times Tables Online | ToolZoneX",
    description: "Instantly generate and print custom multiplication times tables for students and teachers.",
    url: `${SITE_URL}/generators/multiplication-table-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Multiplication Table Generator",
  "description": "Instantly generate and print custom multiplication times tables for students and teachers.",
  "url": `${SITE_URL}/generators/multiplication-table-generator`,
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
