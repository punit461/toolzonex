import StairsIcon from '@mui/icons-material/Stairs';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/stair-stringer-calculator",
    navName: "Stair Stringer Calculator",
    navDescription: "Riser height, tread depth, and stringer length.",
    name: "Stair Stringer Calculator - Risers, Treads & Stringer Length",
    description: "Calculate actual riser height, number of treads, and stringer length from total rise, desired steps, and target tread depth.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <StairsIcon fontSize="large" color="primary"/>,
    seoTitle: "Stair Stringer Calculator - Risers, Treads & Stringer Length",
    seoDescription: "Free stair stringer calculator. Enter total rise and desired steps or riser height to find actual riser height, tread depth, and stringer length.",
    keywords: ["stair stringer calculator", "stair calculator", "riser height calculator", "stringer length calculator", "stair rise and run calculator"],
    ogTitle: "Stair Stringer Calculator - Risers, Treads & Stringer Length | ToolZoneX",
    ogDescription: "Calculate actual riser height, number of treads, and stringer length from total rise and desired steps.",
    schemaName: "Stair Stringer Calculator",
    schemaDescription: "Calculate actual riser height, number of treads, and stringer length from total rise, desired steps, and target tread depth.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What riser height is considered comfortable or code-compliant?", answer: "Most residential building codes call for a riser height between roughly 7 and 7.75 inches, with treads around 10-11 inches deep. This tool flags whether your calculated actual riser height falls in that typical comfort range — always confirm exact limits against your local building code before building." }, { question: "Why is the number of treads one less than the number of risers?", answer: "The top riser brings you up to the level of the upper floor itself, which already acts as the final \"tread,\" so a staircase with a given number of risers only needs one fewer physical tread board." }, { question: "Does the stringer length include extra length for the horizontal foot?", answer: "No — this calculates the theoretical diagonal length from the Pythagorean theorem using total rise and total run. In practice, always add extra length when cutting a real stringer board to account for the horizontal seat cut at the bottom and the thickness of the framing lumber it lands on." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
