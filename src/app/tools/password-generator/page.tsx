import type { Metadata } from "next";
import PasswordGenerator from "../../../calculators/PasswordGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Secure Password Generator - Strong Random Passwords Online",
  description: "Generate strong, secure, and random passwords instantly. Client-side tool that never sends your data to any server.",
  keywords: ["password generator", "strong password", "secure password", "random password generator", "generate secure password"],
  alternates: { canonical: "/tools/password-generator" },
  openGraph: {
    title: "Secure Password Generator - Strong Random Passwords Online | ToolZoneX",
    description: "Generate strong, secure, and random passwords instantly. Client-side tool that never sends your data to any server.",
    url: `${SITE_URL}/tools/password-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Secure Password Generator",
  "description": "Generate strong, secure, and random passwords instantly.",
  "url": `${SITE_URL}/tools/password-generator`,
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
