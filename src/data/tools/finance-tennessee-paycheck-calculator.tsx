import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/tennessee-paycheck-calculator",
    navName: "Tennessee Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Tennessee.",
    name: "Tennessee Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Tennessee.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Tennessee Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Tennessee paycheck calculator. Tennessee has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    keywords: ["tennessee paycheck calculator", "tennessee salary calculator", "tennessee take home pay", "tennessee tax calculator", "net pay calculator tennessee"],
    ogTitle: "Tennessee Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Tennessee paycheck calculator. Tennessee has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    schemaName: "Tennessee Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Tennessee after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
