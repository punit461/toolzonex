import CropSquareIcon from '@mui/icons-material/CropSquare';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/brick-calculator",
    navName: "Brick Calculator",
    navDescription: "Count bricks + mortar for any wall.",
    name: "Brick Calculator",
    description: "Calculate the number of bricks and mortar needed to build a wall. Free online brick calculator with standard brick size presets.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CropSquareIcon fontSize="large" color="primary"/>,
    seoTitle: "Brick Calculator - How Many Bricks Do I Need for a Wall",
    seoDescription: "Free online brick calculator. Enter wall length, height, and thickness to get the number of bricks required (including wastage) and the mortar volume.",
    keywords: ["brick calculator", "how many bricks do i need", "brick wall calculator", "bricks per square foot", "mortar calculator", "brick count"],
    ogTitle: "Brick Calculator - Count Bricks & Mortar for a Wall | ToolZoneX",
    ogDescription: "Find out exactly how many bricks your wall needs, including wastage and mortar.",
    schemaName: "Brick Calculator",
    schemaDescription: "Calculate the number of bricks and mortar needed to build a wall.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What size brick does the calculator assume?", answer: "It uses the standard Indian brick of approximately 190 × 90 × 90 mm (often called a 9-inch brick). You can also enter a custom brick size to match your local bricks." }, { question: "How much wastage should I plan for?", answer: "Around 5% is typical to cover broken bricks, cutting, and transport damage. The calculator includes a default 5% and lets you adjust it." }, { question: "Does brick thickness affect the count?", answer: "Yes — a 4.5-inch (half-brick) wall needs roughly half the bricks of a 9-inch (full-brick) wall. Enter the actual wall thickness to get an accurate count." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
