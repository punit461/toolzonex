import AssessmentIcon from '@mui/icons-material/Assessment';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/percentile-calculator",
    navName: "Percentile Calculator",
    navDescription: "Calculate percentile rank from a set of scores.",
    name: "Percentile Calculator",
    description: "Calculate the percentile rank of a target value from a set of comma-separated scores.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AssessmentIcon fontSize="large" color="primary"/>,
    seoTitle: "Percentile Calculator - Calculate Percentile Rank Online",
    seoDescription: "Free percentile calculator to find the percentile rank of a value in a dataset. Shows count of values below, above, and equal to target.",
    keywords: ["percentile calculator", "percentile rank", "calculate percentile", "percentile formula", "percentile rank calculator", "score percentile"],
    ogTitle: "Percentile Calculator - Calculate Percentile Rank Online | ToolZoneX",
    ogDescription: "Calculate the percentile rank of a target value from a set of scores instantly.",
    schemaName: "Percentile Calculator",
    schemaDescription: "Calculate the percentile rank of a value from a set of scores.",
    applicationCategory: "CalculatorApplication",
    currency: undefined,
    faqs: [{ question: "What does 65th percentile mean?", answer: "A 65th-percentile score is higher than approximately 65% of the values in the dataset." }, { question: "What formula is used?", answer: "This calculator uses the standard formula: (below + 0.5 × equal) / total × 100." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
