import type { Metadata } from "next";
import ContrastChecker from "../../../calculators/ContrastChecker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Contrast Checker - WCAG Color Accessibility",
  description: "Check color contrast ratios for WCAG accessibility compliance instantly. Free online contrast checker.",
  keywords: ["contrast checker", "color contrast ratio", "wcag contrast checker", "accessibility color check", "web design contrast"],
  alternates: { canonical: "/tools/contrast-checker" },
  openGraph: {
    title: "Contrast Checker - WCAG Color Accessibility | ToolZoneX",
    description: "Check color contrast ratios for WCAG accessibility compliance instantly. Free online contrast checker.",
    url: `${SITE_URL}/tools/contrast-checker`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Contrast Checker",
  "description": "Check color contrast ratios for WCAG accessibility compliance instantly.",
  "url": `${SITE_URL}/tools/contrast-checker`,
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
      <ContrastChecker />
    </>
  );
}
