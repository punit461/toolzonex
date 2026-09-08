import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/illinois-paycheck-calculator",
    navName: "Illinois Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Illinois.",
    name: "Illinois Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Illinois.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Illinois Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Illinois paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    keywords: ["illinois paycheck calculator", "illinois salary calculator", "illinois take home pay", "illinois tax calculator", "net pay calculator illinois", "illinois payroll calculator", "il paycheck calculator"],
    ogTitle: "Illinois Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Illinois paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    schemaName: "Illinois Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Illinois after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How much is Illinois state tax on a paycheck?", answer: "Illinois charges a flat 4.95% state income tax after the personal exemption. This Illinois paycheck calculator applies that rate together with federal tax, Social Security, and Medicare to estimate your take-home pay." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
