import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/percentage-increase-calculator",
    navName: "Percentage Increase Calculator",
    navDescription: "Calculate percentage increase or decrease.",
    name: "Percentage Increase Calculator",
    description: "Calculate the percentage increase or decrease between two values. Free online percentage change calculator.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "Percentage Increase Calculator - Percentage Change Calculator",
    seoDescription: "Free online percentage increase calculator. Find the percentage change between two values, with formula and absolute difference shown.",
    keywords: ["percentage increase", "percentage change", "percentage calculator", "increase calculator", "percent difference", "percentage decrease"],
    ogTitle: "Percentage Increase Calculator - Percentage Change | ToolZoneX",
    ogDescription: "Calculate the percentage increase or decrease between two values.",
    schemaName: "Percentage Increase Calculator",
    schemaDescription: "Calculate the percentage increase or decrease between two values.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
