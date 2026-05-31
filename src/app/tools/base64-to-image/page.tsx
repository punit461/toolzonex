import type { Metadata } from "next";
import Base64ToImageConverter from "../../../calculators/Base64ToImageConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Base64 to Image Converter - Decode Image Online",
  description: "Decode Base64 strings to image files instantly online. Preview and download PNG/JPEG from Base64 data.",
  keywords: ["base64 to image", "decode base64 image", "base64 decoder", "data uri to image", "base64 image viewer"],
  alternates: { canonical: "/tools/base64-to-image" },
  openGraph: {
    title: "Base64 to Image Converter - Decode Image Online | ToolZoneX",
    description: "Decode Base64 strings to image files instantly online. Preview and download PNG/JPEG from Base64 data.",
    url: `${SITE_URL}/tools/base64-to-image`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Base64 to Image Converter",
  "description": "Decode Base64 strings to image files instantly online.",
  "url": `${SITE_URL}/tools/base64-to-image`,
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
      <Base64ToImageConverter />
    </>
  );
}
