import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/maryland-paycheck-calculator",
    navName: "Maryland Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Maryland.",
    name: "Maryland Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Maryland.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Maryland Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Maryland paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Maryland state tax, Social Security, and Medicare.",
    keywords: ["maryland paycheck calculator", "maryland salary calculator", "maryland take home pay", "maryland tax calculator", "net pay calculator maryland"],
    ogTitle: "Maryland Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Maryland paycheck calculator with 2025 federal tax brackets and Maryland state tax.",
    schemaName: "Maryland Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Maryland after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
