import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/paint-calculator",
    navName: "Paint Calculator",
    navDescription: "How much paint you need for your walls.",
    name: "Paint Calculator - How Much Paint Do I Need",
    description: "Calculate how many gallons or liters of paint you need from wall dimensions, number of coats, and coverage rate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FormatPaintIcon fontSize="large" color="primary"/>,
    seoTitle: "Paint Calculator - How Much Paint Do I Need",
    seoDescription: "Free paint calculator. Add your wall dimensions, coats, and paint coverage rate to find out how many gallons or liters of paint to buy.",
    keywords: ["paint calculator", "how much paint do i need", "paint coverage calculator", "gallons of paint calculator", "room paint calculator"],
    ogTitle: "Paint Calculator - How Much Paint Do I Need | ToolZoneX",
    ogDescription: "Calculate how many gallons or liters of paint your walls need.",
    schemaName: "Paint Calculator",
    schemaDescription: "Calculate how much paint is needed from wall dimensions, number of coats, and paint coverage rate.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What coverage rate should I use?", answer: "Check the paint can label — most interior paints cover roughly 350-400 sq ft per gallon (about 8-10 m² per liter) for a single coat, though rougher or more porous surfaces reduce coverage. Adjust the coverage field to match your specific paint." }, { question: "Should I round up the final amount?", answer: "Yes — paint is sold in fixed can sizes, so round the result up to the nearest can size (e.g., a gallon or a liter) and consider a small buffer for touch-ups or an uneven surface." }, { question: "Do ceilings count as walls here?", answer: "You can add a ceiling as an extra row using its length and width as the two dimensions — the calculator just multiplies the two numbers you enter, so it works for any flat surface." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
