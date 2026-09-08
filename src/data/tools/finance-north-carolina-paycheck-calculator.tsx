import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/north-carolina-paycheck-calculator",
    navName: "North Carolina Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in North Carolina.",
    name: "North Carolina Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in North Carolina.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "North Carolina Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free North Carolina paycheck calculator. See net pay after federal tax, North Carolina's flat 4.5% state tax, Social Security, and Medicare.",
    keywords: ["north carolina paycheck calculator", "north carolina salary calculator", "north carolina take home pay", "north carolina tax calculator", "net pay calculator north carolina", "north carolina payroll calculator", "paycheck calculator nc", "bonus tax calculator nc", "paycheckcity nc"],
    ogTitle: "North Carolina Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free North Carolina paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    schemaName: "North Carolina Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in North Carolina after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is North Carolina's state income tax rate?", answer: "North Carolina has a flat state income tax rate of 4.5% (2025) that applies to all taxable income, regardless of filing status or income level." }, { question: "Is there a bonus tax calculator for NC?", answer: "This calculator estimates regular salary withholding rather than the flat supplemental-wage method many employers use for bonuses (typically a 22% flat federal rate plus North Carolina’s 4.5% state rate). To approximate bonus withholding, add the bonus amount to your annual salary and compare the change in take-home pay shown here." }, { question: "How do I use this as a North Carolina payroll calculator?", answer: "Enter your gross annual salary and filing status — the calculator applies 2025 federal tax brackets, Social Security, Medicare, and North Carolina’s flat 4.5% state tax to estimate net pay by pay period, similar to payroll tools like PaycheckCity." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
