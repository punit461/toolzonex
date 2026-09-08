import BarChartIcon from '@mui/icons-material/BarChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/mode-calculator",
    navName: "Mode Calculator",
    navDescription: "Find the most frequent value(s) in a list.",
    name: "Mode Calculator - Find the Most Frequent Value",
    description: "Find the mode (most frequently occurring value) of a list of numbers, including multimodal data sets.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <BarChartIcon fontSize="large" color="primary"/>,
    seoTitle: "Mode Calculator - Find the Most Frequent Value",
    seoDescription: "Free online mode calculator. Enter a list of numbers to find the mode instantly, with support for bimodal and multimodal data sets.",
    keywords: ["mode calculator", "statistics mode calculator", "find the mode", "most frequent number calculator", "bimodal calculator"],
    ogTitle: "Mode Calculator - Find the Most Frequent Value | ToolZoneX",
    ogDescription: "Find the mode of a list of numbers instantly.",
    schemaName: "Mode Calculator",
    schemaDescription: "Find the mode (most frequently occurring value) of a list of numbers.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does it mean if there is no mode?", answer: "If every value in the list appears exactly the same number of times (including exactly once each), there's technically no single most frequent value, so the data set has no unique mode — this calculator will show every value as tied, which effectively means no mode exists." }, { question: "Can a data set have more than one mode?", answer: "Yes — this is called bimodal (two modes) or multimodal (more than two modes). It happens whenever two or more distinct values are tied for the highest frequency in the data set." }, { question: "Does mode work for non-numeric data?", answer: "The concept of mode applies to any category of data, including text or categories, but this calculator is built for numeric lists. For categorical data, the same principle applies: count occurrences and find the category with the highest count." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
