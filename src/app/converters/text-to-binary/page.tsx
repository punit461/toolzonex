import type { Metadata } from "next";
import BinaryConverter from "../../../calculators/converters/BinaryConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Text to Binary Converter - Encode Text to Binary Online",
  description: "Easily convert plain text into binary code or decode binary back to text. Free online binary encoding tool.",
  keywords: ["text to binary", "binary to text", "binary encoder", "binary generator", "convert text to binary"],
  alternates: { canonical: "/converters/text-to-binary" },
  openGraph: {
    title: "Text to Binary Converter - Encode Text to Binary Online | ToolZoneX",
    description: "Easily convert plain text into binary code or decode binary back to text.",
    url: `${SITE_URL}/converters/text-to-binary`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text to Binary Converter",
  "description": "Easily convert plain text into binary code or decode binary back to text.",
  "url": `${SITE_URL}/converters/text-to-binary`,
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  // Uses the exact same component as binary-to-text since it has a toggle
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <BinaryConverter />
    </>
  );
}
