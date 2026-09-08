import EventIcon from '@mui/icons-material/Event';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/age-calculator",
    navName: "Age Calculator",
    navDescription: "Exact age in years, months & days.",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, and days based on your date of birth.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <EventIcon fontSize="large" color="primary"/>,
    seoTitle: "Age Calculator - Calculate Exact Age in Years, Months, Days",
    seoDescription: "Free age calculator to calculate exact age in years, months, and days. Find your age on any specific date with this accurate date difference calculator.",
    keywords: ["age calculator", "calculate age", "age in years months days", "date difference", "birthday calculator", "age finder", "date calculator"],
    ogTitle: "Age Calculator - Calculate Exact Age in Years, Months, Days | ToolZoneX",
    ogDescription: "Calculate exact age in years, months, and days.",
    schemaName: "Age Calculator",
    schemaDescription: "Calculate exact age in years, months, and days.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
