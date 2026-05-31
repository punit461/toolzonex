import type { Metadata } from "next";
import LoremIpsumGenerator from "../../../calculators/LoremIpsumGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Dummy Text Placeholder Online",
  description: "Generate standard dummy text for UI testing, mockups, and wireframes. Free online Lorem Ipsum placeholder text generator.",
  keywords: ["lorem ipsum", "dummy text generator", "placeholder text", "generate lorem ipsum", "mockup text"],
  alternates: { canonical: "/tools/lorem-ipsum-generator" },
  openGraph: {
    title: "Lorem Ipsum Generator - Dummy Text Placeholder Online | ToolZoneX",
    description: "Generate standard dummy text for UI testing, mockups, and wireframes. Free online Lorem Ipsum placeholder text generator.",
    url: `${SITE_URL}/tools/lorem-ipsum-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Lorem Ipsum Generator",
  "description": "Generate standard dummy text for UI testing, mockups, and wireframes.",
  "url": `${SITE_URL}/tools/lorem-ipsum-generator`,
  "applicationCategory": "DeveloperApplication",
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
      <LoremIpsumGenerator />
    </>
  );
}
