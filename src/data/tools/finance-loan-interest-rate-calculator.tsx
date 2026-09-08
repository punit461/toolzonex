import PercentIcon from '@mui/icons-material/Percent';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/loan-interest-rate-calculator",
    navName: "Loan Interest Rate Calculator",
    navDescription: "Find the rate a loan actually carries.",
    name: "Loan Interest Rate Calculator",
    description: "Find the effective interest rate behind a loan amount, EMI, and tenure. Free online loan interest rate calculator.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PercentIcon fontSize="large" color="primary"/>,
    seoTitle: "Loan Interest Rate Calculator - Find Rate From EMI & Tenure",
    seoDescription: "Free online loan interest rate calculator. Enter the loan amount, monthly EMI, and tenure to find the annual interest rate, total payable, and total interest.",
    keywords: ["loan interest rate calculator", "calculate interest rate on loan", "find interest rate", "emi to rate of interest", "loan rate from emi", "effective interest rate"],
    ogTitle: "Loan Interest Rate Calculator - Rate From EMI | ToolZoneX",
    ogDescription: "Find the annual interest rate behind any loan amount, EMI, and tenure.",
    schemaName: "Loan Interest Rate Calculator",
    schemaDescription: "Find the effective annual interest rate of a loan from its amount, EMI, and tenure.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How does it find the rate?", answer: "It uses the EMI formula — EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1) — and searches for the monthly rate r that makes the formula match your EMI, then multiplies by 12 for an approximate annual rate." }, { question: "Is the annual rate exact?", answer: "It is an effective equivalent rate — monthly compounding × 12. Lenders may quote slightly different figures depending on reducing-balance vs. flat-rate methods and processing fees." }, { question: "Which loan is this for?", answer: "Any reducing-balance, equated-monthly-instalment loan — personal, car, home, or education loans. Enter the EMI you actually pay to reveal the effective rate." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
