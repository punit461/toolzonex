import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/missouri-paycheck-calculator",
    navName: "Missouri Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Missouri.",
    name: "Missouri Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Missouri.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Missouri Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Missouri paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Missouri state tax, Social Security, and Medicare.",
    keywords: ["missouri paycheck calculator", "missouri salary calculator", "missouri take home pay", "missouri tax calculator", "net pay calculator missouri"],
    ogTitle: "Missouri Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Missouri paycheck calculator with 2025 federal tax brackets and Missouri state tax.",
    schemaName: "Missouri Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Missouri after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
