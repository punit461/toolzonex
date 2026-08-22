import type { Metadata } from "next";
import RandomStringGenerator from "../../../calculators/RandomStringGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Random String Generator - Create Alphanumeric Strings Online",
  description: "Generate random alphanumeric strings securely online. Free bulk random text generator for passwords, tokens, and testing.",
  keywords: ["random string generator", "generate string", "alphanumeric generator", "random text generator", "secure string generator", "generate random alphanumeric", "random alphanumeric character generator", "generate string online", "random sting generator"],
  alternates: { canonical: "/generators/random-string-generator" },
  openGraph: {
    title: "Random String Generator - Create Alphanumeric Strings Online | ToolZoneX",
    description: "Generate random alphanumeric strings securely online. Free bulk random text generator.",
    url: `${SITE_URL}/generators/random-string-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Random String Generator",
  "description": "Generate random alphanumeric strings securely online.",
  "url": `${SITE_URL}/generators/random-string-generator`,
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
      <RandomStringGenerator />
    </>
  );
}
