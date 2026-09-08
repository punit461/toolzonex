import PaymentsIcon from '@mui/icons-material/Payments';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/overtime-pay-calculator",
    navName: "Overtime Pay Calculator",
    navDescription: "Calculate total pay including overtime.",
    name: "Overtime Pay Calculator",
    description: "Calculate total pay including overtime premium from your regular wage, regular hours, overtime hours, and overtime multiplier.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PaymentsIcon fontSize="large" color="primary"/>,
    seoTitle: "Overtime Pay Calculator - Calculate Total Pay With Overtime",
    seoDescription: "Free overtime pay calculator. Enter your regular hourly wage, regular hours, overtime hours, and multiplier to calculate your total pay including overtime.",
    keywords: ["overtime pay calculator", "overtime calculator", "time and a half calculator", "calculate overtime pay", "overtime wage calculator"],
    ogTitle: "Overtime Pay Calculator - Calculate Total Pay With Overtime | ToolZoneX",
    ogDescription: "Calculate total pay including overtime premium from your wage and hours worked.",
    schemaName: "Overtime Pay Calculator",
    schemaDescription: "Calculate total pay including overtime premium from your regular wage, regular hours, overtime hours, and overtime multiplier.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What is the standard overtime multiplier?", answer: "In the US, federal law generally requires 1.5x pay (\"time-and-a-half\") for hours worked over 40 in a week for non-exempt employees. Some employers, states, or union contracts pay 2x (\"double time\") for certain hours, like holidays — adjust the multiplier field to match your situation." }, { question: "Does this calculator account for taxes?", answer: "No — this calculates gross pay before taxes and other deductions. Your actual take-home pay will be lower after income tax, payroll tax, and any other withholdings are applied." }, { question: "What counts as overtime hours?", answer: "This varies by jurisdiction and employer policy, but it's typically hours worked beyond 40 in a week (or beyond 8 in a day in some places). Check your local labor laws or employment contract for the exact threshold that applies to you." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
