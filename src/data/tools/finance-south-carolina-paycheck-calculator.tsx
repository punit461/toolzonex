import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/south-carolina-paycheck-calculator",
    navName: "South Carolina Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in South Carolina.",
    name: "South Carolina Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in South Carolina.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "South Carolina Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free South Carolina paycheck calculator with 2025 state tax brackets. See net pay after federal tax, South Carolina state tax, Social Security, and Medicare.",
    keywords: ["south carolina paycheck calculator", "south carolina salary calculator", "south carolina take home pay", "south carolina tax calculator", "net pay calculator south carolina"],
    ogTitle: "South Carolina Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free South Carolina paycheck calculator with 2025 federal tax brackets and South Carolina state tax.",
    schemaName: "South Carolina Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in South Carolina after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
