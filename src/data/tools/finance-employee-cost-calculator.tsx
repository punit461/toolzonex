import BadgeIcon from '@mui/icons-material/Badge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/employee-cost-calculator",
    navName: "Employee Cost Calculator",
    navDescription: "Calculate fully-loaded employee cost.",
    name: "Employee Cost Calculator",
    description: "Calculate the total fully-loaded cost of an employee, including payroll tax, benefits, and overhead on top of base salary.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <BadgeIcon fontSize="large" color="primary"/>,
    seoTitle: "Employee Cost Calculator - True Cost of Hiring",
    seoDescription: "Free employee cost calculator. Enter base salary, payroll tax, benefits, and overhead percentages to calculate the total fully-loaded cost of an employee.",
    keywords: ["employee cost calculator", "true cost of an employee", "fully loaded cost calculator", "cost of hiring calculator", "employee cost of labor"],
    ogTitle: "Employee Cost Calculator - True Cost of Hiring | ToolZoneX",
    ogDescription: "Calculate the total fully-loaded cost of an employee beyond just their salary.",
    schemaName: "Employee Cost Calculator",
    schemaDescription: "Calculate the total fully-loaded cost of an employee, including payroll tax, benefits, and overhead on top of base salary.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Why is an employee's real cost higher than their salary?", answer: "Employers pay mandatory payroll taxes on top of salary, often contribute to benefits like health insurance and retirement plans, and provide equipment, software, and workspace — all real costs that don't appear on the employee's paycheck but do appear on the company's books." }, { question: "What's a typical total load multiplier?", answer: "Many businesses estimate total employment cost at roughly 1.25x to 1.4x base salary, though this varies significantly by country, industry, benefits generosity, and company size — adjust the percentage fields above to match your specific situation." }, { question: "Does this include one-time costs like recruiting or onboarding?", answer: "No — this calculates ongoing annual costs (payroll tax, benefits, overhead) as a percentage of salary. One-time costs like recruiting fees, signing bonuses, or onboarding time aren't included and would need to be added separately." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
