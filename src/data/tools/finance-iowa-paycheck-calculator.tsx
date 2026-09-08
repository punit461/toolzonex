import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/iowa-paycheck-calculator",
    navName: "Iowa Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Iowa.",
    name: "Iowa Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Iowa.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Iowa Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Iowa paycheck calculator with the 2025 flat 3.8% state tax rate. See net pay after federal tax, Iowa state tax, Social Security, and Medicare.",
    keywords: ["iowa paycheck calculator", "iowa salary calculator", "iowa take home pay", "iowa tax calculator", "net pay calculator iowa"],
    ogTitle: "Iowa Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Iowa paycheck calculator with 2025 federal tax brackets and Iowa's flat 3.8% state tax.",
    schemaName: "Iowa Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Iowa after federal tax, state tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
