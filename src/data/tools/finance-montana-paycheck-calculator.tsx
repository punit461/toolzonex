import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/montana-paycheck-calculator",
    navName: "Montana Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Montana.",
    name: "Montana Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Montana.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Montana Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Montana paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Montana state tax, Social Security, and Medicare.",
    keywords: ["montana paycheck calculator", "montana salary calculator", "montana take home pay", "montana tax calculator", "net pay calculator montana"],
    ogTitle: "Montana Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Montana paycheck calculator with 2025 federal tax brackets and Montana state tax.",
    schemaName: "Montana Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Montana after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
