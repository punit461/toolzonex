import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/apy-calculator",
    navName: "APY Calculator",
    navDescription: "Calculate annual percentage yield from any nominal rate.",
    name: "APY Calculator",
    description: "Calculate the Annual Percentage Yield (APY) from a nominal interest rate and compounding frequency.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AutoGraphIcon fontSize="large" color="primary"/>,
    seoTitle: "APY Calculator - Annual Percentage Yield Calculator",
    seoDescription: "Free APY calculator to find the annual percentage yield from a nominal interest rate. Compare savings accounts and CDs by APY.",
    keywords: ["apy calculator", "annual percentage yield", "apy formula", "interest rate calculator", "effective annual rate", "apy vs apr"],
    ogTitle: "APY Calculator - Annual Percentage Yield Calculator | ToolZoneX",
    ogDescription: "Calculate the annual percentage yield (APY) from any nominal rate and compounding frequency.",
    schemaName: "APY Calculator",
    schemaDescription: "Calculate the annual percentage yield from a nominal interest rate.",
    applicationCategory: "FinanceApplication",
    currency: undefined,
    faqs: [{ question: "What is the difference between APY and APR?", answer: "APY includes compounding; APR does not. For the same nominal rate, a product that compounds daily will have a higher APY." }, { question: "Is APY the same as effective annual rate (EAR)?", answer: "Yes — APY and EAR are effectively the same metric." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
