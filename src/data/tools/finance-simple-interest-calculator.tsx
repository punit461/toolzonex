import PercentIcon from '@mui/icons-material/Percent';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/simple-interest-calculator",
    navName: "Simple Interest Calculator",
    navDescription: "Interest and total amount using P x R x T.",
    name: "Simple Interest Calculator",
    description: "Calculate simple interest and total maturity amount from principal, annual rate, and time period in years.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PercentIcon fontSize="large" color="primary"/>,
    seoTitle: "Simple Interest Calculator - Interest & Total Amount",
    seoDescription: "Free simple interest calculator to work out interest earned and total maturity amount from principal, rate, and time using the P x R x T formula.",
    keywords: ["simple interest calculator", "simple interest formula calculator", "SI calculator", "interest calculator", "principal interest calculator"],
    ogTitle: "Simple Interest Calculator - Interest & Total Amount | ToolZoneX",
    ogDescription: "Work out simple interest and total maturity amount from principal, rate, and time.",
    schemaName: "Simple Interest Calculator",
    schemaDescription: "Calculate simple interest and total amount from principal, rate, and time period.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What's the difference between simple and compound interest?", answer: "Simple interest is always calculated on the original principal only, so it grows linearly year over year. Compound interest is recalculated on the principal plus previously earned interest, so it grows faster over time. For compounding investments, use the Compound Interest Calculator instead." }, { question: "Does the interest amount change every year with simple interest?", answer: "No — because simple interest is always calculated on the same original principal, the interest earned (or owed) each year is identical, unlike compound interest where it increases annually." }, { question: "Where is simple interest actually used?", answer: "It's common in short-term loans, certain government bonds, some auto and consumer loans, and a few types of fixed deposits — anywhere a lender wants a simpler, more predictable interest structure than compounding." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
