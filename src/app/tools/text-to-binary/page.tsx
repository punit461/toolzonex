import type { Metadata } from "next";
import BinaryConverter from "../../../calculators/BinaryConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Text to Binary Converter - Encode Text to Binary Online",
  description: "Easily convert plain text into binary code or decode binary back to text. Free online binary encoding tool.",
  keywords: ["text to binary", "binary to text", "binary encoder", "binary generator", "convert text to binary"],
  alternates: { canonical: "/tools/text-to-binary" },
  openGraph: {
    title: "Text to Binary Converter - Encode Text to Binary Online | ToolZoneX",
    description: "Easily convert plain text into binary code or decode binary back to text.",
    url: `${SITE_URL}/tools/text-to-binary`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text to Binary Converter",
  "description": "Easily convert plain text into binary code or decode binary back to text.",
  "url": `${SITE_URL}/tools/text-to-binary`,
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
