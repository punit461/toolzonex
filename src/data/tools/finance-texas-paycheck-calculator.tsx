import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/texas-paycheck-calculator",
    navName: "Texas Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Texas.",
    name: "Texas Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Texas.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Texas Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Texas paycheck calculator. Texas has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    keywords: ["texas paycheck calculator", "paycheck calculator texas", "texas salary calculator", "texas take home pay", "texas tax calculator", "net pay calculator texas", "paycheck estimator texas"],
    ogTitle: "Texas Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Texas paycheck calculator with 2025 federal tax brackets — Texas has no state income tax.",
    schemaName: "Texas Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Texas after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Does Texas have state income tax?", answer: "No. Texas does not levy a state income tax, so your paycheck is only reduced by federal income tax, Social Security (6.2%), and Medicare (1.45%)." }, { question: "How do I estimate my Texas paycheck?", answer: "Enter your gross annual salary and filing status above — this Texas paycheck estimator applies 2025 federal tax brackets plus Social Security and Medicare, then shows your net take-home pay by pay period." }, { question: "How much are my paycheck taxes in Texas?", answer: "Because Texas has no state income tax, your paycheck taxes are federal income tax plus FICA (6.2% Social Security and 1.45% Medicare) — nothing is withheld for state income tax." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
