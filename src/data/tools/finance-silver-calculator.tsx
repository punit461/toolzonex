import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/silver-calculator",
    navName: "Silver Rate Calculator",
    navDescription: "Silver price by weight, currency & region tax (GST/VAT/sales tax).",
    name: "Silver Rate Calculator",
    description: "Calculate the final price of silver in any weight unit and currency, with region-based tax.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ChangeHistoryIcon fontSize="large" color="primary"/>,
    seoTitle: "Silver Rate Calculator - Price with Making Charges",
    seoDescription: "Free silver rate calculator to calculate silver price including making charges and GST. Get accurate silver rate calculations for jewelry and investment.",
    keywords: ["silver rate calculator", "silver price", "silver making charges", "silver GST", "silver jewelry price", "silver investment"],
    ogTitle: "Silver Rate Calculator - Silver Price with Making Charges & GST | ToolZoneX",
    ogDescription: "Calculate silver price including making charges and GST.",
    schemaName: "Silver Rate Calculator",
    schemaDescription: "Calculate silver price with making charges and GST.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
