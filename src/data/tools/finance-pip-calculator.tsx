import PaidIcon from '@mui/icons-material/Paid';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/pip-calculator",
    navName: "Pip Calculator",
    navDescription: "Calculate forex pip value.",
    name: "Pip Calculator",
    description: "Calculate the monetary value of a pip for your forex position. Free online pip value calculator.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PaidIcon fontSize="large" color="primary"/>,
    seoTitle: "Pip Calculator - Forex Pip Value Calculator",
    seoDescription: "Free online forex pip calculator. Calculate the value of one pip for your lot size and exchange rate.",
    keywords: ["pip calculator", "forex pip", "pip value", "pip value calculator", "forex calculator", "lot size pip"],
    ogTitle: "Pip Calculator - Forex Pip Value | ToolZoneX",
    ogDescription: "Calculate the monetary value of a pip for your forex position.",
    schemaName: "Pip Calculator",
    schemaDescription: "Calculate the monetary value of a pip for your forex position.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
