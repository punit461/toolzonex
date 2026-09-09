import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/income-tax-calculator",
    navName: "Income Tax Calculator",
    navDescription: "Compare Old vs New Tax Regime.",
    name: "Income Tax Calculator FY 2025-26",
    description: "Calculate your income tax for FY 2025-26 (AY 2026-27) under New and Old Regime. Includes HRA, 80C, 80D, NPS, home loan, rebate 87A, surcharge, and cess.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AccountBalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "Income Tax Calculator - Old vs New Tax Regime FY 2025-26",
    seoDescription: "Free income tax calculator to compare tax liability under old and new tax regimes. Calculate income tax for FY 2025-26 with latest slabs and deductions.",
    keywords: ["income tax calculator", "tax regime", "old vs new tax regime", "income tax FY 2025-26", "tax slabs", "tax deduction", "India income tax"],
    ogTitle: "Income Tax Calculator - Old vs New Tax Regime FY 2025-26 | ToolZoneX",
    ogDescription: "Compare tax liability under old and new tax regimes for FY 2025-26.",
    schemaName: "Income Tax Calculator",
    schemaDescription: "Compare tax liability under old and new tax regimes.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Which regime should I choose?", answer: "The New Regime generally suits those with few deductions/investments, since it offers lower slab rates but no exemptions. The Old Regime can work out better if you have significant 80C, 80D, HRA, or home loan deductions — compare both here to see which is lower for your numbers." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
