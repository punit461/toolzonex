import type { Metadata } from "next";
import TextEncryptionDecryption from "../../../calculators/TextEncryptionDecryption";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Text Encryption & Decryption - Base64, ROT13, Hex Online",
  description: "Encrypt or decrypt text using Base64, ROT13, and Hexadecimal algorithms. Free secure online string cipher tool.",
  keywords: ["text encryption", "base64 encode", "base64 decode", "rot13 cipher", "hex encoder", "online text decoder"],
  alternates: { canonical: "/tools/text-encryption-decryption" },
  openGraph: {
    title: "Text Encryption & Decryption - Base64, ROT13, Hex Online | ToolZoneX",
    description: "Encrypt or decrypt text using Base64, ROT13, and Hexadecimal algorithms. Free secure online string cipher tool.",
    url: `${SITE_URL}/tools/text-encryption-decryption`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Text Encryption & Decryption",
  "description": "Encrypt or decrypt text using Base64, ROT13, and Hexadecimal algorithms.",
  "url": `${SITE_URL}/tools/text-encryption-decryption`,
  "applicationCategory": "UtilityApplication",
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
      <TextEncryptionDecryption />
    </>
  );
}
