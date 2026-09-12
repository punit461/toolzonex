import QueryStatsIcon from '@mui/icons-material/QueryStats';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/variance-calculator",
    navName: "Variance Calculator",
    navDescription: "Population & sample variance with stddev.",
    name: "Variance Calculator",
    description: "Calculate population and sample variance, mean, and standard deviation from a list of numbers.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <QueryStatsIcon fontSize="large" color="primary"/>,
    seoTitle: "Variance Calculator - Population & Sample Variance",
    seoDescription: "Free variance calculator for population (σ²) and sample variance (s²), mean, and standard deviation from a list of comma-separated numbers.",
    keywords: ["variance calculator", "sample variance", "population variance", "variance of numbers", "statistics variance calculator", "variance and mean"],
    ogTitle: "Variance Calculator - Population & Sample Variance | ToolZoneX",
    ogDescription: "Calculate population and sample variance, mean, and standard deviation from a list of numbers.",
    schemaName: "Variance Calculator",
    schemaDescription: "Calculate population and sample variance, mean, and standard deviation from a list of numbers.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the difference between variance and standard deviation?", answer: "Variance is the average of squared deviations from the mean, while standard deviation is the square root of variance. Standard deviation is in the same units as the original data, making it more intuitive to interpret. Both measure spread, but standard deviation is more commonly reported." }, { question: "Why are there two formulas for variance?", answer: "Population variance divides by n, suitable when you have data for every member of the group. Sample variance divides by n−1 (Bessel's correction) to produce an unbiased estimate when working with a subset of the population." }, { question: "Can variance be negative?", answer: "No — variance is always zero or positive, since it is based on squared differences. A variance of zero means all values are identical." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
