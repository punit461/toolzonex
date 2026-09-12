import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/connecticut-paycheck-calculator",
    navName: "Connecticut Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Connecticut.",
    name: "Connecticut Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Connecticut.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Connecticut Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Connecticut paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Connecticut state tax, Social Security, and Medicare.",
    keywords: ["connecticut paycheck calculator", "connecticut salary calculator", "connecticut take home pay", "connecticut tax calculator", "net pay calculator connecticut"],
    ogTitle: "Connecticut Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Connecticut paycheck calculator with 2025 federal tax brackets and Connecticut state tax.",
    schemaName: "Connecticut Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Connecticut after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
