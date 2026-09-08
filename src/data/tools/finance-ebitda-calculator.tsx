import AssessmentIcon from '@mui/icons-material/Assessment';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/ebitda-calculator",
    navName: "EBITDA Calculator",
    navDescription: "Earnings before interest, tax, D&A.",
    name: "EBITDA Calculator",
    description: "Calculate EBITDA from revenue, operating expenses, depreciation, and amortization. See operating income, D&A added back, and EBITDA margin.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AssessmentIcon fontSize="large" color="primary"/>,
    seoTitle: "EBITDA Calculator - Earnings Before Interest, Tax, D&A",
    seoDescription: "Free EBITDA calculator. Enter revenue, operating expenses, depreciation, and amortization to calculate EBITDA and EBITDA margin.",
    keywords: ["ebitda calculator", "ebitda formula", "earnings before interest tax depreciation amortization", "ebitda margin calculator", "operating income calculator"],
    ogTitle: "EBITDA Calculator - Earnings Before Interest, Tax, D&A | ToolZoneX",
    ogDescription: "Calculate EBITDA and EBITDA margin from revenue, operating expenses, and D&A.",
    schemaName: "EBITDA Calculator",
    schemaDescription: "Calculate EBITDA from revenue, operating expenses, depreciation, and amortization.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why add back depreciation and amortization?", answer: "Depreciation and amortization are non-cash accounting charges that spread the cost of assets over time. Adding them back highlights the cash-generating power of operations, independent of how assets were financed or written down." }, { question: "Is EBITDA the same as cash flow?", answer: "No. EBITDA ignores working capital changes, capital expenditures, interest, and taxes — all of which affect actual cash flow. It's a profitability proxy, not a substitute for a cash flow statement." }, { question: "What is a good EBITDA margin?", answer: "It varies widely by industry. Software and services companies often see 20-40%+ margins, while capital-intensive or low-margin retail businesses may run in the single digits to low teens." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
