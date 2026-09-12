import SavingsIcon from '@mui/icons-material/Savings';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/recurring-deposit-calculator",
    navName: "Recurring Deposit Calculator",
    navDescription: "Calculate RD maturity amount and interest.",
    name: "Recurring Deposit Calculator",
    description: "Calculate the maturity amount, total deposits, and interest earned for a recurring deposit.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SavingsIcon fontSize="large" color="primary"/>,
    seoTitle: "Recurring Deposit Calculator - RD Maturity Calculator",
    seoDescription: "Free recurring deposit calculator to find your RD maturity amount, total deposits, and interest earned. Plan your monthly savings today.",
    keywords: ["recurring deposit calculator", "rd calculator", "rd maturity calculator", "rd interest calculator", "rd maturity amount", "monthly deposit calculator"],
    ogTitle: "Recurring Deposit Calculator - RD Maturity Calculator | ToolZoneX",
    ogDescription: "Calculate your recurring deposit maturity amount, total deposits, and interest earned instantly.",
    schemaName: "Recurring Deposit Calculator",
    schemaDescription: "Calculate the maturity amount for a recurring deposit.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Is this interest compounded quarterly like real banks?", answer: "This calculator uses monthly compounding. Actual bank RD products may compound quarterly." }, { question: "Are taxes deducted?", answer: "The calculator shows pre-tax amounts. Banks may deduct TDS on interest above the annual exemption limit." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
