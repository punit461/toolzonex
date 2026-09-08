import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/new-jersey-paycheck-calculator",
    navName: "New Jersey Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in New Jersey.",
    name: "New Jersey Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in New Jersey.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "New Jersey Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free New Jersey paycheck calculator with 2025 state tax brackets. See net pay after federal tax, New Jersey state tax, Social Security, and Medicare.",
    keywords: ["new jersey paycheck calculator", "new jersey salary calculator", "new jersey take home pay", "new jersey tax calculator", "net pay calculator new jersey"],
    ogTitle: "New Jersey Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free New Jersey paycheck calculator with 2025 federal tax brackets and New Jersey state tax.",
    schemaName: "New Jersey Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in New Jersey after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
