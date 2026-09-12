import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/operating-cash-flow-calculator",
    navName: "Operating Cash Flow Calculator",
    navDescription: "Cash flow from net income, D&A, and working capital.",
    name: "Operating Cash Flow Calculator",
    description: "Calculate operating cash flow from net income, depreciation and amortization, and the change in working capital.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AccountBalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "Operating Cash Flow Calculator - OCF Formula",
    seoDescription: "Free operating cash flow calculator. Enter net income, D&A, and change in working capital to calculate OCF.",
    keywords: ["operating cash flow calculator", "ocf calculator", "cash flow from operations calculator", "operating cash flow formula", "cash flow calculator"],
    ogTitle: "Operating Cash Flow Calculator - OCF Formula | ToolZoneX",
    ogDescription: "Calculate operating cash flow from net income, depreciation and amortization, and working capital change.",
    schemaName: "Operating Cash Flow Calculator",
    schemaDescription: "Calculate operating cash flow from net income, depreciation and amortization, and the change in working capital.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What sign should I use for the working capital change?", answer: "Enter a positive number if working capital increased during the period (which reduces cash flow), and a negative number if it decreased (which increases cash flow). The field label reminds you of this convention — it's the most common source of error in this calculation." }, { question: "Why isn't operating cash flow the same as net income?", answer: "Net income includes non-cash items like depreciation and is affected by accrual accounting timing (recording revenue or expenses before cash actually changes hands). OCF strips those effects out to show real cash movement from day-to-day operations." }, { question: "Does OCF include capital expenditures or financing activities?", answer: "No — operating cash flow covers only core business operations. Capital expenditures fall under investing activities, and things like debt repayment or dividends fall under financing activities, both reported separately on a full cash flow statement." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
