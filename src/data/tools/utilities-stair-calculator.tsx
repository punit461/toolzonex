import StraightenIcon from '@mui/icons-material/Straighten';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/stair-calculator",
    navName: "Stair Calculator",
    navDescription: "Plan staircase steps, risers, and stringer length.",
    name: "Stair Calculator",
    description: "Calculate the number of steps, actual riser height, total run, and stringer length for your staircase. Includes a text-based stair diagram.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <StraightenIcon fontSize="large" color="primary"/>,
    seoTitle: "Stair Calculator - Steps, Risers & Stringer Length",
    seoDescription: "Free stair calculator to plan your staircase. Calculate steps, riser height, total run, and stringer length instantly.",
    keywords: ["stair calculator", "staircase calculator", "riser height calculator", "stringer length calculator", "stair steps calculator"],
    ogTitle: "Stair Calculator - Plan Your Staircase | ToolZoneX",
    ogDescription: "Calculate the number of steps, riser height, and stringer length for your staircase.",
    schemaName: "Stair Calculator",
    schemaDescription: "Calculate the number of steps, actual riser height, total run, and stringer length for your staircase.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the standard riser height?", answer: "Most building codes require risers between 4 and 7.75 inches, with 7 to 7.5 inches being the most common for residential stairs." }, { question: "What is a stringer?", answer: "A stringer is the structural support member that runs along the side of the staircase, cut to hold the treads and risers." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
