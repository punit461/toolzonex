import ShowChartIcon from '@mui/icons-material/ShowChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/correlation-coefficient-calculator",
    navName: "Correlation Coefficient Calculator",
    navDescription: "Calculate the Pearson correlation coefficient (r).",
    name: "Correlation Coefficient Calculator - Pearson's r",
    description: "Calculate the Pearson correlation coefficient (r) from a list of x/y data point pairs.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ShowChartIcon fontSize="large" color="primary"/>,
    seoTitle: "Correlation Coefficient Calculator - Pearson's r",
    seoDescription: "Free correlation coefficient calculator. Add x/y data pairs to calculate Pearson's r and see the strength and direction of their relationship.",
    keywords: ["correlation coefficient calculator", "pearson correlation calculator", "r value calculator statistics", "correlation calculator online", "calculate correlation between two variables"],
    ogTitle: "Correlation Coefficient Calculator | ToolZoneX",
    ogDescription: "Calculate the Pearson correlation coefficient from your data.",
    schemaName: "Correlation Coefficient Calculator",
    schemaDescription: "Calculate the Pearson correlation coefficient (r) from a list of x/y data point pairs.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does an r value close to 0 versus ±1 mean?", answer: "An r near 0 means little to no linear relationship between the two variables — knowing one tells you almost nothing about the other. An r close to +1 or -1 means the variables track each other closely in a straight-line pattern, either both increasing together (positive) or one increasing as the other decreases (negative)." }, { question: "Does correlation imply causation?", answer: "No — a strong correlation only shows that two variables move together, not that one causes the other. Both could be driven by a third factor, or the relationship could be coincidental, especially with a small dataset." }, { question: "How many data points do I need for a meaningful result?", answer: "Mathematically, the formula works with as few as 2 pairs, but a correlation from just a handful of points can be misleadingly high or low. For a result you can actually rely on, aim for at least 5-10 or more data points, and more for noisy real-world data." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
