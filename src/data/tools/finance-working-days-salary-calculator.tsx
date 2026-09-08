import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/working-days-salary-calculator",
    navName: "Working Days Salary Calculator",
    navDescription: "Pro-rate salary for a partial month.",
    name: "Working Days Salary Calculator",
    description: "Pro-rate a monthly salary based on total working days in the month and actual days worked, for partial months like new hires or unpaid leave.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <EventAvailableIcon fontSize="large" color="primary"/>,
    seoTitle: "Working Days Salary Calculator - Pro-Rated Pay",
    seoDescription: "Free working days salary calculator. Enter monthly salary, total working days, and days worked to calculate pro-rated pay for a partial month.",
    keywords: ["working days salary calculator", "pro rated salary calculator", "partial month salary calculator", "prorated pay calculator", "salary pro rata calculator"],
    ogTitle: "Working Days Salary Calculator - Pro-Rated Pay | ToolZoneX",
    ogDescription: "Pro-rate a monthly salary based on total working days and actual days worked.",
    schemaName: "Working Days Salary Calculator",
    schemaDescription: "Calculate pro-rated salary as monthly salary divided by total working days, multiplied by actual days worked.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What counts as \"total working days\" in a month?", answer: "This is the number of scheduled working days in the month, typically excluding weekends and company holidays — commonly somewhere between 20 and 23 days depending on the month and your company's calendar." }, { question: "Should weekends be included in \"days worked\"?", answer: "No — count only the actual scheduled working days the employee was present or eligible for pay, matching the same day-counting convention used for \"total working days\" in the denominator." }, { question: "Does this calculator account for taxes or deductions?", answer: "No — this calculates gross pro-rated pay only. Taxes, benefits deductions, and other withholdings are applied separately on top of this pro-rated gross figure." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
