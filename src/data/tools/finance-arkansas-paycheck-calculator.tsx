import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/arkansas-paycheck-calculator",
    navName: "Arkansas Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Arkansas.",
    name: "Arkansas Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Arkansas.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Arkansas Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Arkansas paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Arkansas state tax, Social Security, and Medicare.",
    keywords: ["arkansas paycheck calculator", "arkansas salary calculator", "arkansas take home pay", "arkansas tax calculator", "net pay calculator arkansas"],
    ogTitle: "Arkansas Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Arkansas paycheck calculator with 2025 federal tax brackets and Arkansas state tax.",
    schemaName: "Arkansas Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Arkansas after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
