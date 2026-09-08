import PaidIcon from '@mui/icons-material/Paid';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/annual-salary-calculator",
    navName: "Annual Salary Calculator",
    navDescription: "Any pay period converted to annual salary.",
    name: "Annual Salary Calculator",
    description: "Convert hourly, weekly, biweekly, or monthly pay into an equivalent annual salary, with a full breakdown across all pay periods.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PaidIcon fontSize="large" color="primary"/>,
    seoTitle: "Annual Salary Calculator - Any Pay Period to Annual",
    seoDescription: "Free annual salary calculator. Convert hourly, weekly, biweekly, or monthly pay into an equivalent annual salary and see all pay period breakdowns.",
    keywords: ["annual salary calculator", "pay period to annual salary", "biweekly to annual salary", "monthly to annual salary", "salary conversion calculator"],
    ogTitle: "Annual Salary Calculator - Any Pay Period to Annual | ToolZoneX",
    ogDescription: "Convert hourly, weekly, biweekly, or monthly pay into an equivalent annual salary.",
    schemaName: "Annual Salary Calculator",
    schemaDescription: "Convert hourly, weekly, biweekly, or monthly pay into an equivalent annual salary with a full pay period breakdown.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why are there 26 biweekly periods but only 12 monthly ones?", answer: "Biweekly pay happens every two weeks, and a year has 52 weeks, so that's 26 pay periods — not the same as 24 (twice a month). Semi-monthly pay, which is exactly twice a month, would use 24 periods instead; biweekly and semi-monthly are easy to confuse but aren't identical." }, { question: "Does this account for unpaid time off or overtime?", answer: "No — this is a straight-line projection assuming the entered pay period repeats consistently all year with no unpaid leave and no overtime premium. Actual annual earnings may be lower or higher depending on time off taken and any overtime worked." }, { question: "How is this different from an hourly-to-salary conversion?", answer: "This tool accepts any starting pay period — hourly, weekly, biweekly, or monthly — and converts it to an annual figure, making it useful when comparing offers that aren't all quoted hourly." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
