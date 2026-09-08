import FlagIcon from '@mui/icons-material/Flag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/sales-target-calculator",
    navName: "Sales Target Calculator",
    navDescription: "Deals and leads needed to hit a revenue goal.",
    name: "Sales Target Calculator",
    description: "Calculate the number of deals and leads needed to reach a revenue goal from average deal size and conversion rate.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <FlagIcon fontSize="large" color="primary"/>,
    seoTitle: "Sales Target Calculator - Deals & Leads Needed",
    seoDescription: "Free sales target calculator. Enter your revenue goal, average deal size, and conversion rate to find deals and leads needed.",
    keywords: ["sales target calculator", "leads needed calculator", "deals needed calculator", "sales goal calculator", "revenue goal calculator"],
    ogTitle: "Sales Target Calculator - Deals & Leads Needed | ToolZoneX",
    ogDescription: "Calculate the number of deals and leads needed to reach a revenue goal.",
    schemaName: "Sales Target Calculator",
    schemaDescription: "Calculate the number of deals and leads needed to reach a revenue goal from average deal size and conversion rate.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What if my deal size varies a lot between customers?", answer: "Use your average deal size across recent closed deals — the more consistent your historical pipeline, the more reliable this estimate will be. For very lumpy deal sizes, consider segmenting into separate calculations for different deal tiers." }, { question: "What conversion rate should I use?", answer: "Use your actual historical lead-to-close rate over a recent, representative period. If you don't have that data yet, start with an industry benchmark and refine it once you have real numbers." }, { question: "Does this account for sales cycle length?", answer: "No — this calculates the volume of leads and deals needed to hit a revenue number, not the timing. You'll need to factor your typical sales cycle length separately when planning when to start generating those leads." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
