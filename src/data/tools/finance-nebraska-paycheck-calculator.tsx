import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/nebraska-paycheck-calculator",
    navName: "Nebraska Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Nebraska.",
    name: "Nebraska Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Nebraska.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Nebraska Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Nebraska paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Nebraska state tax, Social Security, and Medicare.",
    keywords: ["nebraska paycheck calculator", "nebraska salary calculator", "nebraska take home pay", "nebraska tax calculator", "net pay calculator nebraska"],
    ogTitle: "Nebraska Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Nebraska paycheck calculator with 2025 federal tax brackets and Nebraska state tax.",
    schemaName: "Nebraska Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Nebraska after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
