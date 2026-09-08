import SavingsIcon from '@mui/icons-material/Savings';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/ira-roth-calculator",
    navName: "IRA & Roth IRA Calculator",
    navDescription: "2026 contribution limits, Roth eligibility & deduction phase-out.",
    name: "IRA & Roth IRA Contribution Calculator",
    description: "Check your 2026 IRA contribution limit, Roth IRA eligibility by income, and Traditional IRA deduction phase-out.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SavingsIcon fontSize="large" color="primary"/>,
    seoTitle: "IRA & Roth IRA Calculator - 2026 Contribution Limits & Eligibility",
    seoDescription: "Free IRA and Roth IRA calculator. Check your 2026 contribution limit, Roth IRA income eligibility, and Traditional IRA deduction phase-out by filing status.",
    keywords: ["ira calculator", "roth ira calculator", "roth ira income limit", "traditional ira deduction", "ira contribution limit 2026", "backdoor roth"],
    ogTitle: "IRA & Roth IRA Calculator - 2026 Contribution Limits & Eligibility | ToolZoneX",
    ogDescription: "Check your 2026 IRA contribution limit, Roth eligibility by income, and Traditional IRA deduction phase-out.",
    schemaName: "IRA & Roth IRA Contribution Calculator",
    schemaDescription: "Check your 2026 IRA contribution limit, Roth IRA eligibility by income, and Traditional IRA deduction phase-out.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
