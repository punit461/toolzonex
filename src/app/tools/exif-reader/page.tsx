import type { Metadata } from "next";
import ExifReader from "../../../calculators/ExifReader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "EXIF Reader - Read Image Metadata Online",
  description: "Read and display EXIF metadata from images. Free online EXIF reader tool to extract camera settings, GPS coordinates, and image information.",
  keywords: ["EXIF reader", "read image metadata", "EXIF data", "image metadata", "camera settings", "GPS coordinates", "photo information", "EXIF viewer"],
  alternates: { canonical: "/tools/exif-reader" },
  openGraph: {
    title: "EXIF Reader - Read Image Metadata Online | ToolZoneX",
    description: "Read and display EXIF metadata from images. Free online EXIF reader tool to extract camera settings, GPS coordinates, and image information.",
    url: `${SITE_URL}/tools/exif-reader`,
    type: "article",
  },
};

const exifReaderSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "EXIF Reader",
  "description": "Read and display EXIF metadata from images. Free online EXIF reader tool to extract camera settings, GPS coordinates, and image information.",
  "url": `${SITE_URL}/tools/exif-reader`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(exifReaderSchema) }}
      />
      <ExifReader />
    </>
  );
}