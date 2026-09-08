import PaymentsIcon from '@mui/icons-material/Payments';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/personal-loan-calculator",
    navName: "Personal Loan Calculator",
    navDescription: "EMI and total interest for unsecured personal loans.",
    name: "Personal Loan Calculator",
    description: "Calculate the monthly EMI, total interest, and total payback for an unsecured personal loan.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PaymentsIcon fontSize="large" color="primary"/>,
    seoTitle: "Personal Loan Calculator - EMI & Total Interest",
    seoDescription: "Free personal loan calculator to work out your monthly EMI, total interest, and total payback for unsecured personal loans at any rate or tenure.",
    keywords: ["personal loan calculator", "personal loan EMI calculator", "unsecured loan calculator", "personal loan interest calculator", "personal loan EMI"],
    ogTitle: "Personal Loan Calculator - EMI & Total Interest | ToolZoneX",
    ogDescription: "Work out your monthly EMI, total interest, and total payback for a personal loan.",
    schemaName: "Personal Loan Calculator",
    schemaDescription: "Calculate the monthly EMI, total interest, and total payback for an unsecured personal loan.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Why is my personal loan rate higher than a home loan rate?", answer: "Because a personal loan has no collateral backing it, the lender absorbs the full loss if you default — so they charge a higher rate to compensate for that added risk, unlike a home loan where the property itself secures the debt." }, { question: "Does my credit score affect the rate I get?", answer: "Significantly. Since there's no collateral, lenders rely heavily on your credit score and income stability to price the loan — a higher score typically unlocks a meaningfully lower rate on an unsecured personal loan than a borderline applicant would be offered." }, { question: "Is prepaying a personal loan worth it?", answer: "Usually yes, since personal loan rates are relatively high — prepaying reduces the principal you're paying interest on for the remaining tenure. Check your lender's prepayment or foreclosure charges first, as some apply a fee on early repayment." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
