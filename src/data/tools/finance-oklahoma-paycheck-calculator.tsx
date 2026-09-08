import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/oklahoma-paycheck-calculator",
    navName: "Oklahoma Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Oklahoma.",
    name: "Oklahoma Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Oklahoma.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Oklahoma Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Oklahoma paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Oklahoma state tax, Social Security, and Medicare.",
    keywords: ["oklahoma paycheck calculator", "oklahoma salary calculator", "oklahoma take home pay", "oklahoma tax calculator", "net pay calculator oklahoma"],
    ogTitle: "Oklahoma Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Oklahoma paycheck calculator with 2025 federal tax brackets and Oklahoma state tax.",
    schemaName: "Oklahoma Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Oklahoma after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
