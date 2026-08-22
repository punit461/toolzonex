import type { Metadata } from "next";
import ExifReader from "../../../calculators/tools/ExifReader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "EXIF Reader - Read Image Metadata Online",
  description: "Read and display EXIF metadata from images. Free online EXIF reader tool to extract camera settings, GPS coordinates, and image information.",
  keywords: ["EXIF reader", "read image metadata", "EXIF data", "image metadata", "camera settings", "GPS coordinates", "photo information", "EXIF viewer", "view exif online", "view exif data online", "check exif data online", "exif viewer online free"],
  alternates: { canonical: "/tools/exif-reader" },
  openGraph: {
    title: "EXIF Reader - Read Image Metadata Online | ToolZoneX",
    description: "Read and display EXIF metadata from images. Free online EXIF reader tool to extract camera settings, GPS coordinates, and image information.",
    url: `${SITE_URL}/tools/exif-reader`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does this tool upload my photo anywhere?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — the image and its metadata are read entirely in your browser and never leave your device." }
    },
    {
      "@type": "Question",
      "name": "Can I view EXIF online without installing any software?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — this page lets you view exif online directly: just select a photo from your device and the camera settings, timestamp, and GPS data (if present) appear instantly. Nothing to install, no account needed." }
    },
    {
      "@type": "Question",
      "name": "What image formats does this EXIF viewer support?",
      "acceptedAnswer": { "@type": "Answer", "text": "It reads EXIF metadata from JPEG, TIFF, and most RAW-derived formats exported by cameras and phones. PNG and WebP files usually don't carry EXIF data unless it was specifically preserved during export." }
    },
    {
      "@type": "Question",
      "name": "Why does my photo show no EXIF data?",
      "acceptedAnswer": { "@type": "Answer", "text": "Many apps and social platforms strip EXIF data on upload or export for privacy. Screenshots and edited/re-saved images also typically lose their original metadata." }
    },
    {
      "@type": "Question",
      "name": "Can I see GPS location data from a photo?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, if the photo has location data embedded (common on smartphones with location services enabled), the latitude and longitude coordinates are displayed alongside the other EXIF fields." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(exifReaderSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ExifReader />
    </>
  );
}