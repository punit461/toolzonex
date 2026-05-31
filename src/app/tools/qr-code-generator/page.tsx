import type { Metadata } from "next";
import QrCodeGenerator from "../../../calculators/QrCodeGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "QR Code Generator - Create Custom QR Codes Online",
  description: "Create custom QR codes online instantly. Customize colors and size, and download high-quality PNGs for free.",
  keywords: ["qr code generator", "create qr code", "custom qr code", "qr code maker", "free qr code"],
  alternates: { canonical: "/tools/qr-code-generator" },
  openGraph: {
    title: "QR Code Generator - Create Custom QR Codes Online | ToolZoneX",
    description: "Create custom QR codes online instantly. Customize colors and size, and download high-quality PNGs for free.",
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
