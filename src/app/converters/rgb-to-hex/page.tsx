import type { Metadata } from "next";
import RgbToHexConverter from "../../../calculators/converters/RgbToHexConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "RGB to HEX Converter - Free Online Color Tool",
  description: "Convert RGB and RGBA color codes to HEX format instantly with interactive sliders. Free rgb to hex converter — get the hex code for any RGB color value in one click.",
  keywords: ["rgb to hex", "rgb converter", "rgba to hex", "hex generator", "color code converter", "conversion rgb hex", "rgb converter hex", "rgb color from hex", "color code to rgb value", "rgb hex", "to rgb", "rgb to hex converter", "rgb to hex color", "rgb value to hex code"],
  alternates: { canonical: "/converters/rgb-to-hex" },
  openGraph: {
    title: "RGB to HEX Converter - Free Online Color Tool | ToolZoneX",
    description: "Convert RGB and RGBA color codes to HEX format instantly.",
    url: `${SITE_URL}/converters/rgb-to-hex`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "RGB to HEX Converter",
  "description": "Convert RGB and RGBA color codes to HEX format instantly.",
  "url": `${SITE_URL}/converters/rgb-to-hex`,
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
      "name": "Why do web developers use HEX instead of RGB?",
      "acceptedAnswer": { "@type": "Answer", "text": "HEX codes are more compact and are the standard format for colors in HTML and CSS stylesheets, though both represent the same color values." }
    },
    {
      "@type": "Question",
      "name": "How do I convert RGB to a HEX color code?",
      "acceptedAnswer": { "@type": "Answer", "text": "Move the R, G, and B sliders (or type exact 0-255 values) above and the equivalent HEX code is generated instantly, with a one-click copy button — no manual conversion rgb hex math required." }
    },
    {
      "@type": "Question",
      "name": "I searched for a color code to RGB value — is this the right tool?",
      "acceptedAnswer": { "@type": "Answer", "text": "If you already have RGB numbers and want the HEX code, yes — this rgb to hex converter does exactly that. If you have a hex code and want the RGB value instead, use our HEX to RGB converter, which converts in the opposite direction." }
    },
    {
      "@type": "Question",
      "name": "Does this tool convert RGBA (with transparency) to HEX?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — adjust the alpha (opacity) slider along with R, G, and B, and the tool appends the alpha channel as an extra two hex digits, producing an 8-character HEX8 code." }
    },
    {
      "@type": "Question",
      "name": "What's the formula behind an RGB to HEX conversion?",
      "acceptedAnswer": { "@type": "Answer", "text": "Each of the R, G, and B values (0-255) is converted individually to a 2-digit base-16 (hexadecimal) number, then the three pairs are joined with a # in front. For example, RGB(255, 87, 51) becomes #FF5733." }
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
      <RgbToHexConverter />
    </>
  );
}
