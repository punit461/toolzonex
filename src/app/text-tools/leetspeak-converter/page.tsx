import type { Metadata } from "next";
import LeetspeakConverter from "../../../calculators/LeetspeakConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Leetspeak Converter - Convert Text to 1337 Speak",
  description: "Convert text to leetspeak (1337 speak) with number substitutions and random casing. Free online text encoder.",
  keywords: ["leetspeak converter","1337 speak","leet translator","text to leetspeak","leet generator"],
  alternates: { canonical: "/text-tools/leetspeak-converter" },
  openGraph: {
    title: "Leetspeak Converter - Convert Text to 1337 Speak | ToolZoneX",
    description: "Convert text to leetspeak (1337 speak) with number substitutions and random casing. Free online text encoder.",
    url: `${SITE_URL}/text-tools/leetspeak-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LeetspeakConverter",
  "description": "Convert text to leetspeak (1337 speak) with number substitutions and random casing. Free online text encoder.",
  "url": `${SITE_URL}/text-tools/leetspeak-converter`,
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
      <LeetspeakConverter />
    </>
  );
}
