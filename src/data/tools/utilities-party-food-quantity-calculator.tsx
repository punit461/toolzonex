import LocalDiningIcon from '@mui/icons-material/LocalDining';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/party-food-quantity-calculator",
    navName: "Party Food Quantity Calculator",
    navDescription: "Food needed by guest count and meal context.",
    name: "Party Food Quantity Calculator",
    description: "Calculate total food quantity needed for a party based on guest count and meal context (appetizers, light meal, or full meal).",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalDiningIcon fontSize="large" color="primary"/>,
    seoTitle: "Party Food Quantity Calculator - Food per Guest",
    seoDescription: "Free party food calculator. Enter guest count and meal context to calculate total food quantity needed in pieces or pounds.",
    keywords: ["party food quantity calculator", "how much food for a party calculator", "party food calculator per person", "catering quantity calculator", "how much food per guest"],
    ogTitle: "Party Food Quantity Calculator - Food per Guest | ToolZoneX",
    ogDescription: "Calculate total food quantity needed for a party based on guest count and meal context.",
    schemaName: "Party Food Quantity Calculator",
    schemaDescription: "Calculate total food needed as guests times quantity per person for the selected meal context (appetizers, light meal, or full meal).",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why do appetizers use a piece count instead of weight?", answer: "Appetizers like finger foods, canapés, and hors d'oeuvres are naturally portioned as individual pieces, so counting pieces per person is a more practical planning unit than weight for that context." }, { question: "What's the difference between a light meal and a full meal?", answer: "A light meal assumes lighter fare like salads, sliders, or a buffet with smaller portions, while a full meal assumes a complete sit-down-style plate with a main dish, sides, and larger portions — roughly double the food weight per person." }, { question: "Should I add extra for guests with big appetites or dietary variety?", answer: "Yes — these are general planning averages. Many event planners add a 10-15% buffer on top of the calculated total to account for larger appetites, seconds, and variety across dishes." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
