import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/pennsylvania-paycheck-calculator",
    navName: "Pennsylvania Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Pennsylvania.",
    name: "Pennsylvania Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Pennsylvania.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Pennsylvania Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Pennsylvania paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    keywords: ["pennsylvania paycheck calculator", "pennsylvania salary calculator", "pennsylvania take home pay", "pennsylvania tax calculator", "net pay calculator pennsylvania"],
    ogTitle: "Pennsylvania Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Pennsylvania paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    schemaName: "Pennsylvania Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Pennsylvania after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
