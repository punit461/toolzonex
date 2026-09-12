import BalanceIcon from '@mui/icons-material/Balance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/debt-service-coverage-ratio-calculator",
    navName: "DSCR Calculator",
    navDescription: "Calculate debt service coverage ratio.",
    name: "Debt Service Coverage Ratio (DSCR) Calculator",
    description: "Calculate the Debt Service Coverage Ratio (DSCR) from net operating income and total annual debt service to check lending eligibility.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <BalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "DSCR Calculator - Debt Service Coverage Ratio Calculator",
    seoDescription: "Free DSCR calculator. Enter net operating income and total annual debt service to calculate your Debt Service Coverage Ratio for loan qualification.",
    keywords: ["dscr calculator", "debt service coverage ratio calculator", "dscr formula", "debt service coverage ratio", "dscr loan calculator"],
    ogTitle: "DSCR Calculator - Debt Service Coverage Ratio Calculator | ToolZoneX",
    ogDescription: "Calculate your Debt Service Coverage Ratio from net operating income and debt service.",
    schemaName: "Debt Service Coverage Ratio (DSCR) Calculator",
    schemaDescription: "Calculate the Debt Service Coverage Ratio (DSCR) from net operating income and total annual debt service to check lending eligibility.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What DSCR do lenders typically require?", answer: "Many commercial and DSCR-loan lenders look for a minimum around 1.25x, though requirements range from roughly 1.0x to 1.5x or higher depending on the lender, property type, loan program, and perceived risk of the deal." }, { question: "What does a DSCR below 1.0 mean?", answer: "A DSCR below 1.0 means net operating income isn't sufficient to cover the debt payments on its own, which would require drawing on cash reserves or other income sources to stay current — a red flag for most lenders." }, { question: "How do I calculate net operating income?", answer: "NOI is typically total revenue minus operating expenses, excluding debt payments, income taxes, depreciation, and capital expenditures. For a rental property, that's rental income minus expenses like maintenance, insurance, property management, and property taxes." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
