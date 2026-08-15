import type { Metadata } from "next";
import NumberPdfPages from "../../../calculators/pdf/NumberPdfPages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Add Page Numbers to PDF Free Online",
  description: "Add page numbers to every page in a PDF. Free, private, runs entirely in your browser.",
  keywords: ["add page numbers to pdf","pdf page numbering","number pdf pages"],
  alternates: { canonical: "/tools/number-pdf-pages" },
  openGraph: {
    title: "Add Page Numbers to PDF Free Online | ToolZoneX",
    description: "Add page numbers to every page in a PDF. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/number-pdf-pages`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "NumberPdfPages",
  "description": "Add page numbers to every page in a PDF. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/number-pdf-pages`,
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
      <NumberPdfPages />
    </>
  );
}
