import InsightsIcon from '@mui/icons-material/Insights';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/normal-distribution-calculator",
    navName: "Normal Distribution Calculator",
    navDescription: "Find probability density and cumulative probability.",
    name: "Normal Distribution Calculator - PDF & CDF",
    description: "Calculate the probability density and cumulative probability at a given x-value from a mean and standard deviation.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <InsightsIcon fontSize="large" color="primary"/>,
    seoTitle: "Normal Distribution Calculator - PDF & CDF",
    seoDescription: "Free normal distribution calculator. Enter mean, standard deviation, and an x-value to find the probability density and cumulative probability.",
    keywords: ["normal distribution calculator", "z score calculator", "probability density calculator", "cumulative distribution function calculator", "bell curve calculator"],
    ogTitle: "Normal Distribution Calculator | ToolZoneX",
    ogDescription: "Calculate probability density and cumulative probability for the normal distribution.",
    schemaName: "Normal Distribution Calculator",
    schemaDescription: "Calculate the probability density and cumulative probability at a given x-value from a mean and standard deviation.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What's the difference between the PDF and the CDF?", answer: "The probability density function (PDF) describes the relative likelihood of the distribution at an exact point, while the cumulative distribution function (CDF) gives the total probability of landing at or below that point — the CDF is generally more useful for real-world questions like percentiles." }, { question: "What does a z-score of 0 mean?", answer: "A z-score of 0 means the x-value equals the mean exactly, putting it right at the center of the distribution with a cumulative probability of 50%." }, { question: "Is the CDF calculation exact?", answer: "This uses a well-known numerical approximation (accurate to about 7 decimal places) for the standard normal CDF, since no exact closed-form expression exists using elementary functions. That level of precision is more than sufficient for virtually all practical and academic uses." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
