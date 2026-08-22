import type { Metadata } from "next";
import RandomDataGenerator from "../../../calculators/generators/RandomDataGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Random Data Generator - Fake Name & Address Maker Online",
  description: "Generate fake names, addresses, emails, and phone numbers for testing and mockups. Free online mock data generator.",
  keywords: ["random data generator", "fake name generator", "mock data generator", "fake address generator", "test data generator"],
  alternates: { canonical: "/generators/random-data-generator" },
  openGraph: {
    title: "Random Data Generator - Fake Name & Address Maker Online | ToolZoneX",
    description: "Generate fake names, addresses, emails, and phone numbers for testing and mockups.",
    url: `${SITE_URL}/generators/random-data-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Random Data Generator",
  "description": "Generate fake names, addresses, emails, and phone numbers for testing and mockups.",
  "url": `${SITE_URL}/generators/random-data-generator`,
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
      <RandomDataGenerator />
    </>
  );
}
