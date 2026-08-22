import type { Metadata } from "next";
import PxToRemConverter from "../../../calculators/PxToRemConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "PX to REM Converter - Free Online CSS Tool",
  description: "Convert px to rem instantly for responsive CSS. Includes a 16px to rem reference table (12px, 14px, 16px, 18px, 20px, 24px, 32px, 38px, 120px) plus adjustable base font size.",
  keywords: ["px to rem", "pixels to rem", "css unit converter", "rem calculator", "responsive web design", "px to rem converter", "16px in rem", "120 px to rem", "18px to rem", "12px in rem", "20px in rem", "38px to rem", "24px to rem", "16px to rem", "px to rem calculator"],
  alternates: { canonical: "/converters/px-to-rem-converter" },
  openGraph: {
    title: "PX to REM Converter - Free Online CSS Tool | ToolZoneX",
    description: "Convert Pixels (px) to REM units instantly for responsive CSS web design.",
    url: `${SITE_URL}/converters/px-to-rem-converter`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PX to REM Converter",
  "description": "Convert Pixels (px) to REM units instantly for responsive CSS web design.",
  "url": `${SITE_URL}/converters/px-to-rem-converter`,
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is 16px in rem?",
      "acceptedAnswer": { "@type": "Answer", "text": "16px equals 1rem, assuming the default 16px root font size — since rem = px ÷ root font size, and 16 ÷ 16 = 1." }
    },
    {
      "@type": "Question",
      "name": "How do I convert px to rem?",
      "acceptedAnswer": { "@type": "Answer", "text": "Divide the pixel value by the root font size (16px by default, unless your project sets a different base). The formula is: rem = px ÷ root font size. For example, 24px ÷ 16px = 1.5rem." }
    },
    {
      "@type": "Question",
      "name": "What is 120px in rem?",
      "acceptedAnswer": { "@type": "Answer", "text": "120px equals 7.5rem at the standard 16px root font size (120 ÷ 16 = 7.5)." }
    },
    {
      "@type": "Question",
      "name": "What is 18px to rem, and other common sizes?",
      "acceptedAnswer": { "@type": "Answer", "text": "At the default 16px root font size: 12px = 0.75rem, 14px = 0.875rem, 16px = 1rem, 18px = 1.125rem, 20px = 1.25rem, 24px = 1.5rem, 32px = 2rem, and 38px = 2.375rem." }
    },
    {
      "@type": "Question",
      "name": "What if my project's root font size isn't 16px?",
      "acceptedAnswer": { "@type": "Answer", "text": "Enter your custom root font size in the base font size slider or field above, and every conversion — including the quick reference table — recalculates using rem = px ÷ your custom base, instead of the default 16px." }
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
      <PxToRemConverter />
    </>
  );
}
