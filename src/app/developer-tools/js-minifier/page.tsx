import type { Metadata } from "next";
import JsMinifier from "../../../calculators/developer-tools/JsMinifier";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "JavaScript Minifier - Compress JS Code Online",
  description: "Compress and minify JavaScript code online instantly. Free tool to reduce JS file size and improve website performance.",
  keywords: ["js minifier", "javascript minifier", "compress js", "minify javascript online", "js minify online", "javascript minify", "javascript compress", "minify js", "minimize js"],
  alternates: { canonical: "/developer-tools/js-minifier" },
  openGraph: {
    title: "JavaScript Minifier - Compress JS Code Online | ToolZoneX",
    description: "Compress and minify JavaScript code online instantly. Free tool to reduce JS file size.",
    url: `${SITE_URL}/developer-tools/js-minifier`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JavaScript Minifier",
  "description": "Compress and minify JavaScript code online instantly. Free tool to reduce JS file size and improve website performance.",
  "url": `${SITE_URL}/developer-tools/js-minifier`,
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
      "name": "Is this safe for production code?",
      "acceptedAnswer": { "@type": "Answer", "text": "For complex production codebases, a full AST-based minifier like Terser or esbuild is safer and more thorough — this tool is best for quick, simple minification needs." }
    },
    {
      "@type": "Question",
      "name": "Can I minify js online without installing anything?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — paste your JavaScript into the input box and click Minify JS. Everything runs in your browser, so there's nothing to install and no build tooling required." }
    },
    {
      "@type": "Question",
      "name": "What does this JavaScript minify / compress js tool actually remove?",
      "acceptedAnswer": { "@type": "Answer", "text": "It strips comments (both // and /* */ styles), collapses extra whitespace and line breaks, and removes unnecessary spaces around operators and punctuation — reducing file size without changing behavior for typical scripts." }
    },
    {
      "@type": "Question",
      "name": "Does minimizing JS change how my code runs?",
      "acceptedAnswer": { "@type": "Answer", "text": "It shouldn't — minifying only removes comments and formatting whitespace, not logic. However, this is a basic regex-based minifier, not a full parser, so always test minified output before deploying it, especially for complex code." }
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
      <JsMinifier />
    </>
  );
}
