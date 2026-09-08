import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/future-value-calculator",
    navName: "Future Value Calculator",
    navDescription: "Project lump-sum growth with compound interest.",
    name: "Future Value Calculator",
    description: "Project how much a lump-sum investment grows over time with compound interest at any compounding frequency.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "Future Value Calculator - Project Lump-Sum Growth",
    seoDescription: "Free future value calculator to project how a lump-sum investment grows with compound interest. Choose annual, quarterly, monthly, or daily compounding.",
    keywords: ["future value calculator", "fv calculator", "compound interest future value", "lump sum growth calculator", "present value to future value"],
    ogTitle: "Future Value Calculator - Project Lump-Sum Growth | ToolZoneX",
    ogDescription: "Project how a lump-sum investment grows over time with compound interest.",
    schemaName: "Future Value Calculator",
    schemaDescription: "Project how a lump-sum investment grows over time with compound interest at any compounding frequency.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Does more frequent compounding really help?", answer: "At the same nominal rate, more frequent compounding yields a slightly higher future value, though the difference shrinks as frequency increases." }, { question: "Is this the same as a SIP calculator?", answer: "No — this models a single lump sum. For recurring monthly contributions, use a SIP calculator." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
