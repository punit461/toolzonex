import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/closing-cost-calculator",
    navName: "Closing Cost Calculator",
    navDescription: "Estimate home purchase closing costs.",
    name: "Closing Cost Calculator",
    description: "Estimate closing costs on a home purchase and the total cash needed at closing including a down payment.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "Closing Cost Calculator - Estimate Home Closing Costs",
    seoDescription: "Free closing cost calculator. Enter home price and closing cost percentage to estimate closing costs and total cash needed at closing.",
    keywords: ["closing cost calculator", "home closing costs calculator", "mortgage closing cost estimator", "cash needed at closing calculator", "closing costs estimate"],
    ogTitle: "Closing Cost Calculator - Estimate Home Closing Costs | ToolZoneX",
    ogDescription: "Estimate closing costs on a home purchase and total cash needed at closing.",
    schemaName: "Closing Cost Calculator",
    schemaDescription: "Estimate closing costs on a home purchase and the total cash needed at closing including a down payment.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How accurate is the closing cost percentage?", answer: "This is a rough estimate only — actual closing costs vary by state, lender, loan type, and even the specific title company or attorney involved. Your lender is required to provide an official Loan Estimate with itemized costs once you apply for a mortgage." }, { question: "What's typically included in closing costs?", answer: "Common items include loan origination fees, appraisal and inspection fees, title search and title insurance, recording fees, and prepaid items like property taxes and homeowners insurance held in escrow." }, { question: "Do closing costs differ for buyers and sellers?", answer: "Yes — this calculator estimates buyer-side closing costs. Sellers typically pay their own separate costs, most notably real estate agent commissions, which are not included here." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
