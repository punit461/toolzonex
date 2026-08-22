import type { Metadata } from "next";
import ContrastChecker from "../../../calculators/ContrastChecker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "WCAG Contrast Checker - Color Accessibility Tester",
  description: "Free WCAG color contrast checker and tester. Check color contrast ratio for WCAG AA/AAA and web accessibility compliance instantly.",
  keywords: ["wcag color checker", "wcag color tester", "wcag contrast checker", "contrast checker", "check color contrast ratio", "color contrast ratio", "website color accessibility checker", "web accessibility color checker", "ada compliance contrast checker", "accessibility color check", "contrast checking", "contrast checker for accessibility", "accessibility calculator", "web design contrast"],
  alternates: { canonical: "/tools/contrast-checker" },
  openGraph: {
    title: "WCAG Contrast Checker - Color Accessibility Tester | ToolZoneX",
    description: "Check color contrast ratios for WCAG accessibility compliance instantly. Free online contrast checker.",
    url: `${SITE_URL}/tools/contrast-checker`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "WCAG Contrast Checker",
  "description": "Check color contrast ratios for WCAG accessibility compliance instantly.",
  "url": `${SITE_URL}/tools/contrast-checker`,
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is WCAG and why does contrast matter?",
      "acceptedAnswer": { "@type": "Answer", "text": "WCAG (Web Content Accessibility Guidelines) is the standard used to measure whether website color combinations are readable by people with low vision or color blindness. This tool calculates the WCAG contrast ratio between your text and background colors so you can check compliance before publishing." }
    },
    {
      "@type": "Question",
      "name": "What contrast ratio do I need?",
      "acceptedAnswer": { "@type": "Answer", "text": "WCAG AA requires at least 4.5:1 for normal text (3:1 for large text). WCAG AAA, a stricter standard, requires 7:1 for normal text (4.5:1 for large text)." }
    },
    {
      "@type": "Question",
      "name": "Is this an ADA compliance contrast checker?",
      "acceptedAnswer": { "@type": "Answer", "text": "The ADA itself doesn't specify a technical contrast formula, but WCAG AA (4.5:1 for normal text) is the standard most commonly used to demonstrate ADA-related web accessibility compliance in the US. Checking your contrast ratio against WCAG AA with this tool is a reasonable way to help meet that bar." }
    },
    {
      "@type": "Question",
      "name": "How do I check color contrast ratio for accessibility?",
      "acceptedAnswer": { "@type": "Answer", "text": "Enter your text color and background color as hex codes above — the contrast ratio, along with WCAG AA and AAA pass/fail results for both normal and large text, calculates instantly." }
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
      <ContrastChecker />
    </>
  );
}
