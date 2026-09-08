import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/massachusetts-paycheck-calculator",
    navName: "Massachusetts Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Massachusetts.",
    name: "Massachusetts Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Massachusetts.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Massachusetts Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Massachusetts paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    keywords: ["massachusetts paycheck calculator", "massachusetts salary calculator", "massachusetts take home pay", "massachusetts tax calculator", "net pay calculator massachusetts", "mass paycheck calculator", "ma paycheck calculator"],
    ogTitle: "Massachusetts Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Massachusetts paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    schemaName: "Massachusetts Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Massachusetts after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Is this the same as a \"Mass\" paycheck calculator?", answer: "\"Mass\" is a common short form for Massachusetts. This calculator applies Massachusetts’ flat 5% state income tax — plus the additional 4% \"Millionaires Tax\" surtax on taxable income above $1,000,000 — along with federal tax, Social Security, and Medicare." }, { question: "What is the Massachusetts state income tax rate?", answer: "Massachusetts charges a flat 5% state income tax on most income, with an additional 4% surtax (9% total) applied only to taxable income above $1,000,000." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
