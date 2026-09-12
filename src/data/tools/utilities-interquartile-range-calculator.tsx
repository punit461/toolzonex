import QueryStatsIcon from '@mui/icons-material/QueryStats';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/interquartile-range-calculator",
    navName: "Interquartile Range Calculator",
    navDescription: "IQR and outliers from a data set.",
    name: "Interquartile Range Calculator",
    description: "Calculate Q1, Q3, and the interquartile range (IQR) from a data set, and flag outliers using the 1.5×IQR rule.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <QueryStatsIcon fontSize="large" color="primary"/>,
    seoTitle: "Interquartile Range Calculator - IQR & Outliers",
    seoDescription: "Free interquartile range calculator. Enter a data set to calculate Q1, Q3, IQR, and outliers using the 1.5x IQR rule.",
    keywords: ["interquartile range calculator", "iqr calculator", "q1 q3 calculator", "outlier calculator", "statistics range calculator"],
    ogTitle: "Interquartile Range Calculator - IQR & Outliers | ToolZoneX",
    ogDescription: "Calculate Q1, Q3, and IQR from a data set, and flag outliers using the 1.5x IQR rule.",
    schemaName: "Interquartile Range Calculator",
    schemaDescription: "Calculate IQR as Q3 minus Q1 using the median-of-halves method, and flag outliers below Q1 minus 1.5 times IQR or above Q3 plus 1.5 times IQR.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is Q1 and Q3 calculated here?", answer: "This calculator uses the common exclusive method: sort the data, split it into a lower half and upper half around the median (excluding the median itself when the count is odd), then Q1 is the median of the lower half and Q3 is the median of the upper half. Other methods (like linear interpolation) can give slightly different results for the same data." }, { question: "Why 1.5×IQR for flagging outliers?", answer: "It's a widely used statistical convention (originating with box plots) that flags values falling far enough outside the middle 50% of the data to be considered unusual, without being so strict that normal variation gets flagged." }, { question: "What's the minimum data set size this works with?", answer: "You need at least 4 numbers to get a meaningful Q1/Q3 split — with fewer values, quartiles aren't well-defined and the calculator won't produce a result." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
