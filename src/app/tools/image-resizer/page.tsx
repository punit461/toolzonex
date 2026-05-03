import type { Metadata } from "next";
import ImageResizer from "../../../calculators/ImageResizer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Image Resizer - Resize Photos in Browser",
  description: "Resize images online instantly while maintaining aspect ratio, with no uploads to servers.",
  keywords: ["image resizer", "resize photos online", "photo editor", "change image dimensions"],
  alternates: { canonical: "/tools/image-resizer" },
  openGraph: {
    title: "Image Resizer - Resize Photos in Browser | ToolZoneX",
    description: "Resize images online instantly while maintaining aspect ratio, with no uploads to servers.",
    url: `${SITE_URL}/tools/image-resizer`,
    type: "article",
  },
};

const imageResizerSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Image Resizer",
  "description": "Resize images online instantly while maintaining aspect ratio, with no uploads to servers.",
  "url": `${SITE_URL}/tools/image-resizer`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageResizerSchema) }}
      />
      <ImageResizer />
    </>
  );
}
