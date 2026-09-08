import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/loan-interest-comparison-calculator",
    navName: "Loan Interest Comparison Calculator",
    navDescription: "Compare total interest across loan offers.",
    name: "Loan Interest Comparison Calculator",
    description: "Compare two or more loan offers side by side by principal, rate, and term to see monthly payment, total interest, and total cost — with the lowest-interest offer highlighted.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CompareArrowsIcon fontSize="large" color="primary"/>,
    seoTitle: "Loan Interest Comparison Calculator - Compare Loan Offers",
    seoDescription: "Free loan interest comparison calculator. Compare two or more loan offers by principal, rate, and term to see which one costs the least in total interest.",
    keywords: ["loan interest comparison calculator", "compare loan offers", "loan comparison calculator", "compare loan interest rates", "which loan is cheaper calculator"],
    ogTitle: "Loan Interest Comparison Calculator - Compare Loan Offers | ToolZoneX",
    ogDescription: "Compare loan offers side by side by monthly payment, total interest, and total cost.",
    schemaName: "Loan Interest Comparison Calculator",
    schemaDescription: "Compare multiple loan offers by principal, interest rate, and term to find monthly payment, total interest, and total cost for each.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why does the highlighted offer have the lowest interest instead of the lowest payment?", answer: "The lowest monthly payment often comes from stretching the term out, which usually increases total interest paid. This tool highlights whichever offer costs the least in total interest over the life of the loan, since that's the truest measure of which loan is cheapest." }, { question: "Can I compare more than two offers at once?", answer: "Yes — use the \"Add Loan Offer\" button to add as many offers as you want to compare side by side in the same table." }, { question: "Does this include fees like origination charges?", answer: "No — this compares principal, rate, and term only. If a lender charges an origination fee or other upfront costs, add that to your own comparison separately, since it isn't reflected in the total interest shown here." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
