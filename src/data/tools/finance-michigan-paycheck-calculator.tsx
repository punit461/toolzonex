import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/michigan-paycheck-calculator",
    navName: "Michigan Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in Michigan.",
    name: "Michigan Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in Michigan.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Michigan Paycheck Calculator - Take-Home Pay",
    seoDescription: "Free Michigan paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    keywords: ["michigan paycheck calculator", "michigan salary calculator", "michigan take home pay", "michigan tax calculator", "net pay calculator michigan", "michigan payroll tax calculator", "michigan paycheck tax calculator", "paycheck calculator michigan"],
    ogTitle: "Michigan Paycheck Calculator - Take-Home Pay | ToolZoneX",
    ogDescription: "Free Michigan paycheck calculator. See net pay after federal tax, state tax, Social Security, and Medicare.",
    schemaName: "Michigan Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in Michigan after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is the Michigan payroll tax rate?", answer: "Michigan charges a flat 4.25% state income tax on wages after the personal exemption. This Michigan payroll tax calculator applies that rate along with federal tax, Social Security, and Medicare — it doesn't include local city income tax, such as Detroit's additional withholding." }, { question: "How much tax is taken out of a paycheck in Michigan?", answer: "For most Michigan employees, paycheck withholding covers federal income tax (based on IRS brackets), 6.2% Social Security, 1.45% Medicare, and Michigan's flat 4.25% state tax — together typically 20-30% of gross pay depending on income and filing status." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
