import DiamondIcon from '@mui/icons-material/Diamond';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/monogram-generator",
    navName: "Monogram Generator",
    navDescription: "Preview a traditional 3-letter monogram from initials.",
    name: "Monogram Generator - Traditional 3-Letter Monogram Preview",
    description: "Enter first, middle, and last name initials to preview a traditional First-Last-Middle monogram with the last-name initial enlarged and centered.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <DiamondIcon fontSize="large" color="primary"/>,
    seoTitle: "Monogram Generator - Traditional 3-Letter Monogram Preview",
    seoDescription: "Free online monogram generator. Enter your initials to preview a traditional First-Last-Middle monogram with the last-name initial enlarged and centered.",
    keywords: ["monogram generator", "monogram maker online", "initial monogram preview", "traditional monogram order", "3 letter monogram generator"],
    ogTitle: "Monogram Generator - Traditional 3-Letter Monogram Preview | ToolZoneX",
    ogDescription: "Preview a traditional First-Last-Middle monogram from your initials.",
    schemaName: "Monogram Generator",
    schemaDescription: "Enter first, middle, and last name initials to preview a traditional First-Last-Middle monogram with the last-name initial enlarged and centered.",
    applicationCategory: "DesignApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Name Initials Generator?", answer: "The Name Initials Generator produces a simple 2-letter avatar-style preview (first and last initial only, same size, in reading order) commonly used for profile pictures. This Monogram Generator instead follows the specific traditional 3-letter monogram convention — First, Last, Middle order with the last-name initial enlarged and centered — a distinct formatting style used for engravings and stationery, not avatars." }, { question: "Why is the last-name initial in the middle and larger?", answer: "That's the traditional convention for personal monograms — the surname initial is treated as the most prominent element and placed in the center at a larger size, flanked by the first and middle initials." }, { question: "What if I don't have a middle name?", answer: "Leave the middle name field blank — the monogram will show a placeholder dash in that position, or you can substitute a middle initial you use informally." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
