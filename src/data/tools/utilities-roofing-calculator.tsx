import ConstructionIcon from '@mui/icons-material/Construction';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/roofing-calculator",
    navName: "Roofing Calculator",
    navDescription: "Roof area, squares, and shingle bundles needed.",
    name: "Roofing Calculator",
    description: "Calculate the sloped roof surface area, roofing squares, and shingle bundles needed for a flat or pitched roof.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ConstructionIcon fontSize="large" color="primary"/>,
    seoTitle: "Roofing Calculator - Roof Squares & Shingle Bundles Needed",
    seoDescription: "Free roofing calculator. Enter your roof footprint and pitch to calculate sloped roof area, roofing squares, and how many shingle bundles to buy.",
    keywords: ["roofing calculator", "roof square calculator", "shingle bundle calculator", "roof area calculator", "how many shingles do i need", "roofing squares calculator"],
    ogTitle: "Roofing Calculator - Roof Squares & Shingle Bundles Needed | ToolZoneX",
    ogDescription: "Calculate sloped roof area, roofing squares, and shingle bundles needed for your roof.",
    schemaName: "Roofing Calculator",
    schemaDescription: "Calculate the sloped roof surface area, roofing squares, and shingle bundles needed for a flat or pitched roof.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What is a roofing \"square\"?", answer: "A roofing square is a standard industry unit equal to 100 square feet of roof surface area. Contractors and material suppliers use squares (not square feet) when quoting and pricing roofing jobs." }, { question: "How much waste allowance should I use?", answer: "10% is a common default for a straightforward roof. Roofs with many hips, valleys, dormers, or a complex shape often need 15-20% to account for extra cuts and offcuts." }, { question: "Is this a substitute for a professional roofing estimate?", answer: "No. This calculator gives a reasonable material estimate for planning purposes, but actual roofing jobs should be measured and quoted by a licensed roofing contractor, who can account for the roof's exact shape, underlayment, flashing, and local building code requirements." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
