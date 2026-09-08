import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/vermont-paycheck-calculator",
    navName: "Vermont Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Vermont.",
    name: "Vermont Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Vermont.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Vermont Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Vermont paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Vermont state tax, Social Security, and Medicare.",
    keywords: ["vermont paycheck calculator", "vermont salary calculator", "vermont take home pay", "vermont tax calculator", "net pay calculator vermont"],
    ogTitle: "Vermont Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Vermont paycheck calculator with 2025 federal tax brackets and Vermont state tax.",
    schemaName: "Vermont Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Vermont after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
