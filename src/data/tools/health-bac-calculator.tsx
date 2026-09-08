import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/bac-calculator",
    navName: "BAC Calculator",
    navDescription: "Estimate blood alcohol concentration.",
    name: "BAC Calculator",
    description: "Estimate your blood alcohol concentration (BAC) and time to sober using the Widmark formula. Free online BAC calculator.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <LocalDrinkIcon fontSize="large" color="primary"/>,
    seoTitle: "BAC Calculator - Blood Alcohol Concentration Estimator",
    seoDescription: "Free online BAC calculator. Estimate your blood alcohol concentration with the Widmark formula, see your risk level, and estimate time to sober.",
    keywords: ["bac calculator", "blood alcohol concentration calculator", "blood alcohol calculator", "bac level calculator", "drink and drive calculator", "time to sober calculator"],
    ogTitle: "BAC Calculator - Blood Alcohol Concentration | ToolZoneX",
    ogDescription: "Estimate your blood alcohol concentration with the Widmark formula and see risk level and time to sober.",
    schemaName: "BAC Calculator",
    schemaDescription: "Estimate blood alcohol concentration with the Widmark formula.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
