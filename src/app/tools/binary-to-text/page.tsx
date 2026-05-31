import type { Metadata } from "next";
import BinaryConverter from "../../../calculators/BinaryConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Binary to Text Converter - Translate Binary Code Online",
  description: "Easily convert binary code to plain text or encode text into binary. Free online binary translation tool.",
  keywords: ["binary to text", "text to binary", "binary translator", "binary decoder", "binary code converter"],
  alternates: { canonical: "/tools/binary-to-text" },
  openGraph: {
    title: "Binary to Text Converter - Translate Binary Code Online | ToolZoneX",
    description: "Easily convert binary code to plain text or encode text into binary.",
    url: `${SITE_URL}/tools/binary-to-text`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Binary to Text Converter",
  "description": "Easily convert binary code to plain text or encode text into binary.",
  "url": `${SITE_URL}/tools/binary-to-text`,
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
