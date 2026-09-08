import PaymentsIcon from '@mui/icons-material/Payments';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/accounts-payable-days-calculator",
    navName: "Accounts Payable Days Calculator",
    navDescription: "DPO — days a business takes to pay suppliers.",
    name: "Accounts Payable Days Calculator (DPO)",
    description: "Calculate Days Payable Outstanding (DPO) from accounts payable, cost of goods sold, and period length to measure how long a business takes to pay suppliers.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PaymentsIcon fontSize="large" color="primary"/>,
    seoTitle: "Accounts Payable Days Calculator - DPO Formula",
    seoDescription: "Free accounts payable days (DPO) calculator. Enter accounts payable, COGS, and period days to calculate Days Payable Outstanding.",
    keywords: ["accounts payable days calculator", "dpo calculator", "days payable outstanding calculator", "dpo formula", "average payment period calculator"],
    ogTitle: "Accounts Payable Days Calculator - DPO Formula | ToolZoneX",
    ogDescription: "Calculate Days Payable Outstanding (DPO) from accounts payable and cost of goods sold.",
    schemaName: "Accounts Payable Days Calculator",
    schemaDescription: "Calculate Days Payable Outstanding (DPO) as accounts payable divided by cost of goods sold, multiplied by the number of days in the period.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How does DPO relate to DSO?", answer: "DPO measures how long you take to pay suppliers, while Days Sales Outstanding (DSO) measures how long it takes you to collect from customers — see the Accounts Receivable Days Calculator for that side. A business collecting faster than it pays (low DSO, high DPO) has favorable cash-flow timing, since it holds cash from sales longer than it needs to before its own bills come due." }, { question: "Is a higher DPO always better?", answer: "Not necessarily — while a higher DPO can improve short-term cash flow, stretching payments too far can damage supplier relationships, risk late fees, or signal financial distress. Balance DPO against maintaining healthy supplier terms." }, { question: "Why use COGS instead of total purchases?", answer: "COGS is commonly used as a proxy for the value of goods and services a business owes suppliers for, since detailed purchase data isn't always available externally. If you have precise total credit purchases figures, you can substitute that for a more exact DPO." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
