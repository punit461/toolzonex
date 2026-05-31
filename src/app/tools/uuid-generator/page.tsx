import type { Metadata } from "next";
import UUIDGenerator from "../../../calculators/UUIDGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "UUID / GUID Generator - Create Secure v4 UUIDs Online",
  description: "Generate cryptographically secure v4 UUIDs instantly online. Free bulk UUID generator using secure web cryptography.",
  keywords: ["uuid generator", "guid generator", "v4 uuid", "generate uuid", "bulk uuid generator"],
  alternates: { canonical: "/tools/uuid-generator" },
  openGraph: {
    title: "UUID / GUID Generator - Create Secure v4 UUIDs Online | ToolZoneX",
    description: "Generate cryptographically secure v4 UUIDs instantly online.",
    url: `${SITE_URL}/tools/uuid-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "UUID / GUID Generator",
  "description": "Generate cryptographically secure v4 UUIDs instantly online.",
  "url": `${SITE_URL}/tools/uuid-generator`,
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
      <UUIDGenerator />
    </>
  );
}
