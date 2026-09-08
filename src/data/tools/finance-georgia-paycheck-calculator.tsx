import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/georgia-paycheck-calculator",
    navName: "Georgia Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Georgia.",
    name: "Georgia Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Georgia.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Georgia Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Georgia paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    keywords: ["georgia paycheck calculator", "georgia salary calculator", "georgia take home pay", "georgia tax calculator", "net pay calculator georgia", "paycheck calculator georgia", "ga paycheck calculator"],
    ogTitle: "Georgia Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Georgia paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    schemaName: "Georgia Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Georgia after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is Georgia's paycheck tax rate?", answer: "Georgia moved to a flat state income tax rate of 5.39% in 2024. This paycheck calculator for Georgia applies that flat rate along with federal tax, Social Security, and Medicare to estimate your take-home pay." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
