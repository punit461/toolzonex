import type { Metadata } from "next";
import WordToPdf from "../../../calculators/pdf/WordToPdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Word to PDF - Convert DOCX to PDF Free Online",
  description: "Convert a .docx Word document into a PDF. Free, private, runs entirely in your browser.",
  keywords: ["word to pdf","docx to pdf","convert word to pdf free","doc to pdf converter"],
  alternates: { canonical: "/tools/word-to-pdf" },
  openGraph: {
    title: "Word to PDF - Convert DOCX to PDF Free Online | ToolZoneX",
    description: "Convert a .docx Word document into a PDF. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/word-to-pdf`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "WordToPdf",
  "description": "Convert a .docx Word document into a PDF. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/word-to-pdf`,
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
      <WordToPdf />
    </>
  );
}
