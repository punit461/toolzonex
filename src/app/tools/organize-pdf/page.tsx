import type { Metadata } from "next";
import OrganizePdf from "../../../calculators/pdf/OrganizePdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Organize PDF - Reorder PDF Pages Online Free",
  description: "Reorder the pages in a PDF. Free, private, runs entirely in your browser.",
  keywords: ["organize pdf","reorder pdf pages","rearrange pdf pages"],
  alternates: { canonical: "/tools/organize-pdf" },
  openGraph: {
    title: "Organize PDF - Reorder PDF Pages Online Free | ToolZoneX",
    description: "Reorder the pages in a PDF. Free, private, runs entirely in your browser.",
    url: `${SITE_URL}/tools/organize-pdf`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "OrganizePdf",
  "description": "Reorder the pages in a PDF. Free, private, runs entirely in your browser.",
  "url": `${SITE_URL}/tools/organize-pdf`,
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
      <OrganizePdf />
    </>
  );
}
