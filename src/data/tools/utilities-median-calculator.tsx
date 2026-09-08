import SortIcon from '@mui/icons-material/Sort';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/median-calculator",
    navName: "Median Calculator",
    navDescription: "Middle value from a list of numbers.",
    name: "Median Calculator",
    description: "Calculate the median (middle value) of a pasted or typed list of numbers, with the sorted list shown.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SortIcon fontSize="large" color="primary"/>,
    seoTitle: "Median Calculator - Find the Middle Value of a List",
    seoDescription: "Free median calculator to find the middle value of any list of numbers, handling both odd and even counts, with the sorted list shown.",
    keywords: ["median calculator", "find median of numbers", "median of a list calculator", "median vs mean", "statistics median calculator"],
    ogTitle: "Median Calculator - Find the Middle Value of a List | ToolZoneX",
    ogDescription: "Find the median (middle value) of any list of numbers.",
    schemaName: "Median Calculator",
    schemaDescription: "Calculate the median of a list of numbers, with the sorted list shown.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why use median instead of average?", answer: "Median is less sensitive to extreme outliers than average (mean). For example, in a list of salaries where one person earns far more than everyone else, the average gets pulled upward, while the median stays representative of what a \"typical\" person earns." }, { question: "How is the median calculated for an even number of values?", answer: "When there's an even count of numbers, there is no single middle value, so the median is the average of the two values closest to the middle of the sorted list." }, { question: "Does the order I type the numbers in matter?", answer: "No — the calculator automatically sorts your numbers before finding the median, so you can enter them in any order and get the same result. The sorted list is shown below the result for reference." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
