import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/mortgage-calculator",
    navName: "US Mortgage Calculator",
    navDescription: "Monthly payment (PITI) with tax, insurance & PMI.",
    name: "US Mortgage Calculator",
    description: "Estimate your full monthly mortgage payment (PITI) with property tax, insurance, PMI, and a year-by-year amortization chart.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "US Mortgage Calculator - Monthly Payment (PITI) & Amortization",
    seoDescription: "Free US mortgage calculator with property tax, home insurance, PMI, and HOA. See your full monthly payment (PITI) and a year-by-year amortization chart.",
    keywords: ["mortgage calculator", "US mortgage calculator", "PITI calculator", "monthly mortgage payment", "amortization calculator", "PMI calculator", "home loan calculator"],
    ogTitle: "US Mortgage Calculator - Monthly Payment (PITI) & Amortization | ToolZoneX",
    ogDescription: "Free US mortgage calculator with property tax, home insurance, PMI, and HOA.",
    schemaName: "US Mortgage Calculator",
    schemaDescription: "Estimate your full monthly mortgage payment (PITI) with property tax, insurance, PMI, and a year-by-year amortization chart.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What's the difference between a 15-year and 30-year mortgage?", answer: "A 15-year term has a higher monthly payment but a lower interest rate and dramatically less total interest paid over the life of the loan, since the balance is paid down faster. A 30-year term lowers the monthly payment but roughly doubles the total interest paid at the same rate." }, { question: "When does PMI go away?", answer: "By law, lenders must automatically cancel PMI once your loan balance reaches 78% of the original home value, assuming payments are current. You can also request cancellation earlier, once you reach 80% equity, if the loan is in good standing." }, { question: "Does this include closing costs?", answer: "No — this calculator projects the recurring monthly payment (PITI + HOA) and amortization only. Closing costs (typically 2-5% of the loan amount) are a separate, one-time expense paid at signing." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
