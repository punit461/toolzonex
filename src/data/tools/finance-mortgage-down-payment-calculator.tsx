import HomeIcon from '@mui/icons-material/Home';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/mortgage-down-payment-calculator",
    navName: "Mortgage Down Payment Calculator",
    navDescription: "Down payment amount & PMI threshold check.",
    name: "Mortgage Down Payment Calculator",
    description: "Calculate the down payment amount and resulting mortgage loan amount from a home price and down payment percentage, with a PMI-avoidance check.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeIcon fontSize="large" color="primary"/>,
    seoTitle: "Mortgage Down Payment Calculator - Home Down Payment & PMI",
    seoDescription: "Free mortgage down payment calculator. Enter home price and down payment percentage to see down payment amount, loan amount, and PMI status.",
    keywords: ["mortgage down payment calculator", "home down payment calculator", "down payment pmi calculator", "mortgage loan amount calculator", "20 percent down payment"],
    ogTitle: "Mortgage Down Payment Calculator - Home Down Payment & PMI | ToolZoneX",
    ogDescription: "Calculate mortgage down payment amount, loan amount, and PMI-avoidance status.",
    schemaName: "Mortgage Down Payment Calculator",
    schemaDescription: "Calculate the down payment amount and resulting mortgage loan amount from a home price and down payment percentage.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why does 20% down avoid PMI?", answer: "On conventional US mortgages, lenders generally require private mortgage insurance when the down payment is below 20%, since a smaller down payment means more risk of loss if the borrower defaults. Once you reach 20% equity, PMI is typically not required (or can later be removed)." }, { question: "Can I still get a mortgage with less than 20% down?", answer: "Yes — many conventional loans allow down payments as low as 3-5%, and government-backed programs like FHA, VA, and USDA loans can require even less. You'll typically pay mortgage insurance until you build enough equity or refinance." }, { question: "Does a bigger down payment always make financial sense?", answer: "Not necessarily. A larger down payment lowers your loan balance, monthly payment, and avoids PMI, but it also ties up more cash that could otherwise be used for emergencies, renovations, or other investments — weigh liquidity needs alongside the PMI savings." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
