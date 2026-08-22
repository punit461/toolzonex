import type { Metadata } from "next";
import SudokuGenerator from "../../../calculators/SudokuGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Sudoku Generator - Free Printable Puzzles Online",
  description: "Generate unlimited, unique, and printable Sudoku puzzles from Easy to Expert difficulties online for free.",
  keywords: ["sudoku generator", "printable sudoku", "free sudoku puzzles", "sudoku maker", "play sudoku", "random sudoku generator", "online sudoku generator", "sudoku game generator"],
  alternates: { canonical: "/generators/sudoku-generator" },
  openGraph: {
    title: "Sudoku Generator - Free Printable Puzzles Online | ToolZoneX",
    description: "Generate unlimited, unique, and printable Sudoku puzzles from Easy to Expert difficulties online for free.",
    url: `${SITE_URL}/generators/sudoku-generator`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sudoku Generator",
  "description": "Generate unlimited, unique, and printable Sudoku puzzles from Easy to Expert difficulties online for free.",
  "url": `${SITE_URL}/generators/sudoku-generator`,
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does every generated puzzle have a unique solution?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — the generator guarantees each puzzle has exactly one valid solution." }
    },
    {
      "@type": "Question",
      "name": "Is this a random sudoku generator?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — every puzzle is built by randomly filling a valid 9x9 grid with a backtracking algorithm and then randomly removing numbers to match your chosen difficulty, so no two puzzles are the same." }
    },
    {
      "@type": "Question",
      "name": "Can I play this online sudoku generator directly in the browser?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — the puzzle is generated and displayed instantly on the page. There's nothing to install; just pick a difficulty and start filling in the grid on screen, or print it to solve on paper." }
    },
    {
      "@type": "Question",
      "name": "What difficulty levels does this sudoku game generator support?",
      "acceptedAnswer": { "@type": "Answer", "text": "Four levels — Easy, Medium, Hard, and Expert — each removing a different number of starting clues from the solved grid, from roughly 30 blanks on Easy up to 60 on Expert." }
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
      <SudokuGenerator />
    </>
  );
}
