import QueryStatsIcon from '@mui/icons-material/QueryStats';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/operating-margin-calculator",
    navName: "Operating Margin Calculator",
    navDescription: "Operating margin from income or revenue-COGS-OpEx.",
    name: "Operating Margin Calculator",
    description: "Calculate operating margin from operating income directly, or from revenue minus COGS minus operating expenses.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <QueryStatsIcon fontSize="large" color="primary"/>,
    seoTitle: "Operating Margin Calculator - Operating Profit Margin %",
    seoDescription: "Free operating margin calculator. Enter operating income or revenue, COGS, and operating expenses to find operating margin percentage.",
    keywords: ["operating margin calculator", "operating profit margin calculator", "how to calculate operating margin", "operating income margin calculator", "ebit margin calculator"],
    ogTitle: "Operating Margin Calculator - Operating Profit Margin % | ToolZoneX",
    ogDescription: "Calculate operating margin from operating income or from a revenue/COGS/OpEx breakdown.",
    schemaName: "Operating Margin Calculator",
    schemaDescription: "Calculate operating margin percentage from operating income, or from revenue minus COGS minus operating expenses.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is operating margin different from gross margin?", answer: "Gross margin only accounts for COGS — the direct cost of producing what's sold. Operating margin also subtracts operating expenses like salaries, rent, marketing, and admin costs, giving a fuller picture of how much of each revenue dollar survives after running the actual business, not just making the product." }, { question: "How is operating margin different from net margin?", answer: "Operating margin stops before interest and taxes. Net margin goes further still, subtracting interest expense and taxes to arrive at the final bottom-line profit margin." }, { question: "What's considered a good operating margin?", answer: "It varies by industry — software and services businesses often post operating margins of 20% or higher, while capital-intensive industries like retail or manufacturing frequently run margins in the single-digit to low-teens range. Compare against similar businesses in your industry." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
