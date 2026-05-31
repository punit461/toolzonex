import type { Metadata } from "next";
import RandomStringGenerator from "../../../calculators/RandomStringGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Random String Generator - Create Alphanumeric Strings Online",
  description: "Generate random alphanumeric strings securely online. Free bulk random text generator for passwords, tokens, and testing.",
  keywords: ["random string generator", "generate string", "alphanumeric generator", "random text generator", "secure string generator"],
  alternates: { canonical: "/tools/random-string-generator" },
  openGraph: {
    title: "Random String Generator - Create Alphanumeric Strings Online | ToolZoneX",
    description: "Generate random alphanumeric strings securely online. Free bulk random text generator.",
    url: `${SITE_URL}/tools/random-string-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Random String Generator",
  "description": "Generate random alphanumeric strings securely online.",
  "url": `${SITE_URL}/tools/random-string-generator`,
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
