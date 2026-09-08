import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/seed-spacing-calculator",
    navName: "Seed Spacing Calculator",
    navDescription: "How many plants fit a bed at proper spacing.",
    name: "Seed Spacing Calculator",
    description: "Calculate how many plants fit in a garden bed or row based on standard spacing requirements for common plant types.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalFloristIcon fontSize="large" color="primary"/>,
    seoTitle: "Seed Spacing Calculator - Plants Per Bed by Spacing",
    seoDescription: "Free seed spacing calculator. Select a plant type or enter custom spacing to calculate how many plants fit in your garden bed.",
    keywords: ["seed spacing calculator", "plant spacing calculator", "how many plants fit in a raised bed", "vegetable spacing calculator", "garden plant spacing calculator"],
    ogTitle: "Seed Spacing Calculator - Plants Per Bed by Spacing | ToolZoneX",
    ogDescription: "Calculate how many plants fit in a garden bed or row based on standard spacing requirements.",
    schemaName: "Seed Spacing Calculator",
    schemaDescription: "Calculate total plants as plants per row (row length divided by plant spacing) times number of rows (bed width divided by plant spacing).",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Are these spacing figures exact for every variety?", answer: "No — spacing needs vary somewhat by specific variety and growing conditions. These are commonly published standard spacing figures meant as a solid general guideline; check your seed packet for the exact recommendation for your variety." }, { question: "Should row spacing and plant spacing always be the same?", answer: "Not necessarily — many gardeners use wider spacing between rows than between plants within a row to leave room for walking and maintenance. This calculator uses one spacing value for simplicity, but feel free to run it twice with different values to model row spacing separately." }, { question: "What if my plant type isn't listed?", answer: "Select \"Custom\" and enter the specific spacing recommendation from your seed packet or a gardening reference for that plant." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
