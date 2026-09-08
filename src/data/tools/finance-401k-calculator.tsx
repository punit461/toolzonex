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
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
