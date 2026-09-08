import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/cashback-calculator",
    navName: "Cashback Calculator",
    navDescription: "Cashback earned and effective cost.",
    name: "Cashback Calculator",
    description: "Calculate cashback earned on a purchase and the effective final cost after cashback, from a purchase amount and cashback percentage.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CardGiftcardIcon fontSize="large" color="primary"/>,
    seoTitle: "Cashback Calculator - Cashback Earned & Effective Cost",
    seoDescription: "Free cashback calculator. Enter a purchase amount and cashback percentage to calculate cashback earned and effective final cost.",
    keywords: ["cashback calculator", "cash back calculator", "credit card cashback calculator", "cashback percentage calculator", "effective cost after cashback"],
    ogTitle: "Cashback Calculator - Cashback Earned & Effective Cost | ToolZoneX",
    ogDescription: "Calculate cashback earned and effective cost after cashback on a purchase.",
    schemaName: "Cashback Calculator",
    schemaDescription: "Calculate cashback earned and the effective final cost after cashback from a purchase amount and cashback percentage.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Is cashback the same as a discount?", answer: "Functionally similar, but cashback is usually paid back after the purchase (as a statement credit, deposit, or points balance), while a discount reduces the price at checkout. The net savings can be the same, but the timing differs." }, { question: "Is cashback taxable?", answer: "In most cases, cashback from personal credit card spending is treated as a rebate or discount rather than taxable income. Cashback earned through referral bonuses or business rewards can sometimes be treated differently — check with a tax professional for your specific situation." }, { question: "Do cashback rates ever have limits?", answer: "Yes — many cards cap bonus-category cashback (e.g., 5% up to $1,500 in spending per quarter) or apply the higher rate only to specific categories, reverting to a lower base rate on everything else. Check your card's terms for spending caps." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
