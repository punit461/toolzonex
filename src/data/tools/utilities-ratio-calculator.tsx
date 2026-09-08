import BalanceIcon from '@mui/icons-material/Balance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/ratio-calculator",
    navName: "Ratio Calculator",
    navDescription: "Simplify a ratio or scale it to a total.",
    name: "Ratio Calculator",
    description: "Simplify a ratio to its smallest whole numbers using GCD, or scale a ratio to split a target total.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <BalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "Ratio Calculator - Simplify or Scale a Ratio",
    seoDescription: "Free ratio calculator to simplify any ratio to its smallest whole-number form, or scale a ratio to split a target total into proportional parts.",
    keywords: ["ratio calculator", "simplify ratio calculator", "ratio to fraction", "scale ratio calculator", "gcd ratio calculator"],
    ogTitle: "Ratio Calculator - Simplify or Scale a Ratio | ToolZoneX",
    ogDescription: "Simplify a ratio to its smallest whole numbers, or scale a ratio to a target total.",
    schemaName: "Ratio Calculator",
    schemaDescription: "Simplify a ratio using GCD, or scale a ratio to split a target total into proportional parts.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does \"simplifying\" a ratio actually do?", answer: "It divides both numbers by their greatest common divisor (GCD) — the largest number that divides evenly into both — leaving the smallest possible whole numbers that still represent the exact same proportion." }, { question: "How does the \"Scale to Total\" mode work?", answer: "It treats your ratio's two numbers as proportional parts of a whole, then divides your target total between them in that same proportion — for example, a 2:3 ratio always splits any total into 40% and 60% shares." }, { question: "Can I use decimal numbers in a ratio?", answer: "The Scale to Total mode works fine with decimals. The Simplify mode is designed for whole numbers since GCD is a whole-number concept — for decimal ratios, first multiply both values by 10, 100, etc. to make them whole numbers before simplifying." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
