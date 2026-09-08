import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/maine-paycheck-calculator",
    navName: "Maine Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Maine.",
    name: "Maine Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Maine.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Maine Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Maine paycheck calculator with 2025 state tax brackets. See net pay after federal tax, Maine state tax, Social Security, and Medicare.",
    keywords: ["maine paycheck calculator", "maine salary calculator", "maine take home pay", "maine tax calculator", "net pay calculator maine"],
    ogTitle: "Maine Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Maine paycheck calculator with 2025 federal tax brackets and Maine state tax.",
    schemaName: "Maine Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Maine after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
