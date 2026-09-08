import QueryStatsIcon from '@mui/icons-material/QueryStats';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/cagr-calculator",
    navName: "CAGR Calculator",
    navDescription: "Compound Annual Growth Rate between two values.",
    name: "CAGR Calculator",
    description: "Calculate the Compound Annual Growth Rate (CAGR) between an initial and final value over a number of years.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <QueryStatsIcon fontSize="large" color="primary"/>,
    seoTitle: "CAGR Calculator - Compound Annual Growth Rate",
    seoDescription: "Free CAGR calculator to work out the Compound Annual Growth Rate between an initial and final value over any number of years.",
    keywords: ["CAGR calculator", "compound annual growth rate calculator", "CAGR formula", "annualized return calculator", "investment growth rate calculator"],
    ogTitle: "CAGR Calculator - Compound Annual Growth Rate | ToolZoneX",
    ogDescription: "Work out the Compound Annual Growth Rate between an initial and final value.",
    schemaName: "CAGR Calculator",
    schemaDescription: "Calculate the Compound Annual Growth Rate between an initial and final value over a number of years.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Is CAGR the same as the actual annual return each year?", answer: "No — CAGR is a smoothed average. The actual value may have risen sharply one year and fallen the next; CAGR only tells you the equivalent steady rate that connects the start and end points, not what happened in between." }, { question: "How is CAGR different from absolute (total) return?", answer: "Absolute return is the total percentage gain over the entire period, regardless of how long it took. CAGR annualizes that gain, which makes it possible to fairly compare, say, a 50% return over 3 years against a 50% return over 8 years — the shorter period has the higher CAGR." }, { question: "Can CAGR be negative?", answer: "Yes — if the final value is lower than the initial value, CAGR comes out negative, representing the annualized rate of decline over the period." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
