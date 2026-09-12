import HomeIcon from '@mui/icons-material/Home';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/down-payment-calculator",
    navName: "Down Payment Calculator",
    navDescription: "Down payment and remaining loan amount.",
    name: "Down Payment Calculator",
    description: "Calculate your down payment amount and remaining loan amount from a purchase price and down payment percentage or fixed amount.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeIcon fontSize="large" color="primary"/>,
    seoTitle: "Down Payment Calculator - Home & Loan Down Payment",
    seoDescription: "Free down payment calculator. Enter purchase price and down payment percentage or amount to see your down payment and remaining loan amount.",
    keywords: ["down payment calculator", "home down payment calculator", "mortgage down payment", "down payment percentage calculator", "remaining loan amount"],
    ogTitle: "Down Payment Calculator - Home & Loan Down Payment | ToolZoneX",
    ogDescription: "Calculate your down payment and remaining loan amount for a home or major purchase.",
    schemaName: "Down Payment Calculator",
    schemaDescription: "Calculate down payment amount and remaining loan amount from a purchase price and down payment percentage or amount.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why is 20% often mentioned for down payments?", answer: "On conventional US mortgages, putting down at least 20% typically avoids private mortgage insurance (PMI), an added monthly cost lenders charge to protect themselves on smaller down payments." }, { question: "Can I buy a home with less than 20% down?", answer: "Yes — many loan programs allow 3-10% down, and some government-backed loans (FHA, VA, USDA) allow even less. You'll usually pay mortgage insurance until you build enough equity." }, { question: "Does a bigger down payment always make sense?", answer: "Not always. A larger down payment reduces your loan and interest costs, but tying up more cash upfront means less liquidity for emergencies or other investments — weigh both sides before deciding." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
