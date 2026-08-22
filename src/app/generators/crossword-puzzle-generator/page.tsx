import type { Metadata } from "next";
import CrosswordPuzzleGenerator from "../../../calculators/generators/CrosswordPuzzleGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Crossword Puzzle Generator - Create Custom Puzzles with Clues",
  description: "Create custom printable crossword puzzles online for free. Enter words and clues to generate your own crosswords with clues for school or fun.",
  keywords: ["crossword puzzle generator", "make a crossword", "custom crossword maker", "printable crosswords", "free crossword generator", "create cross word puzzle", "crossword generator with clues", "crossword puzzle clue generator", "cross puzzle generator", "cross puzzle maker", "random crossword generator", "crossword puzzle maker generator", "make your own crosswords", "kruiswoordpuzzel", "kruiswoordpuzzel generator", "kruiswoordpuzzel online maken", "kruiswoordpuzzel maken online"],
  alternates: { canonical: "/generators/crossword-puzzle-generator" },
  openGraph: {
    title: "Crossword Puzzle Generator - Create Custom Puzzles with Clues | ToolZoneX",
    description: "Create custom printable crossword puzzles online for free. Enter words and clues to generate your own crosswords.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many words do I need to generate a crossword?",
      "acceptedAnswer": { "@type": "Answer", "text": "At least 2 words are required so the grid can intersect them — more words with shared letters produce a denser, more interesting puzzle. This crossword puzzle maker generator works with as few as 2 words or as many as 15." }
    },
    {
      "@type": "Question",
      "name": "Does this include a clue generator, or do I write my own clues?",
      "acceptedAnswer": { "@type": "Answer", "text": "You write your own clue for each word — this keeps the puzzle accurate for your specific topic, whether it's spelling words, vocabulary terms, or trivia. Once you've entered your words and clues, the tool acts as the crossword puzzle clue generator layout engine, automatically numbering and arranging the across and down clues to match the grid." }
    },
    {
      "@type": "Question",
      "name": "Is this a random crossword generator?",
      "acceptedAnswer": { "@type": "Answer", "text": "The grid layout is generated automatically from whatever words and clues you provide, arranging them into intersecting rows and columns. For a randomly-themed puzzle, just enter a random assortment of words and clues, or start from the built-in demo set and swap in your own." }
    },
    {
      "@type": "Question",
      "name": "Can I use this as a kruiswoordpuzzel generator to make a Dutch crossword?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — the grid engine works with any word made of letters, so this doubles as a kruiswoordpuzzel generator: just enter Dutch words and clues to build a kruiswoordpuzzel (Dutch for crossword puzzle) online, the same way you'd kruiswoordpuzzel maken online in any dedicated Dutch tool. The interface itself stays in English, but the words and clues you enter can be in any language, so it works just as well as a way to kruiswoordpuzzel online maken as it does for English puzzles." }
    },
    {
      "@type": "Question",
      "name": "Can I print my custom crossword maker puzzle?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — once generated, click \"Print Puzzle\" to print the grid and clue list directly from your browser, ready for a classroom, newsletter, or party activity." }
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
      <CrosswordPuzzleGenerator />
    </>
  );
}
