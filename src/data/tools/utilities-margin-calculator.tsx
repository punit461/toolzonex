import PercentIcon from '@mui/icons-material/Percent';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/margin-calculator",
    navName: "Margin Calculator",
    navDescription: "Calculate profit margin & markup.",
    name: "Margin Calculator",
    description: "Calculate gross profit, profit margin, and markup percentage instantly. Free online margin calculator for businesses.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PercentIcon fontSize="large" color="primary"/>,
    seoTitle: "Margin Calculator - Calculate Profit Margin & Markup Online",
    seoDescription: "Calculate gross profit, profit margin, and markup percentage instantly. Free online margin calculator for businesses.",
    keywords: ["margin calculator", "profit margin calculator", "markup calculator", "gross profit calculator", "margin markup", "margin percentage calculator", "margin vs markup"],
    ogTitle: "Margin Calculator - Calculate Profit Margin & Markup Online | ToolZoneX",
    ogDescription: "Calculate gross profit, profit margin, and markup percentage instantly.",
    schemaName: "Margin Calculator",
    schemaDescription: "Calculate gross profit, profit margin, and markup percentage instantly.",
    applicationCategory: "BusinessApplication",
    currency: "INR",
    faqs: [{ question: "What's the difference between margin and markup?", answer: "Margin is profit as a percentage of the selling price (Revenue), while markup is profit as a percentage of the Cost. For the same sale, markup is always a higher number than margin because it's calculated on the smaller cost figure rather than the larger revenue figure — this calculator shows both side by side so you never confuse the two." }, { question: "How do I calculate margin percentage?", answer: "Margin percentage = (Revenue − Cost) ÷ Revenue × 100. Enter your Cost and Revenue above and the Gross Margin field updates automatically — or enter Cost and a target margin to see what Revenue you need to charge." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
