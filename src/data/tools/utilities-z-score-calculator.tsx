import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/z-score-calculator",
    navName: "Z-Score Calculator",
    navDescription: "Standard score, percentile & interpretation.",
    name: "Z-Score Calculator",
    description: "Calculate the Z-score of a value relative to its mean and standard deviation, with approximate percentile and interpretation.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AutoGraphIcon fontSize="large" color="primary"/>,
    seoTitle: "Z-Score Calculator - Standard Score & Percentile",
    seoDescription: "Free Z-score calculator to compute how many standard deviations a value is from the mean, with approximate percentile and interpretation using the normal distribution.",
    keywords: ["z score calculator", "z-score calculator", "standard score calculator", "z score percentile", "z table calculator", "normal distribution calculator", "how to calculate z score"],
    ogTitle: "Z-Score Calculator - Standard Score & Percentile | ToolZoneX",
    ogDescription: "Calculate the Z-score of a value with approximate percentile and interpretation.",
    schemaName: "Z-Score Calculator",
    schemaDescription: "Calculate a value's Z-score, percentile, and interpretation relative to a mean and standard deviation.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does a z-score of 0 mean?", answer: "A z-score of 0 means the value is exactly equal to the mean — it sits right in the center of the distribution, at the 50th percentile." }, { question: "Can z-scores be negative?", answer: "Yes — a negative z-score simply means the value is below the mean. A z-score of −2 means the value is two standard deviations below the mean." }, { question: "Is the percentile exact?", answer: "The percentile shown is an approximation based on the standard normal distribution (using the error function). For very large or very small z-scores, the result approaches 0% or 100% but never exactly reaches them." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
