import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/wisconsin-paycheck-calculator",
    navName: "Wisconsin Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Wisconsin.",
    name: "Wisconsin Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Wisconsin.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Wisconsin Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Wisconsin paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Wisconsin state tax, Social Security, and Medicare.",
    keywords: ["wisconsin paycheck calculator", "wisconsin salary calculator", "wisconsin take home pay", "wisconsin tax calculator", "net pay calculator wisconsin"],
    ogTitle: "Wisconsin Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Wisconsin paycheck calculator with 2025 federal tax brackets and Wisconsin state tax.",
    schemaName: "Wisconsin Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Wisconsin after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
