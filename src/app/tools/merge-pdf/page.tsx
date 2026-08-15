import type { Metadata } from "next";
import MergePdf from "../../../calculators/pdf/MergePdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Merge PDF - Combine PDF Files Online Free",
  description: "Combine multiple PDF files into one, in the order you choose. Free, private, runs entirely in your browser.",
  keywords: ["merge pdf","combine pdf files","join pdf online","pdf merger free"],
  alternates: { canonical: "/tools/merge-pdf" },
  openGraph: {
    title: "Merge PDF - Combine PDF Files Online Free | ToolZoneX",
    description: "Combine multiple PDF files into one, in the order you choose. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/merge-pdf`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "MergePdf",
  "description": "Combine multiple PDF files into one, in the order you choose. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/merge-pdf`,
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
      <MergePdf />
    </>
  );
}
