import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/kentucky-paycheck-calculator",
    navName: "Kentucky Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Kentucky.",
    name: "Kentucky Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Kentucky.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Kentucky Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Kentucky paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    keywords: ["kentucky paycheck calculator", "kentucky salary calculator", "kentucky take home pay", "kentucky tax calculator", "net pay calculator kentucky", "ky paycheck calculator", "paycheck calculator ky"],
    ogTitle: "Kentucky Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Kentucky paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    schemaName: "Kentucky Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Kentucky after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Is this the same as a KY paycheck calculator?", answer: "Yes — \"KY\" is the postal abbreviation for Kentucky. This Kentucky (KY) paycheck calculator applies Kentucky's flat 4% state income tax along with federal tax, Social Security, and Medicare to estimate take-home pay." }, { question: "What is Kentucky's state income tax rate?", answer: "Kentucky charges a flat 4% state income tax on wages after the state standard deduction, regardless of income level or filing status." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
