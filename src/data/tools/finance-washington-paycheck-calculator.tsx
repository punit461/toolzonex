import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/washington-paycheck-calculator",
    navName: "Washington Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Washington.",
    name: "Washington Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Washington.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Washington Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Washington paycheck calculator. Washington has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    keywords: ["washington paycheck calculator", "washington salary calculator", "washington take home pay", "washington tax calculator", "net pay calculator washington"],
    ogTitle: "Washington Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Washington paycheck calculator with 2025 federal tax brackets — Washington has no state income tax.",
    schemaName: "Washington Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Washington after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
