import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/sudoku-generator",
    navName: "Sudoku Generator",
    navDescription: "Printable Sudoku puzzles.",
    name: "Sudoku Puzzle Generator",
    description: "Generate unlimited, unique, and printable Sudoku puzzles from Easy to Expert difficulties online for free.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Sudoku Generator - Free Printable Puzzles Online",
    seoDescription: "Generate unlimited, unique, and printable Sudoku puzzles from Easy to Expert difficulties online for free.",
    keywords: ["sudoku generator", "printable sudoku", "free sudoku puzzles", "sudoku maker", "play sudoku", "random sudoku generator", "online sudoku generator", "sudoku game generator"],
    ogTitle: "Sudoku Generator - Free Printable Puzzles Online | ToolZoneX",
    ogDescription: "Generate unlimited, unique, and printable Sudoku puzzles from Easy to Expert difficulties online for free.",
    schemaName: "Sudoku Generator",
    schemaDescription: "Generate unlimited, unique, and printable Sudoku puzzles from Easy to Expert difficulties online for free.",
    applicationCategory: "GameApplication",
    currency: "INR",
    faqs: [{ question: "Does every generated puzzle have a unique solution?", answer: "Yes — the generator guarantees each puzzle has exactly one valid solution." }, { question: "Is this a random sudoku generator?", answer: "Yes — every puzzle is built by randomly filling a valid 9x9 grid with a backtracking algorithm and then randomly removing numbers to match your chosen difficulty, so no two puzzles are the same." }, { question: "Can I play this online sudoku generator directly in the browser?", answer: "Yes — the puzzle is generated and displayed instantly on the page. There's nothing to install; just pick a difficulty and start filling in the grid on screen, or print it to solve on paper." }, { question: "What difficulty levels does this sudoku game generator support?", answer: "Four levels — Easy, Medium, Hard, and Expert — each removing a different number of starting clues from the solved grid, from roughly 30 blanks on Easy up to 60 on Expert." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
