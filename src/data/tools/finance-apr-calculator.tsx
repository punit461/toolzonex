import PercentIcon from '@mui/icons-material/Percent';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/apr-calculator",
    navName: "APR Calculator",
    navDescription: "Find the true annual cost of a loan including fees.",
    name: "APR Calculator",
    description: "Calculate the Annual Percentage Rate (APR) of a loan including fees. Compare loan offers and understand the true cost of borrowing.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PercentIcon fontSize="large" color="primary"/>,
    seoTitle: "APR Calculator - True Loan Cost with Fees",
    seoDescription: "Free APR calculator to find the true annual cost of a loan including fees. Compare mortgage, auto, and personal loan offers.",
    keywords: ["apr calculator", "annual percentage rate calculator", "loan apr calculator", "true cost of loan", "apr vs interest rate", "effective annual rate calculator"],
    ogTitle: "APR Calculator - True Loan Cost with Fees | ToolZoneX",
    ogDescription: "Calculate the Annual Percentage Rate of a loan including fees.",
    schemaName: "APR Calculator",
    schemaDescription: "Calculate the Annual Percentage Rate of a loan including fees.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is the difference between APR and interest rate?", answer: "The interest rate covers only the cost of borrowing principal. APR includes the interest rate plus fees and other loan costs." }, { question: "Is a lower APR always better?", answer: "Generally yes, but also consider the loan term and total cost. A lower APR with a much longer term could cost more overall." }, { question: "What is the difference between APR and Effective Annual Rate (EAR)?", answer: "APR is the nominal annual rate before accounting for compounding within the year. Effective Annual Rate (EAR) adjusts for how often interest compounds (monthly, daily, etc.), so EAR is always equal to or higher than APR when compounding happens more than once a year. Lenders are required to advertise APR, but EAR is the more accurate figure for comparing the true cost of two loans that compound at different frequencies." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
