import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/arizona-paycheck-calculator",
    navName: "Arizona Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Arizona.",
    name: "Arizona Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Arizona.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Arizona Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Arizona paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    keywords: ["arizona paycheck calculator", "arizona salary calculator", "arizona take home pay", "arizona tax calculator", "net pay calculator arizona"],
    ogTitle: "Arizona Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Arizona paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    schemaName: "Arizona Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Arizona after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
