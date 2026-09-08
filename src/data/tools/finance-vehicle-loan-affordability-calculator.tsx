import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/vehicle-loan-affordability-calculator",
    navName: "Vehicle Loan Affordability Calculator",
    navDescription: "Max car loan factoring insurance & maintenance.",
    name: "Vehicle Loan Affordability Calculator",
    description: "Calculate the maximum car loan you can afford by factoring in income, existing debts, target DTI, and estimated insurance and maintenance costs.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <DirectionsCarIcon fontSize="large" color="primary"/>,
    seoTitle: "Vehicle Loan Affordability Calculator - Max Car Loan",
    seoDescription: "Free vehicle loan affordability calculator. Factor in income, debts, target DTI, and insurance/maintenance costs to find your max affordable car loan.",
    keywords: ["vehicle loan affordability calculator", "car loan affordability calculator", "how much car can i afford", "max car loan calculator", "auto loan affordability calculator"],
    ogTitle: "Vehicle Loan Affordability Calculator - Max Car Loan | ToolZoneX",
    ogDescription: "Calculate the maximum car loan you can afford, factoring in insurance and maintenance costs.",
    schemaName: "Vehicle Loan Affordability Calculator",
    schemaDescription: "Calculate maximum affordable vehicle loan amount from income, existing debts, target debt-to-income ratio, loan terms, and estimated insurance/maintenance costs.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the general Loan Affordability Calculator?", answer: "The general Loan Affordability Calculator is a purpose-agnostic tool that only considers income, existing debts, and target DTI. This vehicle-specific tool additionally factors in ongoing insurance and maintenance costs before computing your max car payment — since those costs are unavoidable with vehicle ownership and directly reduce what you can actually put toward a loan payment." }, { question: "Why subtract insurance and maintenance before computing the loan amount?", answer: "A car payment is only part of the true cost of owning a vehicle. If insurance and maintenance aren't budgeted for up front, you risk approving yourself for a loan payment you can't actually sustain once those recurring costs are added in." }, { question: "What DTI ratio should I target for a car loan?", answer: "Many financial guidelines suggest keeping total debt payments (including a car loan) under 36% of gross income, though auto lenders individually may allow higher ratios. A lower target DTI leaves more room in your budget for savings and unexpected expenses." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
