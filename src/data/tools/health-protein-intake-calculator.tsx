import LocalDiningIcon from '@mui/icons-material/LocalDining';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/protein-intake-calculator",
    navName: "Protein Intake Calculator",
    navDescription: "Daily protein needs by activity & goal.",
    name: "Protein Intake Calculator",
    description: "Calculate your recommended daily protein intake in grams based on weight, activity level, and fitness goal.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <LocalDiningIcon fontSize="large" color="primary"/>,
    seoTitle: "Protein Intake Calculator - Daily Protein Needs Calculator",
    seoDescription: "Free protein intake calculator to estimate daily protein needs by activity level and goal. Plan your nutrition easily.",
    keywords: ["protein intake calculator", "daily protein needs", "protein calculator", "grams of protein per day", "protein per kg", "muscle protein"],
    ogTitle: "Protein Intake Calculator - Daily Protein Needs Calculator | ToolZoneX",
    ogDescription: "Calculate your recommended daily protein intake in grams.",
    schemaName: "Protein Intake Calculator",
    schemaDescription: "Calculate recommended daily protein intake based on weight, activity, and goal.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
