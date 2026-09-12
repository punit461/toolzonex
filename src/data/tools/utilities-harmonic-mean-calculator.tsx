import FunctionsIcon from '@mui/icons-material/Functions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/harmonic-mean-calculator",
    navName: "Harmonic Mean Calculator",
    navDescription: "Calculate the harmonic mean of a list.",
    name: "Harmonic Mean Calculator",
    description: "Calculate the harmonic mean of a set of numbers — the right average for rates like speed over equal distances.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FunctionsIcon fontSize="large" color="primary"/>,
    seoTitle: "Harmonic Mean Calculator - Calculate Harmonic Average",
    seoDescription: "Free harmonic mean calculator. Enter a list of positive numbers to calculate their harmonic mean, with a comparison to the arithmetic mean.",
    keywords: ["harmonic mean calculator", "harmonic average calculator", "calculate harmonic mean", "harmonic mean formula calculator", "average speed harmonic mean"],
    ogTitle: "Harmonic Mean Calculator - Calculate Harmonic Average | ToolZoneX",
    ogDescription: "Calculate the harmonic mean of a list of numbers.",
    schemaName: "Harmonic Mean Calculator",
    schemaDescription: "Calculate the harmonic mean of a set of positive numbers.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "When should I use harmonic mean instead of arithmetic mean?", answer: "Use harmonic mean when averaging rates defined as a ratio (like distance per time) over equal amounts of the denominator — such as speed over equal distances, not equal times. If you traveled for equal durations instead, the arithmetic mean would be the correct average." }, { question: "Why is the harmonic mean always the smallest of the three Pythagorean means?", answer: "For any set of positive numbers, harmonic mean ≤ geometric mean ≤ arithmetic mean, with equality only when all the numbers are identical. The harmonic mean is pulled down more strongly by small values since it works with reciprocals." }, { question: "Why must all the numbers be positive?", answer: "The harmonic mean relies on taking the reciprocal of each value. A zero value would make its reciprocal undefined (division by zero), and negative values can produce misleading or undefined results, so this calculator requires strictly positive inputs." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
