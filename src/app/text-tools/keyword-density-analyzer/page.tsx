import type { Metadata } from "next";
import KeywordDensityAnalyzer from "../../../calculators/text-tools/KeywordDensityAnalyzer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Keyword Density Checker - Free SEO Tool Online",
  description: "Free keyword density checker and analyzer. Paste any text or webpage copy to see keyword frequency and density percentage online instantly.",
  keywords: ["keyword density checker", "keyword density checker free", "free keyword density checker", "key word density checker", "keyword density tool online", "keyword density finder", "keyword density test", "keyword density analysis", "keyword density analyzer", "seo keyword checker", "seo keyword frequency", "word density counter", "keyword analyse tool"],
  alternates: { canonical: "/text-tools/keyword-density-analyzer" },
  openGraph: {
    title: "Keyword Density Checker - Free SEO Tool Online | ToolZoneX",
    description: "Run a keyword density analysis on text or webpage copy. See keyword frequency and percentage usage.",
    url: `${SITE_URL}/text-tools/keyword-density-analyzer`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Keyword Density Checker",
  "description": "Check the keyword density of your text for SEO optimization.",
  "url": `${SITE_URL}/text-tools/keyword-density-analyzer`,
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
      "name": "Is there a free keyword density checker?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — this keyword density checker is completely free, works on any text or webpage copy you paste in, and requires no sign-up." }
    },
    {
      "@type": "Question",
      "name": "What's a good keyword density?",
      "acceptedAnswer": { "@type": "Answer", "text": "There is no fixed ideal percentage. Use keyword density as an editing signal, then prioritise relevance, clarity, and complete coverage of the topic over hitting a specific number." }
    },
    {
      "@type": "Question",
      "name": "Is a keyword density checker the same as an SEO keyword checker?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — this tool works as both. It finds every meaningful keyword in your text, counts how often each one appears, and calculates its density (percentage) so you can spot over-optimization or missing keyword coverage before publishing." }
    },
    {
      "@type": "Question",
      "name": "How do I find keyword density online?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste your article, blog post, or webpage copy into the box and click \"Analyze Keyword Density\" — the tool instantly lists every keyword's count and density percentage, ranked from most to least frequent." }
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
      <KeywordDensityAnalyzer />
    </>
  );
}
