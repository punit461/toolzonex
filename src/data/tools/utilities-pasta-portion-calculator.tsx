import RamenDiningIcon from '@mui/icons-material/RamenDining';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/pasta-portion-calculator",
    navName: "Pasta Portion Calculator",
    navDescription: "Dry pasta needed by guest count and portion size.",
    name: "Pasta Portion Calculator",
    description: "Calculate total dry pasta needed based on number of people and a portion-size context (appetizer, main course, or hearty eater).",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <RamenDiningIcon fontSize="large" color="primary"/>,
    seoTitle: "Pasta Portion Calculator - Dry Pasta per Person",
    seoDescription: "Free pasta portion calculator. Enter number of people and portion size to calculate total dry pasta needed in ounces, pounds, and cups.",
    keywords: ["pasta portion calculator", "how much pasta per person", "pasta calculator for a crowd", "dry pasta calculator", "pasta serving size calculator"],
    ogTitle: "Pasta Portion Calculator - Dry Pasta per Person | ToolZoneX",
    ogDescription: "Calculate total dry pasta needed based on guest count and portion-size context.",
    schemaName: "Pasta Portion Calculator",
    schemaDescription: "Calculate total dry pasta as number of people times ounces per person for the selected portion context.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why does the portion size vary so much between contexts?", answer: "An appetizer portion is meant to be a small taste alongside other courses, while a main course portion needs to be filling on its own — and a \"hearty eater\" portion accounts for guests who typically eat more than average, such as at a casual gathering." }, { question: "Is the cups conversion exact?", answer: "No — the ounces-to-cups conversion for dry pasta varies by shape (long noodles like spaghetti measure differently than short shapes like penne or rotini), so the cups figure here is a rough approximation. Weighing dry pasta on a kitchen scale is more accurate than measuring by cup." }, { question: "Should I account for sauce-heavy vs. pasta-heavy dishes?", answer: "These are general guidelines assuming a typical sauce-to-pasta ratio. For dishes with very generous sauce, mix-ins, or protein, you might comfortably use a slightly smaller pasta portion per person." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
