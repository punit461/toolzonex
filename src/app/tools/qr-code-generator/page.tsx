import type { Metadata } from "next";
import QrCodeGenerator from "../../../calculators/qr/QrCodeGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "QR Code Generator - Create Custom QR Codes with Logo, WiFi, vCard, UPI",
  description: "Generate QR codes for URLs, WiFi, vCard, UPI, WhatsApp, email, crypto and more. Custom dot styles, colors, logo upload. Free PNG/SVG/JPEG download.",
  keywords: ["qr code generator", "qr code with logo", "wifi qr code", "vcard qr code", "upi qr code", "custom qr code", "qr code maker", "free qr code", "qr code styles", "whatsapp qr code"],
  alternates: { canonical: "/tools/qr-code-generator" },
  openGraph: {
    title: "QR Code Generator - Custom Styles, Logo, WiFi, vCard, UPI | ToolZoneX",
    description: "Generate QR codes for URLs, WiFi, vCard, UPI, WhatsApp, email and more. Custom dot styles, colors, logo upload. Free PNG/SVG/JPEG download.",
    url: `${SITE_URL}/tools/qr-code-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "QR Code Generator",
  "description": "Create custom QR codes online instantly. Customize colors and size, and download high-quality PNGs for free.",
  "url": `${SITE_URL}/tools/qr-code-generator`,
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
      <QrCodeGenerator />
    </>
  );
}
