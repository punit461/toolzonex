import DescriptionIcon from '@mui/icons-material/Description';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/paper-weight-calculator",
    navName: "Paper Weight Calculator",
    navDescription: "Total weight of paper from GSM and sheet count.",
    name: "Paper Weight Calculator - GSM to Total Weight",
    description: "Calculate the total weight of a stack of paper from GSM, sheet dimensions, and number of sheets, with common paper size presets.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DescriptionIcon fontSize="large" color="primary"/>,
    seoTitle: "Paper Weight Calculator - GSM to Total Weight",
    seoDescription: "Free paper weight calculator. Enter GSM, paper size (A4, Letter, and more), and sheet count to find the total weight in grams, kilograms, or pounds.",
    keywords: ["paper weight calculator", "gsm calculator", "paper weight gsm", "ream weight calculator", "paper weight to shipping weight"],
    ogTitle: "Paper Weight Calculator - GSM to Total Weight | ToolZoneX",
    ogDescription: "Calculate total paper weight from GSM, size, and sheet count.",
    schemaName: "Paper Weight Calculator",
    schemaDescription: "Calculate the total weight of a stack of paper from GSM, sheet dimensions, and number of sheets.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What GSM should I use for typical office paper?", answer: "Standard copy/printer paper is usually 70-90 GSM. Cardstock and cover stock run from around 150 to 300+ GSM, while lightweight paper like newsprint can be as low as 45-52 GSM." }, { question: "Why does paper size matter if GSM already measures weight?", answer: "GSM is a weight-per-area measure, not a fixed sheet weight — a larger sheet at the same GSM weighs more because it has more area. That's why this calculator needs both the GSM and the exact paper dimensions to compute the actual weight of each sheet." }, { question: "Can I use this for non-standard paper sizes?", answer: "Yes — select \"Custom\" from the size dropdown and enter your own width and height in millimeters; the same GSM formula applies to any rectangular sheet size." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
