import PaymentsIcon from '@mui/icons-material/Payments';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/daily-wage-calculator",
    navName: "Daily Wage Calculator",
    navDescription: "Pay for a single day, including overtime.",
    name: "Daily Wage Calculator",
    description: "Calculate your total pay for a single day's work from your hourly rate, regular hours, and any overtime hours at a different multiplier.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PaymentsIcon fontSize="large" color="primary"/>,
    seoTitle: "Daily Wage Calculator - Pay for a Single Day's Work",
    seoDescription: "Free daily wage calculator. Enter your hourly rate, regular hours, and overtime hours to calculate your total pay for a single day.",
    keywords: ["daily wage calculator", "daily pay calculator", "how much will i earn today", "one day pay calculator", "shift pay calculator"],
    ogTitle: "Daily Wage Calculator - Pay for a Single Day's Work | ToolZoneX",
    ogDescription: "Calculate your total pay for a single day's work, including any overtime.",
    schemaName: "Daily Wage Calculator",
    schemaDescription: "Calculate your total pay for a single day's work from your hourly rate, regular hours, and any overtime hours at a different multiplier.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from a full paycheck or overtime calculator?", answer: "This tool is scoped to a single day — just \"what do I earn for today's work?\" For a broader pay-period calculation covering a full week or paycheck with regular and overtime hours, use our Overtime Pay Calculator instead." }, { question: "Does this calculate weekly overtime eligibility?", answer: "No — this tool assumes you already know how many hours today count as overtime. In many places, overtime eligibility is based on total hours in a week (commonly over 40), not hours in a single day, so check your local labor laws or employer policy to determine what counts as overtime for you." }, { question: "Does this include taxes or deductions?", answer: "No — this calculates gross pay before taxes and other deductions. Your actual take-home pay for the day will be lower after withholdings are applied." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
