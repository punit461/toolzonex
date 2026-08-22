import type { Metadata } from "next";
import LoremIpsumGenerator from "../../../calculators/generators/LoremIpsumGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Dummy Text Placeholder Online",
  description: "Generate standard dummy text for UI testing, mockups, and wireframes. Free online Lorem Ipsum placeholder text generator.",
  keywords: ["lorem ipsum", "dummy text generator", "placeholder text", "generate lorem ipsum", "mockup text"],
  alternates: { canonical: "/generators/lorem-ipsum-generator" },
  openGraph: {
    title: "Lorem Ipsum Generator - Dummy Text Placeholder Online | ToolZoneX",
    description: "Generate standard dummy text for UI testing, mockups, and wireframes. Free online Lorem Ipsum placeholder text generator.",
    url: `${SITE_URL}/generators/lorem-ipsum-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Lorem Ipsum Generator",
  "description": "Generate standard dummy text for UI testing, mockups, and wireframes.",
  "url": `${SITE_URL}/generators/lorem-ipsum-generator`,
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
