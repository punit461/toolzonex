import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/new-hampshire-paycheck-calculator",
    navName: "New Hampshire Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in New Hampshire.",
    name: "New Hampshire Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in New Hampshire.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "New Hampshire Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free New Hampshire paycheck calculator. New Hampshire has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    keywords: ["new hampshire paycheck calculator", "new hampshire salary calculator", "new hampshire take home pay", "new hampshire tax calculator", "net pay calculator new hampshire", "new hampshire payroll calculator", "paycheck calculator nh", "nh paycheck calculator"],
    ogTitle: "New Hampshire Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free New Hampshire paycheck calculator. New Hampshire has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    schemaName: "New Hampshire Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in New Hampshire after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Does New Hampshire tax my paycheck?", answer: "No. New Hampshire (NH) does not tax wage income, so this New Hampshire payroll calculator only deducts federal income tax, Social Security, and Medicare — no state withholding applies to your salary." }, { question: "Is this the same as a New Hampshire payroll calculator?", answer: "Yes — this tool works as both a New Hampshire paycheck calculator and payroll calculator. Since NH doesn’t tax wages, your take-home pay only reflects federal tax, Social Security, and Medicare." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
