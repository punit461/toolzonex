import PaymentsIcon from '@mui/icons-material/Payments';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/bonus-calculator",
    navName: "Bonus Calculator",
    navDescription: "Estimate your net performance bonus after tax.",
    name: "Bonus Calculator",
    description: "Calculate your gross and net performance bonus from your CTC, bonus percentage, and rating multiplier.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PaymentsIcon fontSize="large" color="primary"/>,
    seoTitle: "Bonus Calculator - Estimate Net Performance Bonus",
    seoDescription: "Free bonus calculator to estimate your gross and net performance bonus from CTC, bonus percentage, and performance multiplier, after a flat 10% tax.",
    keywords: ["bonus calculator", "performance bonus calculator", "net bonus calculator", "annual bonus calculator", "bonus tax calculator", "ctc bonus calculator"],
    ogTitle: "Bonus Calculator - Estimate Net Performance Bonus | ToolZoneX",
    ogDescription: "Estimate your gross and net performance bonus from CTC, bonus percentage, and performance multiplier.",
    schemaName: "Bonus Calculator",
    schemaDescription: "Calculate gross and net performance bonus from CTC, bonus percentage, and performance multiplier.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Why is tax shown as flat 10%?", answer: "This tool applies a flat 10% to keep the estimate simple. Actual bonus taxation depends on your total income slab and applicable cess, so consult a tax professional for exact figures." }, { question: "What does the performance multiplier do?", answer: "Employers often scale a base bonus by a rating (e.g. 1.2 for \"exceeds expectations\"). A multiplier of 1.0 means the full stated bonus percentage applies." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
