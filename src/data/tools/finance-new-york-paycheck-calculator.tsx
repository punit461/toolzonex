import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/new-york-paycheck-calculator",
    navName: "New York Paycheck Calculator",
    navDescription: "Take-home pay after federal tax & FICA in New York.",
    name: "New York Paycheck Calculator",
    description: "Take-home pay after federal tax & FICA in New York.",
    navCategory: "Paycheck Calculators",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "New York Paycheck Calculator - Estimate Your Take-Home Pay",
    seoDescription: "Free New York paycheck calculator. See net pay after federal tax, NY state tax, Social Security, and Medicare, by pay period — plus what NYC residents should budget for local tax.",
    keywords: ["new york paycheck calculator", "new york salary calculator", "new york take home pay", "new york tax calculator", "net pay calculator new york", "new york income calculator", "salary calculator nyc after taxes", "nyc tax calculator paycheck", "salary after taxes ny", "ny paycheck tax calculator", "ny state tax calculator", "paycheck calculator new york", "paycheck calculator nyc", "calculate income tax nyc", "paycheck nyc", "new york income tax calculator"],
    ogTitle: "New York Paycheck Calculator - Estimate Your Take-Home Pay | ToolZoneX",
    ogDescription: "Free New York paycheck calculator with 2025 federal and New York state tax brackets — see your NY income after taxes and what NYC local tax adds on top.",
    schemaName: "New York Paycheck Calculator",
    schemaDescription: "Estimate take-home pay in New York after federal tax, Social Security, and Medicare.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Does this include New York City (NYC) local income tax?", answer: "No — this calculator estimates federal and New York State income tax only. NYC and Yonkers residents also owe a local income tax on top of state tax, which isn’t included here, so actual NYC take-home pay will be somewhat lower than the figure shown." }, { question: "How do I calculate my take-home pay in NYC?", answer: "Enter your gross salary and filing status to see federal and New York State tax withholding, Social Security, and Medicare. If you live or work in NYC, remember to budget for NYC’s additional local income tax, which is separate from — and not included in — this estimate." }, { question: "What is my salary after taxes in New York?", answer: "Your New York salary after taxes equals gross pay minus federal income tax, New York State income tax, Social Security, and Medicare. Enter your salary above to see the full breakdown for your filing status and pay frequency." }, { question: "How is New York income tax calculated?", answer: "New York State income tax uses progressive brackets that increase with income, applied after New York’s standard deduction. This is separate from federal income tax and, for NYC or Yonkers residents, separate from local income tax as well." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
