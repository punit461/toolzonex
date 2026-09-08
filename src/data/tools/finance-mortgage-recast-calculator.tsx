import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/mortgage-recast-calculator",
    navName: "Mortgage Recast Calculator",
    navDescription: "New payment after a lump-sum principal payment.",
    name: "Mortgage Recast Calculator",
    description: "Calculate your new, lower monthly mortgage payment after applying a lump-sum payment toward principal, keeping the same rate and remaining term.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "Mortgage Recast Calculator - New Payment After Lump Sum",
    seoDescription: "Free mortgage recast calculator. Enter your balance, rate, remaining term, and a lump-sum payment to see your new, lower monthly payment.",
    keywords: ["mortgage recast calculator", "recast mortgage calculator", "mortgage recasting", "lump sum mortgage payment calculator", "re-amortize mortgage"],
    ogTitle: "Mortgage Recast Calculator - New Payment After Lump Sum | ToolZoneX",
    ogDescription: "Calculate your new, lower monthly mortgage payment after a lump-sum principal payment.",
    schemaName: "Mortgage Recast Calculator",
    schemaDescription: "Calculate your new, lower monthly mortgage payment after applying a lump-sum payment toward principal, keeping the same rate and remaining term.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is recasting different from refinancing?", answer: "Refinancing replaces your loan with a brand-new one, which can change your rate and term and typically requires a credit check, appraisal, and full closing costs. Recasting keeps your original loan, rate, and term — it simply recalculates your payment based on a lower balance after a lump-sum payment, usually for a modest flat fee." }, { question: "Does recasting shorten my loan term?", answer: "No — recasting keeps the same remaining term but lowers the monthly payment. If you want to pay off the loan faster while keeping the same payment, making extra principal payments without recasting (or refinancing to a shorter term) accomplishes that instead." }, { question: "Is every mortgage eligible for recasting?", answer: "Not always — recasting availability and rules (minimum lump-sum amount, fees, eligible loan types) vary by lender and loan type. Government-backed loans like FHA or VA loans often don't allow recasting. Check with your loan servicer to confirm eligibility." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
