import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/percentage-decrease-calculator",
    navName: "Percentage Decrease Calculator",
    navDescription: "Find % drop between two values.",
    name: "Percentage Decrease Calculator",
    description: "Calculate how much a value has decreased as a percentage. Free online percentage decrease calculator from original and new values.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <TrendingDownIcon fontSize="large" color="primary"/>,
    seoTitle: "Percentage Decrease Calculator - % Drop Between Values",
    seoDescription: "Free online percentage decrease calculator. Enter the original and new values to get the percentage drop and the amount decreased.",
    keywords: ["percentage decrease calculator", "percent decrease", "calculate percentage decrease", "percentage drop calculator", "discount percentage", "how to calculate decrease"],
    ogTitle: "Percentage Decrease Calculator - % Drop | ToolZoneX",
    ogDescription: "Find the percentage drop between an original and a new value instantly.",
    schemaName: "Percentage Decrease Calculator",
    schemaDescription: "Calculate the percentage decrease between an original and a new value.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How do you calculate percentage decrease?", answer: "Subtract the new value from the original, divide by the absolute original value, and multiply by 100: ((original − new) / |original|) × 100. A sale from $100 to $75 is a 25% decrease." }, { question: "What if the new value is higher?", answer: "Then there is no decrease — the result is a percentage increase. The calculator shows a note pointing you to the increase instead of reporting a negative drop." }, { question: "What is the difference between decrease and discount?", answer: "A discount is a percentage decrease applied to a price. The percentage decrease calculator gives you the discount percentage whenever the original is the list price and the new is the sale price." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
