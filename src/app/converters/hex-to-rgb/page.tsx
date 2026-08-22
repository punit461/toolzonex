import type { Metadata } from "next";
import HexToRgbConverter from "../../../calculators/HexToRgbConverter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "HEX to RGB Converter - Free Online Color Tool",
  description: "Convert HEX color codes to RGB or RGBA instantly with this free hex to rgb color converter. Paste any hexadecimal color code — 3, 6, or 8 characters — to get RGB and sRGB values for web developers and designers.",
  keywords: ["hex to rgb", "hex converter", "color code converter", "rgb generator", "hex to rgba", "hex to rgb color", "hex code to rgb", "rgb hex", "hex to rgb color converter", "hex naar rgb", "color converter hex to rgb", "convert hexa to rgb", "convert hex color to rgb", "hexadecimal color to rgb", "hex colour to rgb", "hex into rgb", "hex to srgb", "hexadecimal color code to rgb", "hex code for rgb color"],
  alternates: { canonical: "/converters/hex-to-rgb" },
  openGraph: {
    title: "HEX to RGB Converter - Free Online Color Tool | ToolZoneX",
    description: "Convert HEX color codes to RGB or RGBA formats instantly.",
    url: `${SITE_URL}/converters/hex-to-rgb`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "HEX to RGB Converter",
  "description": "Convert HEX color codes to RGB or RGBA formats instantly.",
  "url": `${SITE_URL}/converters/hex-to-rgb`,
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
      "name": "Why would I use RGB instead of HEX?",
      "acceptedAnswer": { "@type": "Answer", "text": "RGB(A) lets you specify transparency directly, which plain HEX codes can't do without an extra alpha value (HEX8)." }
    },
    {
      "@type": "Question",
      "name": "How do I convert a HEX color code to RGB?",
      "acceptedAnswer": { "@type": "Answer", "text": "Type or paste the HEX code (with or without the leading #) into the field above — the RGB and RGBA values are calculated and shown instantly, with one-click copy buttons for each." }
    },
    {
      "@type": "Question",
      "name": "Is hex to RGB the same as hex to sRGB?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. On the web, \"RGB\" almost always means sRGB — the standard color space used by CSS, HTML, and most displays — so converting a hex code to RGB and converting it to sRGB give you identical numbers." }
    },
    {
      "@type": "Question",
      "name": "Does this tool work for \"hex naar rgb\" or other non-English searches?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — hex color codes and RGB values are the same everywhere, so whether you search hex naar rgb (Dutch), hex colour to rgb (UK spelling), or hexadecimal color code to rgb, you just paste the hex code and get the same RGB output. No translation needed." }
    },
    {
      "@type": "Question",
      "name": "Does it support 3-character shorthand or 8-character hex codes with alpha?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — it accepts 3-character shorthand hex (e.g. #03F), standard 6-character hex (e.g. #0033FF), and 8-character hex with an alpha channel (e.g. #0033FFCC), automatically expanding shorthand codes before converting." }
    },
    {
      "@type": "Question",
      "name": "What's the difference between the RGB and RGBA output?",
      "acceptedAnswer": { "@type": "Answer", "text": "RGB gives the red, green, and blue channel values only. RGBA adds a fourth alpha value for opacity, taken from an 8-character hex code if one is entered — useful when you need a color code for RGB with transparency in CSS." }
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
      <HexToRgbConverter />
    </>
  );
}
