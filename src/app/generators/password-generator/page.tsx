import type { Metadata } from "next";
import PasswordGenerator from "../../../calculators/PasswordGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Secure Password Generator - Strong Random Passwords Online",
  description: "Generate strong, secure, and random passwords instantly. Client-side tool that never sends your data to any server.",
  keywords: ["password generator", "strong password", "secure password", "random password generator", "generate secure password"],
  alternates: { canonical: "/generators/password-generator" },
  openGraph: {
    title: "Secure Password Generator - Strong Random Passwords Online | ToolZoneX",
    description: "Generate strong, secure, and random passwords instantly. Client-side tool that never sends your data to any server.",
    url: `${SITE_URL}/generators/password-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Secure Password Generator",
  "description": "Generate strong, secure, and random passwords instantly.",
  "url": `${SITE_URL}/generators/password-generator`,
  "applicationCategory": "SecurityApplication",
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
      <PasswordGenerator />
    </>
  );
}
