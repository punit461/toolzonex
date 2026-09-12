import PercentIcon from '@mui/icons-material/Percent';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/discount-calculator",
    navName: "Discount Calculator",
    navDescription: "Calculate final price & savings.",
    name: "Discount Calculator",
    description: "Calculate the final price and amount saved after a percentage discount is applied. Free online discount calculator.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PercentIcon fontSize="large" color="primary"/>,
    seoTitle: "Discount Calculator - Find Final Price and Savings Online",
    seoDescription: "Calculate the final price and amount saved after a percentage discount is applied. Free online discount calculator for shopping and sales.",
    keywords: ["discount calculator", "percent off calculator", "sales tax calculator", "price after discount"],
    ogTitle: "Discount Calculator - Find Final Price and Savings Online | ToolZoneX",
    ogDescription: "Calculate the final price and amount saved after a percentage discount is applied.",
    schemaName: "Discount Calculator",
    schemaDescription: "Calculate the final price and amount saved after a percentage discount is applied.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
