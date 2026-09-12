import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/nevada-paycheck-calculator",
    navName: "Nevada Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Nevada.",
    name: "Nevada Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Nevada.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Nevada Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Nevada paycheck calculator. Nevada has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    keywords: ["nevada paycheck calculator", "nevada salary calculator", "nevada take home pay", "nevada tax calculator", "net pay calculator nevada", "paycheck calculator nv", "nevada payroll tax calculator", "nevada payroll calculator", "nv paycheck calculator"],
    ogTitle: "Nevada Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Nevada paycheck calculator. Nevada has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    schemaName: "Nevada Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Nevada after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Does Nevada have state income tax?", answer: "No. Nevada (NV) is one of the states with no state income tax on wages, so this Nevada payroll tax calculator only withholds federal income tax, Social Security, and Medicare — no state tax line reduces your paycheck." }, { question: "Is this the same as a Nevada payroll tax calculator?", answer: "Yes — \"paycheck calculator\" and \"payroll tax calculator\" are used interchangeably here. Enter a Nevada salary to see federal tax, Social Security, and Medicare broken out per pay period, with no state withholding since NV doesn’t tax wage income." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
