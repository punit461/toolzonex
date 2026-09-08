import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/colorado-paycheck-calculator",
    navName: "Colorado Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Colorado.",
    name: "Colorado Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Colorado.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Colorado Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Colorado paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    keywords: ["colorado paycheck calculator", "colorado salary calculator", "colorado take home pay", "colorado tax calculator", "net pay calculator colorado"],
    ogTitle: "Colorado Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Colorado paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    schemaName: "Colorado Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Colorado after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
