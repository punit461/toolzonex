import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/loan-calculator",
    navName: "Loan Calculator",
    navDescription: "Calculate EMI and total interest.",
    name: "Loan Calculator - EMI & Mortgage Calculator",
    description: "Calculate your monthly EMI, total interest, and total payment amount for personal loans and mortgages.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AccountBalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "Loan Calculator - EMI & Mortgage Calculator",
    seoDescription: "Calculate your monthly EMI, total interest, and total payment amount for personal loans and mortgages.",
    keywords: ["loan calculator", "emi calculator", "mortgage calculator", "personal loan calculator", "car loan calculator"],
    ogTitle: "Loan Calculator - EMI & Mortgage Calculator | ToolZoneX",
    ogDescription: "Calculate your monthly EMI, total interest, and total payment amount for personal loans and mortgages.",
    schemaName: "Loan Calculator",
    schemaDescription: "Calculate your monthly EMI, total interest, and total payment amount for personal loans and mortgages.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Does prepaying a loan reduce my EMI or tenure?", answer: "Depends on your lender's policy — some reduce the tenure while keeping EMI the same, others reduce the EMI while keeping tenure the same. Either way, prepayment reduces total interest paid." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
