import type { Metadata } from "next";
import BinaryConverter from "../../../calculators/BinaryConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Binary to Text Converter - Translate Binary Code Online",
  description: "Easily convert binary code to plain text or encode text into binary. Free online binary translation tool.",
  keywords: ["binary to text", "text to binary", "binary translator", "binary decoder", "binary code converter"],
  alternates: { canonical: "/converters/binary-to-text" },
  openGraph: {
    title: "Binary to Text Converter - Translate Binary Code Online | ToolZoneX",
    description: "Easily convert binary code to plain text or encode text into binary.",
    url: `${SITE_URL}/converters/binary-to-text`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Binary to Text Converter",
  "description": "Easily convert binary code to plain text or encode text into binary.",
  "url": `${SITE_URL}/converters/binary-to-text`,
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
      <BinaryConverter />
    </>
  );
}
