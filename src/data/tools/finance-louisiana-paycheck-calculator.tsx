import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/louisiana-paycheck-calculator",
    navName: "Louisiana Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Louisiana.",
    name: "Louisiana Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Louisiana.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Louisiana Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Louisiana paycheck calculator with the 2025 flat 3% state tax rate. See net pay after federal tax, Louisiana state tax, Social Security, and Medicare.",
    keywords: ["louisiana paycheck calculator", "louisiana salary calculator", "louisiana take home pay", "louisiana tax calculator", "net pay calculator louisiana"],
    ogTitle: "Louisiana Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Louisiana paycheck calculator with 2025 federal tax brackets and Louisiana's flat 3% state tax.",
    schemaName: "Louisiana Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Louisiana after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
