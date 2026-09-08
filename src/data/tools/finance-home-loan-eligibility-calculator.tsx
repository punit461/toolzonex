import HomeIcon from '@mui/icons-material/Home';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/home-loan-eligibility-calculator",
    navName: "Home Loan Eligibility Calculator",
    navDescription: "Max eligible loan amount by income & EMI ratio.",
    name: "Home Loan Eligibility Calculator",
    description: "Calculate the maximum home loan amount you're likely eligible for, based on income, existing EMIs, interest rate, tenure, and EMI-to-income ratio.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeIcon fontSize="large" color="primary"/>,
    seoTitle: "Home Loan Eligibility Calculator - Max Loan Amount",
    seoDescription: "Free home loan eligibility calculator to estimate the maximum loan amount you qualify for based on income, existing EMIs, interest rate, and tenure.",
    keywords: ["home loan eligibility calculator", "maximum home loan calculator", "home loan amount calculator", "how much home loan can I get", "loan eligibility by income calculator"],
    ogTitle: "Home Loan Eligibility Calculator - Max Loan Amount | ToolZoneX",
    ogDescription: "Estimate the maximum home loan amount you qualify for based on income and EMIs.",
    schemaName: "Home Loan Eligibility Calculator",
    schemaDescription: "Calculate maximum eligible home loan amount based on income, existing EMIs, interest rate, and tenure.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What EMI-to-income ratio do banks actually use?", answer: "It varies by lender and your income level, but 40-50% of gross monthly income (across all EMIs combined, including the new home loan) is a common range. Lower-income borrowers are often held to a stricter cap than higher-income borrowers." }, { question: "Does a longer tenure increase my eligibility?", answer: "Yes — spreading the same loan over more months lowers the EMI, which lets you qualify for a larger loan amount within the same EMI cap. The tradeoff is more total interest paid over the life of the loan." }, { question: "Is this the same figure a bank will approve?", answer: "No — this is an estimate based on income and EMI ratio alone. Actual bank approval also weighs your credit score, employment type and stability, the property's value, existing relationship with the bank, and its own internal lending policies, so your actual sanctioned amount may differ." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
