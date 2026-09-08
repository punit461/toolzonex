import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/compound-interest-calculator",
    navName: "Compound Interest Calculator",
    navDescription: "See the power of compounding on a lump sum.",
    name: "Compound Interest Calculator",
    description: "Calculate how a lump-sum investment grows with the power of compounding, at any compounding frequency.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "Compound Interest Calculator - Power of Compounding",
    seoDescription: "Free compound interest calculator to see how a lump-sum investment grows with the power of compounding. Choose annual, quarterly, monthly, or daily compounding.",
    keywords: ["compound interest calculator", "power of compounding", "power compounding", "compounding calculator", "interest on interest", "lump sum investment calculator"],
    ogTitle: "Compound Interest Calculator - Power of Compounding | ToolZoneX",
    ogDescription: "See how a lump-sum investment grows with the power of compounding at any compounding frequency.",
    schemaName: "Compound Interest Calculator",
    schemaDescription: "Calculate how a lump-sum investment grows with the power of compounding.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Does compounding frequency really make a big difference?", answer: "At the same nominal rate, more frequent compounding (e.g. monthly vs. annually) produces a slightly higher return, but the difference is modest — the bigger levers are the rate itself and how long the money stays invested." }, { question: "Is this the same as a SIP calculator?", answer: "No — this tool models a single lump-sum investment. For regular monthly contributions, use the SIP Calculator instead." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
