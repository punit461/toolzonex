import CreditCardIcon from '@mui/icons-material/CreditCard';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/credit-utilization-calculator",
    navName: "Credit Utilization Calculator",
    navDescription: "Overall credit utilization % across cards.",
    name: "Credit Utilization Calculator",
    description: "Calculate overall credit utilization percentage from total credit card balances and limits across one or more cards, with guidance on healthy ranges.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CreditCardIcon fontSize="large" color="primary"/>,
    seoTitle: "Credit Utilization Calculator - Credit Card Utilization %",
    seoDescription: "Free credit utilization calculator. Enter balances and limits across your credit cards to calculate overall utilization percentage and get guidance.",
    keywords: ["credit utilization calculator", "credit card utilization calculator", "credit utilization ratio", "credit utilization percentage", "how to lower credit utilization"],
    ogTitle: "Credit Utilization Calculator - Credit Card Utilization % | ToolZoneX",
    ogDescription: "Calculate overall credit utilization percentage across your credit cards.",
    schemaName: "Credit Utilization Calculator",
    schemaDescription: "Calculate overall credit utilization percentage from total credit card balances and limits across one or more cards.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What utilization ratio is considered good?", answer: "Keeping overall utilization below 30% is a commonly cited guideline, with under 10% generally considered excellent for credit scoring purposes. Lower utilization signals to lenders that you're not overly reliant on revolving credit." }, { question: "Does utilization matter per card or overall?", answer: "Both. Credit scoring models typically look at overall utilization across all cards as well as utilization on each individual card, so a single maxed-out card can hurt your score even if your overall ratio looks fine." }, { question: "Does paying off a balance immediately lower utilization?", answer: "Utilization is based on the balance reported to credit bureaus, usually your statement balance on the closing date — not necessarily your balance right now. Paying down a balance before the statement closes is the most reliable way to lower reported utilization." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
