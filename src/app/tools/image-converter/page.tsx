import type { Metadata } from "next";
import ImageConverter from "../../../calculators/tools/ImageConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Image Converter - Convert PNG, JPEG, WebP Images",
  description: "Convert images between PNG, JPEG, and WebP formats. Free online image converter tool with quality settings and batch conversion.",
  keywords: ["image converter", "convert images", "png to jpeg", "jpeg to png", "webp converter", "image format converter", "batch image conversion", "image quality converter"],
  alternates: { canonical: "/tools/image-converter" },
  openGraph: {
    title: "Image Converter - Convert PNG, JPEG, WebP Images | ToolZoneX",
    description: "Convert images between PNG, JPEG, and WebP formats. Free online image converter tool with quality settings and batch conversion.",
    url: `${SITE_URL}/tools/image-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const imageConverterSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Image Converter",
  "description": "Convert images between PNG, JPEG, and WebP formats. Free online image converter tool with quality settings and batch conversion.",
  "url": `${SITE_URL}/tools/image-converter`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageConverterSchema) }}
      />
      <ImageConverter />
    </>
  );
}