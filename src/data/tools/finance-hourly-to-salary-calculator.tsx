import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/hourly-to-salary-calculator",
    navName: "Hourly to Salary Calculator",
    navDescription: "Hourly wage to weekly/monthly/annual pay.",
    name: "Hourly to Salary Calculator",
    description: "Convert an hourly wage and hours per week into equivalent weekly, monthly, and annual salary figures.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AccessTimeIcon fontSize="large" color="primary"/>,
    seoTitle: "Hourly to Salary Calculator - Convert Hourly Wage to Salary",
    seoDescription: "Free hourly to salary calculator. Enter your hourly wage and hours per week to see equivalent weekly, monthly, and annual salary.",
    keywords: ["hourly to salary calculator", "hourly wage to annual salary", "convert hourly to salary", "hourly pay calculator", "annual salary from hourly rate"],
    ogTitle: "Hourly to Salary Calculator - Convert Hourly Wage to Salary | ToolZoneX",
    ogDescription: "Convert an hourly wage into equivalent weekly, monthly, and annual salary.",
    schemaName: "Hourly to Salary Calculator",
    schemaDescription: "Convert an hourly wage and hours per week into equivalent weekly, monthly, and annual salary.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Does this account for overtime or unpaid time off?", answer: "No — this is a straight-line projection assuming the same hours every week, all 52 weeks of the year, with no overtime premium. For overtime pay, use the Payroll Calculator. Unpaid vacation or leave will reduce actual annual earnings below this estimate." }, { question: "Why 52 weeks instead of accounting for holidays?", answer: "52 weeks is the standard baseline for converting hourly pay to an annual figure. If you take unpaid holidays or leave, your actual annual earnings will be somewhat lower than this projection." }, { question: "How do I go the other direction — salary to hourly?", answer: "Use the Salary to Hourly Calculator to convert an annual salary back into an equivalent hourly wage." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
