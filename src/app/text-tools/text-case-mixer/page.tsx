import type { Metadata } from "next";
import TextCaseMixer from "../../../calculators/text-tools/TextCaseMixer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Text Case Mixer - Random & Alternating Case Generator",
  description: "Convert text into random case, alternating case, or inverse case. Free online mocking meme text generator.",
  keywords: ["text case mixer", "random case generator", "mocking spongebob text", "alternating case", "inverse case", "meme text generator"],
  alternates: { canonical: "/text-tools/text-case-mixer" },
  openGraph: {
    title: "Text Case Mixer - Random & Alternating Case Generator | ToolZoneX",
    description: "Convert text into random case, alternating case, or inverse case.",
    url: `${SITE_URL}/text-tools/text-case-mixer`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Case Mixer",
  "description": "Convert text into random case, alternating case, or inverse case.",
  "url": `${SITE_URL}/text-tools/text-case-mixer`,
  "applicationCategory": "UtilityApplication",
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
      <TextCaseMixer />
    </>
  );
}
