import type { Metadata } from "next";
import FaceShapeDetector from "../../../calculators/faceshape/FaceShapeDetector";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Face Shape Calculator - Detect Your Face Shape Free",
  description: "Upload a photo to estimate your face shape -- Oval, Round, Square, Heart, Diamond, or Oblong. Free face shape calculator that runs entirely in your browser.",
  keywords: ["face shape detector","what is my face shape","face shape calculator","find my face shape online","face measurement tool","faceshape finder online","determine face shape online","face shape calculator female","face shape calculator online free"],
  alternates: { canonical: "/tools/face-shape-detector" },
  openGraph: {
    title: "Face Shape Calculator - Detect Your Face Shape Free | ToolZoneX",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is my photo uploaded to a server?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — face detection and measurement both run entirely in your browser using an on-device model. Your photo never leaves your device." }
    },
    {
      "@type": "Question",
      "name": "How accurate is this face shape calculator?",
      "acceptedAnswer": { "@type": "Answer", "text": "This is a proportion-based estimate, like most face-shape tools (including commercial ones) — it's meant to be informative and fun, not a precise medical or biometric measurement." }
    },
    {
      "@type": "Question",
      "name": "Why didn't it detect a face?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use a clear, front-facing, well-lit photo where your whole face is visible, without sunglasses or heavy shadows." }
    },
    {
      "@type": "Question",
      "name": "Is this the same as the Omni face shape calculator?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — this is ToolZoneX's own free face shape calculator, a separate tool from Omni Calculator's face shape calculator. Both work on the same general idea of estimating a face shape from proportions, but this one runs entirely in your browser using on-device photo measurement rather than manual inputs." }
    },
    {
      "@type": "Question",
      "name": "Does this work as a face shape calculator for women and men?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — the measurement is based on facial geometry (length, cheekbone width, jaw width, forehead width), not gender, so it works the same way as a face shape calculator for any face, male or female." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaceShapeDetector />
    </>
  );
}
