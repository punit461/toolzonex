import type { Metadata } from "next";
import ImageColorPicker from "../../../calculators/ImageColorPicker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Image Color Picker - Extract Colors from Photos",
  description: "Create custom color palettes from any image. Upload a photo and pick exact HEX colors straight from the pixels.",
  keywords: ["image color picker", "extract colors from image", "eyedropper tool", "color picker from photo", "image palette generator"],
  alternates: { canonical: "/tools/image-color-picker" },
  openGraph: {
    title: "Image Color Picker - Extract Colors from Photos | ToolZoneX",
    description: "Create custom color palettes from any image.",
    url: `${SITE_URL}/tools/image-color-picker`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Image Color Picker",
  "description": "Pick exact HEX colors from any uploaded image.",
  "url": `${SITE_URL}/tools/image-color-picker`,
  "applicationCategory": "DesignApplication",
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
      <ImageColorPicker />
    </>
  );
}
