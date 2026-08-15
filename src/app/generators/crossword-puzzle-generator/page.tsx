import type { Metadata } from "next";
import CrosswordPuzzleGenerator from "../../../calculators/CrosswordPuzzleGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Crossword Puzzle Generator - Create Custom Puzzles Online",
  description: "Create custom printable crossword puzzles online for free. Enter words and clues to generate your own crosswords for school or fun.",
  keywords: ["crossword puzzle generator", "make a crossword", "custom crossword maker", "printable crosswords", "free crossword generator"],
  alternates: { canonical: "/generators/crossword-puzzle-generator" },
  openGraph: {
    title: "Crossword Puzzle Generator - Create Custom Puzzles Online | ToolZoneX",
    description: "Create custom printable crossword puzzles online for free.",
    url: `${SITE_URL}/generators/crossword-puzzle-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Crossword Puzzle Generator",
  "description": "Create custom printable crossword puzzles online for free.",
  "url": `${SITE_URL}/generators/crossword-puzzle-generator`,
  "applicationCategory": "EducationalApplication",
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
      <CrosswordPuzzleGenerator />
    </>
  );
}
