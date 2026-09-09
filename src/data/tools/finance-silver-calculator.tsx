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
    faqs: [{ question: "Why are silver making charges often higher than gold?", answer: "Silver items often involve more intricate craftsmanship relative to their lower per-gram value, so making charges are commonly expressed as a higher percentage than for gold." }, { question: "What is a troy ounce and why does the world price use it?", answer: "A troy ounce (31.1034768 grams) is the standard unit for pricing precious metals internationally — it's what you'll see quoted on silverprice.org and most bullion dealers outside India. Select \"Troy Ounce\" as the rate unit to plug in a world spot price directly." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
