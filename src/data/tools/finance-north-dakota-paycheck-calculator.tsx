import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/north-dakota-paycheck-calculator",
    navName: "North Dakota Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in North Dakota.",
    name: "North Dakota Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in North Dakota.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "North Dakota Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free North Dakota paycheck calculator with 2025 state tax brackets. See net pay after federal tax, North Dakota state tax, Social Security, and Medicare.",
    keywords: ["north dakota paycheck calculator", "north dakota salary calculator", "north dakota take home pay", "north dakota tax calculator", "net pay calculator north dakota"],
    ogTitle: "North Dakota Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free North Dakota paycheck calculator with 2025 federal tax brackets and North Dakota state tax.",
    schemaName: "North Dakota Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in North Dakota after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
