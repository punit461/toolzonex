import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/startup-equity-calculator",
    navName: "Startup Equity Calculator",
    navDescription: "Estimate the value of a stock grant.",
    name: "Startup Equity Calculator",
    description: "Calculate the ownership percentage and dollar value of a startup stock or option grant based on shares outstanding and company valuation.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PieChartOutlineIcon fontSize="large" color="primary"/>,
    seoTitle: "Startup Equity Calculator - Calculate Stock Option Value",
    seoDescription: "Free startup equity calculator. Enter shares granted, total shares outstanding, and company valuation to calculate ownership percentage and grant value.",
    keywords: ["startup equity calculator", "stock option calculator", "equity grant calculator", "ownership percentage calculator", "startup stock options"],
    ogTitle: "Startup Equity Calculator - Calculate Stock Option Value | ToolZoneX",
    ogDescription: "Calculate the ownership percentage and dollar value of a startup equity grant.",
    schemaName: "Startup Equity Calculator",
    schemaDescription: "Calculate the ownership percentage and dollar value of a startup stock or option grant based on shares outstanding and company valuation.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Is this dollar value guaranteed?", answer: "No — this is an estimate based on the company's current valuation, which can rise, fall, or go to zero. Private company valuations are also inherently uncertain until a liquidity event like an acquisition or IPO actually occurs." }, { question: "What is a vesting cliff?", answer: "A cliff is a minimum period (commonly one year) you must stay before any of your equity vests at all. If you leave before the cliff, you typically forfeit the entire grant, even if it's been several months." }, { question: "Does dilution affect my ownership percentage over time?", answer: "Yes — when a company issues new shares (for example, in a future funding round), total shares outstanding increases, which dilutes existing shareholders' percentage ownership unless they receive additional shares to offset it. Re-run this calculator with an updated total-shares figure to see your diluted ownership after a new round." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
