import type { Metadata } from "next";
import MorseCodeTranslator from "../../../calculators/MorseCodeTranslator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Morse Code Translator - Encode & Decode Online",
  description: "Translate plain text to Morse code or decode Morse code back to text instantly. Free online translator for International Morse Code.",
  keywords: ["morse code translator", "morse code decoder", "text to morse code", "morse code converter", "learn morse code"],
  alternates: { canonical: "/tools/morse-code-translator" },
  openGraph: {
    title: "Morse Code Translator - Encode & Decode Online | ToolZoneX",
    description: "Translate plain text to Morse code or decode Morse code back to text instantly.",
    url: `${SITE_URL}/tools/morse-code-translator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Morse Code Translator",
  "description": "Translate plain text to Morse code or decode Morse code back to text instantly.",
  "url": `${SITE_URL}/tools/morse-code-translator`,
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
      <MorseCodeTranslator />
    </>
  );
}
