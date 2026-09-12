import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/pace-calculator",
    navName: "Pace Calculator",
    navDescription: "Running pace & finish time calculator.",
    name: "Pace Calculator",
    description: "Calculate running pace per km or mile and finish time from distance and time, in km or miles.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <DirectionsRunIcon fontSize="large" color="primary"/>,
    seoTitle: "Pace Calculator - Running Pace Calculator",
    seoDescription: "Free pace calculator to compute running pace per km or mile and estimate finish times. Supports km and miles.",
    keywords: ["pace calculator", "running pace calculator", "pace per km", "pace per mile", "finish time calculator", "run pace"],
    ogTitle: "Pace Calculator - Running Pace Calculator | ToolZoneX",
    ogDescription: "Calculate running pace and finish time in km or miles.",
    schemaName: "Pace Calculator",
    schemaDescription: "Calculate running pace per km or mile and finish time from distance and time.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
