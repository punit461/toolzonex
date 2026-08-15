import type { Metadata } from "next";
import FaceShapeDetector from "../../../calculators/faceshape/FaceShapeDetector";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Face Shape Detector - Find Your Face Shape Free",
  description: "Upload a photo to estimate your face shape -- Oval, Round, Square, Heart, Diamond, or Oblong. Runs entirely in your browser.",
  keywords: ["face shape detector","what is my face shape","face shape calculator","find my face shape online"],
  alternates: { canonical: "/tools/face-shape-detector" },
  openGraph: {
    title: "Face Shape Detector - Find Your Face Shape Free | ToolZoneX",
    description: "Upload a photo to estimate your face shape -- Oval, Round, Square, Heart, Diamond, or Oblong. Runs entirely in your browser.",
    url: `${SITE_URL}/tools/face-shape-detector`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "FaceShapeDetector",
  "description": "Upload a photo to estimate your face shape -- Oval, Round, Square, Heart, Diamond, or Oblong. Runs entirely in your browser.",
  "url": `${SITE_URL}/tools/face-shape-detector`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <FaceShapeDetector />
    </>
  );
}
