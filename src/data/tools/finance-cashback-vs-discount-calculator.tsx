import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/cashback-vs-discount-calculator",
    navName: "Cashback vs Discount Calculator",
    navDescription: "Compare cashback vs discount effective cost.",
    name: "Cashback vs Discount Calculator",
    description: "Compare a cashback offer against an alternative discount offer to see which one gives the lower effective cost on a purchase.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CompareArrowsIcon fontSize="large" color="primary"/>,
    seoTitle: "Cashback vs Discount Calculator - Which Saves More?",
    seoDescription: "Free cashback vs discount calculator. Compare a cashback percentage against a discount percentage on the same purchase to see which saves more.",
    keywords: ["cashback vs discount calculator", "cashback or discount", "compare cashback and discount", "which saves more cashback or discount", "cashback comparison calculator"],
    ogTitle: "Cashback vs Discount Calculator - Which Saves More? | ToolZoneX",
    ogDescription: "Compare a cashback offer against a discount offer to see which gives the lower effective cost.",
    schemaName: "Cashback vs Discount Calculator",
    schemaDescription: "Compare the effective cost of a cashback offer against a discount offer on the same purchase price.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Cashback Calculator?", answer: "The Cashback Calculator only calculates the cashback earned on a purchase and the resulting effective cost, in isolation. This tool specifically compares a cashback offer AGAINST an alternative discount offer side by side, to help you decide which one actually saves more money on the same purchase." }, { question: "Why might cashback be worth less in practice than this calculator suggests?", answer: "Real-world cashback often comes with delays (paid out weeks or months later, unlike an instant discount), spending caps on bonus categories, minimum redemption thresholds, or exclusions — an instant discount has none of these restrictions. This calculator gives a simplified, ideal-case comparison; weigh these real-world factors before deciding." }, { question: "Which option is generally safer if the percentages are close?", answer: "An instant discount is generally the safer choice when the two effective costs are close, since it reduces your cost immediately and with certainty, while cashback depends on you actually receiving and being able to use the rebate later." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
