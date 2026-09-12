import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/oregon-paycheck-calculator",
    navName: "Oregon Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Oregon.",
    name: "Oregon Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Oregon.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Oregon Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Oregon paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Oregon state tax, Social Security, and Medicare.",
    keywords: ["oregon paycheck calculator", "oregon salary calculator", "oregon take home pay", "oregon tax calculator", "net pay calculator oregon"],
    ogTitle: "Oregon Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Oregon paycheck calculator with 2025 federal tax brackets and Oregon state tax.",
    schemaName: "Oregon Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Oregon after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
