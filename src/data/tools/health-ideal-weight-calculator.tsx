import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/ideal-weight-calculator",
    navName: "Ideal Weight Calculator",
    navDescription: "Find your ideal body weight by formula.",
    name: "Ideal Weight Calculator",
    description: "Find your ideal body weight using Devine, Robinson, and Miller formulas based on gender and height.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <MonitorWeightIcon fontSize="large" color="primary"/>,
    seoTitle: "Ideal Weight Calculator - Find Your Ideal Body Weight",
    seoDescription: "Free ideal weight calculator to find your ideal body weight using Devine, Robinson, and Miller formulas by gender and height.",
    keywords: ["ideal weight calculator", "ideal body weight", "Devine formula", "Robinson formula", "Miller formula", "healthy weight"],
    ogTitle: "Ideal Weight Calculator - Find Your Ideal Body Weight | ToolZoneX",
    ogDescription: "Find your ideal body weight using multiple medical formulas.",
    schemaName: "Ideal Weight Calculator",
    schemaDescription: "Find your ideal body weight using Devine, Robinson, and Miller formulas.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
