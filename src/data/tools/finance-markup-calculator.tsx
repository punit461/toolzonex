import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/markup-calculator",
    navName: "Markup Calculator",
    navDescription: "Selling price & profit from cost and markup %.",
    name: "Markup Calculator",
    description: "Calculate selling price and profit from a cost price and desired markup percentage, and see the equivalent profit margin for comparison.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <RequestQuoteIcon fontSize="large" color="primary"/>,
    seoTitle: "Markup Calculator - Selling Price From Cost & Markup %",
    seoDescription: "Free markup calculator. Enter cost price and desired markup percentage to get selling price, profit, and the equivalent profit margin.",
    keywords: ["markup calculator", "markup percentage calculator", "cost to selling price calculator", "markup vs margin calculator", "pricing markup calculator"],
    ogTitle: "Markup Calculator - Selling Price & Profit | ToolZoneX",
    ogDescription: "Calculate selling price and profit from cost price and markup percentage.",
    schemaName: "Markup Calculator",
    schemaDescription: "Calculate selling price and profit from a cost price and desired markup percentage, and see the equivalent profit margin.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Should I price based on markup or margin?", answer: "Either works, but be clear about which one you're using — many retailers think in markup (easy to calculate from cost) while financial statements and profitability benchmarks are usually expressed as margin (percentage of revenue). This calculator shows both so you can see the relationship for any given pricing decision." }, { question: "Why is margin always lower than markup for the same price?", answer: "Because margin divides profit by the larger selling price, while markup divides the same profit by the smaller cost price — dividing by a bigger number always produces a smaller percentage." }, { question: "What markup should I use?", answer: "It varies widely by industry — retail markups commonly range from 20% to 100%+ depending on the product category, competition, and what customers are willing to pay. There's no universal correct number; it should cover your costs, desired margin, and market positioning." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
