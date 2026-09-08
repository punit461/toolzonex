import PercentIcon from '@mui/icons-material/Percent';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/effective-interest-rate-calculator",
    navName: "Effective Interest Rate Calculator",
    navDescription: "Nominal rate to effective annual rate.",
    name: "Effective Interest Rate Calculator",
    description: "Calculate the effective annual rate (EAR) from a nominal interest rate and compounding frequency (monthly, quarterly, daily, and more).",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PercentIcon fontSize="large" color="primary"/>,
    seoTitle: "Effective Interest Rate Calculator - Nominal to EAR",
    seoDescription: "Free effective interest rate calculator. Enter a nominal annual rate and compounding frequency to calculate the effective annual rate (EAR).",
    keywords: ["effective interest rate calculator", "effective annual rate calculator", "ear calculator", "nominal vs effective rate", "compounding frequency calculator"],
    ogTitle: "Effective Interest Rate Calculator - Nominal to EAR | ToolZoneX",
    ogDescription: "Calculate the effective annual rate from a nominal rate and compounding frequency.",
    schemaName: "Effective Interest Rate Calculator",
    schemaDescription: "Calculate the effective annual rate (EAR) from a nominal interest rate and compounding frequency.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why is EAR always higher than the nominal rate?", answer: "Because compounding means interest is calculated on previously earned interest as well as the principal. The more frequently that happens within a year, the more the effective rate exceeds the stated nominal rate." }, { question: "Does compounding frequency matter a lot?", answer: "The difference shrinks as compounding gets more frequent — going from monthly to daily compounding makes a much smaller difference than going from annual to monthly. Beyond daily compounding, the rate approaches (but never quite reaches) continuous compounding." }, { question: "Should I compare loans using nominal or effective rate?", answer: "Always compare effective annual rates when evaluating loans or investments with different compounding frequencies — it's the only way to see the true apples-to-apples annual cost or return." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
