import type { Metadata } from "next";
import HtmlToPdf from "../../../calculators/pdf/HtmlToPdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "HTML to PDF - Convert HTML to PDF Free Online",
  description: "Convert HTML markup into a PDF document. Free, private, runs entirely in your browser.",
  keywords: ["html to pdf","convert html to pdf free","html to pdf converter online"],
  alternates: { canonical: "/tools/html-to-pdf" },
  openGraph: {
    title: "HTML to PDF - Convert HTML to PDF Free Online | ToolZoneX",
    description: "Convert HTML markup into a PDF document. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/html-to-pdf`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "HtmlToPdf",
  "description": "Convert HTML markup into a PDF document. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/html-to-pdf`,
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
      <HtmlToPdf />
    </>
  );
}
