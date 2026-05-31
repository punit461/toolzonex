import type { Metadata } from "next";
import TextCaseMixer from "../../../calculators/TextCaseMixer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Text Case Mixer - Random & Alternating Case Generator",
  description: "Convert text into random case, alternating case, or inverse case. Free online mocking meme text generator.",
  keywords: ["text case mixer", "random case generator", "mocking spongebob text", "alternating case", "inverse case", "meme text generator"],
  alternates: { canonical: "/tools/text-case-mixer" },
  openGraph: {
    title: "Text Case Mixer - Random & Alternating Case Generator | ToolZoneX",
    description: "Convert text into random case, alternating case, or inverse case.",
    url: `${SITE_URL}/tools/text-case-mixer`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Case Mixer",
  "description": "Convert text into random case, alternating case, or inverse case.",
  "url": `${SITE_URL}/tools/text-case-mixer`,
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
