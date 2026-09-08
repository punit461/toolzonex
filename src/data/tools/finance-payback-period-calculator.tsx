import TimerIcon from '@mui/icons-material/Timer';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/payback-period-calculator",
    navName: "Payback Period Calculator",
    navDescription: "Time to recover an initial investment.",
    name: "Payback Period Calculator",
    description: "Calculate the payback period for an investment using a constant annual cash inflow, or enter variable yearly inflows for a year-by-year breakdown.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TimerIcon fontSize="large" color="primary"/>,
    seoTitle: "Payback Period Calculator - Investment Recovery Time",
    seoDescription: "Free payback period calculator. Enter an initial investment and annual cash inflow (constant or variable) to find how long it takes to break even.",
    keywords: ["payback period calculator", "payback period formula", "investment payback calculator", "simple payback period", "cash flow payback calculator"],
    ogTitle: "Payback Period Calculator - Investment Recovery Time | ToolZoneX",
    ogDescription: "Calculate how long it takes to recover an initial investment from cash inflows.",
    schemaName: "Payback Period Calculator",
    schemaDescription: "Calculate the simple, non-discounted payback period for an investment from its cash inflows.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why doesn't this account for the time value of money?", answer: "The simple payback period intentionally ignores discounting for ease of use. For a discounted view that accounts for the time value of money, use a discounted payback period or the Present Value Calculator alongside this tool." }, { question: "What is a good payback period?", answer: "It depends on the industry and risk tolerance — many businesses target 2-4 years for equipment or smaller projects, while larger infrastructure investments may accept much longer payback windows." }, { question: "What if cash inflows never recover the investment?", answer: "In variable mode, if cumulative cash flow never turns positive within the years you've entered, the calculator shows that the investment isn't recovered within that timeframe — add more years of inflows to see when (or if) it would be." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
