import SavingsIcon from '@mui/icons-material/Savings';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/401k-calculator",
    navName: "401(k) Calculator",
    navDescription: "Project US retirement balance with employer match.",
    name: "401(k) Retirement Calculator",
    description: "Project your 401(k) balance at retirement, including employer match and 2026 IRS contribution limits.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SavingsIcon fontSize="large" color="primary"/>,
    seoTitle: "401(k) Calculator - Project Your Retirement Balance",
    seoDescription: "Free 401(k) retirement calculator with employer match and 2026 IRS contribution limits. Project your balance at retirement with a year-by-year growth chart.",
    keywords: ["401k calculator", "retirement calculator", "401k contribution limit 2026", "employer match calculator", "retirement savings calculator", "401k projection"],
    ogTitle: "401(k) Calculator - Project Your Retirement Balance | ToolZoneX",
    ogDescription: "Free 401(k) retirement calculator with employer match and 2026 IRS contribution limits.",
    schemaName: "401(k) Retirement Calculator",
    schemaDescription: "Project your 401(k) balance at retirement, including employer match and IRS contribution limits.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What return rate should I assume?", answer: "A diversified stock/bond portfolio has historically averaged roughly 6-8% annually over long horizons before inflation, though any single year can vary widely and past performance doesn't guarantee future results. This calculator does not adjust for inflation — treat the result as a nominal (not real/inflation-adjusted) future value." }, { question: "Am I leaving money on the table?", answer: "If your contribution percentage is below your employer's match cap, you're giving up free money. Most financial advisors recommend contributing at least enough to capture the full employer match before directing savings elsewhere." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
