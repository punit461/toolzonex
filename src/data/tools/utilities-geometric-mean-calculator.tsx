import InsightsIcon from '@mui/icons-material/Insights';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/geometric-mean-calculator",
    navName: "Geometric Mean Calculator",
    navDescription: "Calculate the geometric mean of a data set.",
    name: "Geometric Mean Calculator - nth Root of a Product",
    description: "Calculate the geometric mean of a list of positive numbers, with a comparison to the arithmetic mean.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <InsightsIcon fontSize="large" color="primary"/>,
    seoTitle: "Geometric Mean Calculator - nth Root of a Product",
    seoDescription: "Free online geometric mean calculator. Enter a list of positive numbers to calculate the geometric mean instantly, with arithmetic mean comparison.",
    keywords: ["geometric mean calculator", "geometric mean formula", "average growth rate calculator", "geometric mean vs arithmetic mean", "nth root calculator"],
    ogTitle: "Geometric Mean Calculator - nth Root of a Product | ToolZoneX",
    ogDescription: "Calculate the geometric mean of a list of numbers instantly.",
    schemaName: "Geometric Mean Calculator",
    schemaDescription: "Calculate the geometric mean of a list of positive numbers, with an arithmetic mean comparison.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "When should I use geometric mean instead of arithmetic mean?", answer: "Geometric mean is the right choice when averaging values that are multiplied together over time or combined multiplicatively, such as annual growth rates, investment returns, or ratios. Arithmetic mean works best for values that are simply added together, like test scores or measurements from repeated trials." }, { question: "Why does the calculator require all positive numbers?", answer: "The geometric mean involves taking a root of the product of the values. If any value is zero, the entire product becomes zero. If any value is negative, the result can become undefined or complex for certain combinations, so this calculator requires strictly positive inputs." }, { question: "Is geometric mean always smaller than arithmetic mean?", answer: "Yes, for any set of positive numbers that aren't all exactly equal, the geometric mean is always less than or equal to the arithmetic mean — this is a well-known mathematical inequality. They are equal only when every number in the set is identical." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
