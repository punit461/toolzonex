import GroupsIcon from '@mui/icons-material/Groups';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/customer-acquisition-cost-calculator",
    navName: "Customer Acquisition Cost Calculator",
    navDescription: "CAC and LTV:CAC ratio from spend & customers.",
    name: "Customer Acquisition Cost Calculator",
    description: "Calculate Customer Acquisition Cost (CAC) from sales and marketing spend and new customers acquired, with an optional LTV:CAC ratio.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <GroupsIcon fontSize="large" color="primary"/>,
    seoTitle: "Customer Acquisition Cost Calculator - CAC & LTV:CAC Ratio",
    seoDescription: "Free CAC calculator. Enter sales and marketing spend and new customers acquired to find your Customer Acquisition Cost and LTV:CAC ratio.",
    keywords: ["customer acquisition cost calculator", "cac calculator", "ltv to cac ratio calculator", "marketing spend per customer calculator", "cac ltv calculator"],
    ogTitle: "Customer Acquisition Cost Calculator - CAC & LTV:CAC Ratio | ToolZoneX",
    ogDescription: "Calculate Customer Acquisition Cost and the LTV:CAC ratio.",
    schemaName: "Customer Acquisition Cost Calculator",
    schemaDescription: "Calculate Customer Acquisition Cost from spend and new customers, with an optional LTV:CAC ratio.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What counts as \"sales and marketing spend\"?", answer: "Typically this includes advertising spend, sales and marketing salaries, tools and software, and any agency or contractor fees directly tied to acquiring new customers during the period you're measuring — not general overhead unrelated to acquisition." }, { question: "What's a healthy LTV:CAC ratio?", answer: "A commonly cited guideline is that a ratio of 3:1 or better is healthy — meaning a customer is worth at least three times what it costs to acquire them. A ratio below that can signal spend is too high relative to the value customers bring, while a very high ratio can sometimes mean a company is under-investing in growth." }, { question: "Do I need to know LTV to use this calculator?", answer: "No — the LTV field is optional. Leave it blank or at zero to see just the CAC figure; entering an LTV estimate additionally shows the LTV:CAC ratio for context." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
