import PaymentsIcon from '@mui/icons-material/Payments';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/payroll-calculator",
    navName: "Payroll Calculator",
    navDescription: "Gross pay with regular & overtime hours.",
    name: "Payroll Calculator",
    description: "Calculate gross pay from an hourly rate, regular hours, and overtime hours (paid at 1.5x) for a weekly, biweekly, or monthly pay period.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PaymentsIcon fontSize="large" color="primary"/>,
    seoTitle: "Payroll Calculator - Gross Pay with Overtime",
    seoDescription: "Free payroll calculator. Enter hourly rate, regular hours, and overtime hours to calculate gross pay for a weekly, biweekly, or monthly period.",
    keywords: ["payroll calculator", "gross pay calculator", "overtime pay calculator", "hourly payroll calculator", "1.5x overtime calculator"],
    ogTitle: "Payroll Calculator - Gross Pay with Overtime | ToolZoneX",
    ogDescription: "Calculate gross pay including regular and overtime hours.",
    schemaName: "Payroll Calculator",
    schemaDescription: "Calculate gross pay from an hourly rate, regular hours, and overtime hours paid at 1.5x.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Is this gross pay or take-home pay?", answer: "This is gross pay — before taxes, insurance, retirement contributions, and other deductions. Actual take-home pay will be lower after those withholdings." }, { question: "Is overtime always 1.5x?", answer: "In the US, federal law (FLSA) generally requires at least 1.5 times the regular rate for hours worked beyond 40 in a week for non-exempt employees. Some states, employers, or countries may use different rules or higher multipliers (like double-time), so check your local regulations." }, { question: "How do I calculate pay from an annual salary instead?", answer: "Use the Salary to Hourly Calculator to convert an annual salary into an equivalent hourly rate first, then use that rate here if you need to add overtime." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
