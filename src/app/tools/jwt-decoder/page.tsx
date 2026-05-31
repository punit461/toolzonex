import type { Metadata } from "next";
import JwtDecoder from "../../../calculators/JwtDecoder";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "JWT Decoder - Secure Online Token Viewer",
  description: "Decode JSON Web Tokens (JWT) safely and securely in your browser. Free online developer tool with no server-side tracking.",
  keywords: ["jwt decoder", "json web token decoder", "decode jwt online", "jwt viewer", "jwt parser"],
  alternates: { canonical: "/tools/jwt-decoder" },
  openGraph: {
    title: "JWT Decoder - Secure Online Token Viewer | ToolZoneX",
    description: "Decode JSON Web Tokens (JWT) safely and securely in your browser.",
    url: `${SITE_URL}/tools/jwt-decoder`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JWT Decoder",
  "description": "Decode JSON Web Tokens (JWT) safely and securely in your browser.",
  "url": `${SITE_URL}/tools/jwt-decoder`,
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
      <JwtDecoder />
    </>
  );
}
