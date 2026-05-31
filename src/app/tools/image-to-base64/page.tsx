import type { Metadata } from "next";
import ImageToBase64Converter from "../../../calculators/ImageToBase64Converter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Image to Base64 Converter - Encode Image Online",
  description: "Encode image files to Base64 strings instantly. Fast, free online image to data URI converter.",
  keywords: ["image to base64", "encode image to base64", "base64 encoder", "image to data uri", "image to string"],
  alternates: { canonical: "/tools/image-to-base64" },
  openGraph: {
    title: "Image to Base64 Converter - Encode Image Online | ToolZoneX",
    description: "Encode image files to Base64 strings instantly. Fast, free online image to data URI converter.",
    url: `${SITE_URL}/tools/image-to-base64`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Image to Base64 Converter",
  "description": "Encode image files to Base64 strings instantly.",
  "url": `${SITE_URL}/tools/image-to-base64`,
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
      <ImageToBase64Converter />
    </>
  );
}
