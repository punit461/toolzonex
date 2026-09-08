import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/california-paycheck-calculator",
    navName: "California Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in California.",
    name: "California Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in California.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "California Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free California paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare, by pay period.",
    keywords: ["california paycheck calculator", "california salary calculator", "california take home pay", "california tax calculator", "net pay calculator california", "california payroll calculator", "ca paycheck calculator"],
    ogTitle: "California Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free California paycheck calculator with 2025 federal and California state tax brackets.",
    schemaName: "California Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in California after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How much California state tax comes out of my paycheck?", answer: "California uses a progressive state income tax with marginal rates from 1% to 12.3% (plus an extra 1% Mental Health Services Tax on taxable income above $1,000,000). This California payroll calculator applies your bracket based on income and filing status, along with federal tax, Social Security, and Medicare." }, { question: "Is this the same as a California payroll calculator?", answer: "Yes — \"paycheck calculator\" and \"payroll calculator\" are used interchangeably here. This tool estimates net pay in California by combining federal tax, Social Security, Medicare, and California state income tax." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
