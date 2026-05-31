import type { Metadata } from "next";
import SudokuGenerator from "../../../calculators/SudokuGenerator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Sudoku Generator - Free Printable Puzzles Online",
  description: "Generate unlimited, unique, and printable Sudoku puzzles from Easy to Expert difficulties online for free.",
  keywords: ["sudoku generator", "printable sudoku", "free sudoku puzzles", "sudoku maker", "play sudoku"],
  alternates: { canonical: "/tools/sudoku-generator" },
  openGraph: {
    title: "Sudoku Generator - Free Printable Puzzles Online | ToolZoneX",
    description: "Generate unlimited, unique, and printable Sudoku puzzles from Easy to Expert difficulties online for free.",
    url: `${SITE_URL}/tools/sudoku-generator`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sudoku Generator",
  "description": "Generate unlimited, unique, and printable Sudoku puzzles from Easy to Expert difficulties online for free.",
  "url": `${SITE_URL}/tools/sudoku-generator`,
  "applicationCategory": "GameApplication",
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
      <SudokuGenerator />
    </>
  );
}
