import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/florida-paycheck-calculator",
    navName: "Florida Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Florida.",
    name: "Florida Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Florida.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Florida Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free Florida paycheck calculator. Florida has no state income tax — see net pay after federal tax, Social Security, and Medicare.",
    keywords: ["florida paycheck calculator", "florida salary calculator", "florida take home pay", "florida tax calculator", "net pay calculator florida", "paycheck calculator florida salary", "florida pay calculator", "pay stub calculator florida", "calculate tax florida", "florida paycheck calc", "florida payroll calculator", "florida weekly paycheck calculator"],
    ogTitle: "Florida Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free Florida paycheck calculator with 2025 federal tax brackets — Florida has no state income tax.",
    schemaName: "Florida Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Florida after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Does Florida have state income tax?", answer: "No. Florida is one of nine U.S. states with no state income tax on wages, so only federal income tax, Social Security, and Medicare are deducted from your paycheck — there is no state withholding line." }, { question: "How much are my paycheck taxes in Florida?", answer: "Your Florida paycheck taxes are federal income tax (based on your income and filing status), Social Security at 6.2%, and Medicare at 1.45%. Because Florida doesn’t tax wages, your effective tax rate is typically lower than in states with a state income tax." }, { question: "How do I use this as a Florida weekly paycheck calculator?", answer: "Enter your gross annual salary and filing status, then set Pay Frequency to Weekly — the calculator converts your annual federal tax, Social Security, and Medicare withholding into an estimated weekly take-home amount." }, { question: "Can I use this as a Florida pay stub calculator?", answer: "Yes — it estimates the same federal, Social Security, and Medicare amounts that would appear on a Florida pay stub, broken down per pay period, so you can sanity-check an employer’s withholding." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
