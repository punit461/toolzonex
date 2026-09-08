import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/salary-to-hourly-calculator",
    navName: "Salary to Hourly Calculator",
    navDescription: "Annual salary to equivalent hourly wage.",
    name: "Salary to Hourly Calculator",
    description: "Convert an annual salary and hours per week into an equivalent hourly wage, plus weekly and monthly pay figures.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <MonetizationOnIcon fontSize="large" color="primary"/>,
    seoTitle: "Salary to Hourly Calculator - Convert Salary to Hourly Wage",
    seoDescription: "Free salary to hourly calculator. Enter your annual salary and hours per week to see your equivalent hourly wage, weekly, and monthly pay.",
    keywords: ["salary to hourly calculator", "annual salary to hourly rate", "convert salary to hourly", "hourly rate from salary", "salary breakdown calculator"],
    ogTitle: "Salary to Hourly Calculator - Convert Salary to Hourly Wage | ToolZoneX",
    ogDescription: "Convert an annual salary into an equivalent hourly wage.",
    schemaName: "Salary to Hourly Calculator",
    schemaDescription: "Convert an annual salary and hours per week into an equivalent hourly wage, weekly, and monthly pay.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Does this account for unpaid overtime salaried employees often work?", answer: "No — this calculation assumes you only work the hours entered. If a salaried role regularly requires more hours than stated, the effective hourly wage is actually lower than shown here." }, { question: "Should freelancers use this to set their rates?", answer: "It's a reasonable starting point, but freelancers typically need to charge more per hour than an equivalent salaried wage to cover self-employment taxes, benefits, non-billable hours, and business expenses that an employer would otherwise cover." }, { question: "How do I go the other direction — hourly to salary?", answer: "Use the Hourly to Salary Calculator to convert an hourly wage into an equivalent annual, monthly, or weekly salary." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
