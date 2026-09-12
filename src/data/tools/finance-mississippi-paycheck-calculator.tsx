import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/mississippi-paycheck-calculator",
    navName: "Mississippi Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Mississippi.",
    name: "Mississippi Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Mississippi.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Mississippi Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Mississippi paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    keywords: ["mississippi paycheck calculator", "mississippi salary calculator", "mississippi take home pay", "mississippi tax calculator", "net pay calculator mississippi", "mississippi payroll calculator"],
    ogTitle: "Mississippi Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Mississippi paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    schemaName: "Mississippi Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Mississippi after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is the Mississippi state tax rate on a paycheck?", answer: "Mississippi doesn't tax the first $10,000 of taxable income, then applies a flat 4.7% rate above that. This Mississippi payroll calculator factors in that bracket along with federal tax, Social Security, and Medicare." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
