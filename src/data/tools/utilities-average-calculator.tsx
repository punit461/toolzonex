import DatasetIcon from '@mui/icons-material/Dataset';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/average-calculator",
    navName: "Average Calculator",
    navDescription: "Mean, sum & count from a list of numbers.",
    name: "Average Calculator",
    description: "Calculate the average (mean), sum, and count of a pasted or typed list of numbers.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DatasetIcon fontSize="large" color="primary"/>,
    seoTitle: "Average Calculator - Mean of a List of Numbers",
    seoDescription: "Free average calculator to find the mean, sum, and count of any list of numbers — paste values separated by commas, spaces, or line breaks.",
    keywords: ["average calculator", "mean calculator", "calculate average of numbers", "average of a list of numbers", "sum and average calculator"],
    ogTitle: "Average Calculator - Mean of a List of Numbers | ToolZoneX",
    ogDescription: "Find the mean, sum, and count of any list of numbers.",
    schemaName: "Average Calculator",
    schemaDescription: "Calculate the average, sum, and count of a list of numbers.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What formats of numbers can I paste in?", answer: "Numbers separated by commas, spaces, or line breaks all work — you can paste a column copied straight from a spreadsheet, or type values separated by commas. Any text that isn't a valid number is automatically ignored." }, { question: "How is average different from median?", answer: "Average (mean) is the sum of all values divided by the count, so a few very large or very small values can pull it up or down significantly. Median is the middle value when the numbers are sorted, and is less affected by extreme outliers — use the Median Calculator if you need that instead." }, { question: "Does the order of the numbers matter?", answer: "No — the average only depends on the sum and count of the values, so entering them in any order gives exactly the same result." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
