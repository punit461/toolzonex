import FunctionsIcon from '@mui/icons-material/Functions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/weighted-average-calculator",
    navName: "Weighted Average Calculator",
    navDescription: "Calculate an average where values carry different weights.",
    name: "Weighted Average Calculator",
    description: "Calculate a weighted average from a list of value and weight pairs.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FunctionsIcon fontSize="large" color="primary"/>,
    seoTitle: "Weighted Average Calculator - Value & Weight Pairs",
    seoDescription: "Free weighted average calculator. Add value/weight pairs to calculate the weighted average using Σ(value×weight) ÷ Σweight.",
    keywords: ["weighted average calculator", "weighted mean calculator", "average with weights calculator", "how to calculate weighted average", "weighted average formula calculator"],
    ogTitle: "Weighted Average Calculator | ToolZoneX",
    ogDescription: "Calculate a weighted average from value and weight pairs.",
    schemaName: "Weighted Average Calculator",
    schemaDescription: "Calculate a weighted average from a list of value and weight pairs.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What's the difference between a weighted average and a simple average?", answer: "A simple average treats every value equally, dividing the sum of values by the count of values. A weighted average instead gives each value an explicit importance (its weight), so values with larger weights pull the result toward themselves more strongly." }, { question: "Do the weights need to add up to 100 or 1?", answer: "No — the formula divides by the total weight you enter, so it works correctly whether your weights are percentages, counts, dollar amounts, or any other consistent unit, regardless of what they sum to." }, { question: "What happens if a weight is zero?", answer: "A row with a weight of zero is effectively excluded from the result, since it contributes nothing to either the weighted sum or the total weight. Negative weights aren't meaningful for a typical weighted average and should be avoided." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
