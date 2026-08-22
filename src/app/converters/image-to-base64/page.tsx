import type { Metadata } from "next";
import ImageToBase64Converter from "../../../calculators/converters/ImageToBase64Converter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Image to Base64 Converter - Encode Image Online",
  description: "Encode image files to Base64 strings instantly. Fast, free online image to data URI converter.",
  keywords: ["image to base64", "encode image to base64", "base64 encoder", "image to data uri", "image to string"],
  alternates: { canonical: "/converters/image-to-base64" },
  openGraph: {
    title: "Image to Base64 Converter - Encode Image Online | ToolZoneX",
    description: "Encode image files to Base64 strings instantly. Fast, free online image to data URI converter.",
    url: `${SITE_URL}/converters/image-to-base64`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Image to Base64 Converter",
  "description": "Encode image files to Base64 strings instantly.",
  "url": `${SITE_URL}/converters/image-to-base64`,
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
