import type { Metadata } from "next";
import PxToRemConverter from "../../../calculators/PxToRemConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "PX to REM Converter - Free Online CSS Tool",
  description: "Convert Pixels (px) to REM units instantly for responsive CSS web design. Free online calculator with base size adjustment.",
  keywords: ["px to rem", "pixels to rem", "css unit converter", "rem calculator", "responsive web design"],
  alternates: { canonical: "/tools/px-to-rem-converter" },
  openGraph: {
    title: "PX to REM Converter - Free Online CSS Tool | ToolZoneX",
    description: "Convert Pixels (px) to REM units instantly for responsive CSS web design.",
    url: `${SITE_URL}/tools/px-to-rem-converter`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PX to REM Converter",
  "description": "Convert Pixels (px) to REM units instantly for responsive CSS web design.",
  "url": `${SITE_URL}/tools/px-to-rem-converter`,
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
      <PxToRemConverter />
    </>
  );
}
