import type { Metadata } from "next";
import UUIDGenerator from "../../../calculators/generators/UUIDGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "UUID / GUID Generator - Create Secure v4 UUIDs Online",
  description: "Generate cryptographically secure v4 UUIDs instantly online. Free bulk UUID generator using secure web cryptography.",
  keywords: ["uuid generator", "guid generator", "v4 uuid", "generate uuid", "bulk uuid generator"],
  alternates: { canonical: "/generators/uuid-generator" },
  openGraph: {
    title: "UUID / GUID Generator - Create Secure v4 UUIDs Online | ToolZoneX",
    description: "Generate cryptographically secure v4 UUIDs instantly online.",
    url: `${SITE_URL}/generators/uuid-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "UUID / GUID Generator",
  "description": "Generate cryptographically secure v4 UUIDs instantly online.",
  "url": `${SITE_URL}/generators/uuid-generator`,
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
