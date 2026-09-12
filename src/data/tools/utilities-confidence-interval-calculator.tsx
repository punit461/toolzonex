import QueryStatsIcon from '@mui/icons-material/QueryStats';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/confidence-interval-calculator",
    navName: "Confidence Interval Calculator",
    navDescription: "Calculate a confidence interval for a sample mean.",
    name: "Confidence Interval Calculator - Z-Score Method",
    description: "Calculate a confidence interval from sample mean, standard deviation, sample size, and confidence level.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <QueryStatsIcon fontSize="large" color="primary"/>,
    seoTitle: "Confidence Interval Calculator - Z-Score Method",
    seoDescription: "Free confidence interval calculator. Enter sample mean, standard deviation, sample size, and confidence level (90/95/99%) to calculate the interval.",
    keywords: ["confidence interval calculator", "margin of error calculator", "z score confidence interval calculator", "95 confidence interval calculator", "sample mean confidence interval"],
    ogTitle: "Confidence Interval Calculator | ToolZoneX",
    ogDescription: "Calculate a confidence interval for your sample data.",
    schemaName: "Confidence Interval Calculator",
    schemaDescription: "Calculate a confidence interval from sample mean, standard deviation, sample size, and confidence level.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why use a z-score instead of a t-score?", answer: "The z-score approximation is simpler and reasonably accurate for larger sample sizes (typically n ≥ 30). For smaller samples, a t-distribution (which has heavier tails to account for the extra uncertainty of estimating from limited data) is technically more precise — treat this z-score result as a solid approximation rather than an exact figure for small samples." }, { question: "What does \"95% confidence\" actually mean?", answer: "It means that if you repeated the same sampling process many times and built a confidence interval each time, about 95% of those intervals would contain the true population mean. It's not a 95% probability that the true mean falls within this one specific interval you calculated." }, { question: "How does sample size affect the interval?", answer: "Larger sample sizes shrink the standard error (since it's divided by the square root of n), which narrows the confidence interval and gives a more precise estimate of the population mean." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
