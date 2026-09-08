import PercentIcon from '@mui/icons-material/Percent';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/percentage-calculator",
    navName: "Percentage Calculator",
    navDescription: "Percentages, changes, and X% of Y.",
    name: "Percentage Calculator",
    description: "Easily calculate percentages, percentage changes, and find out what percent one number is of another.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PercentIcon fontSize="large" color="primary"/>,
    seoTitle: "Percentage Calculator - Calculate Percentages Easily",
    seoDescription: "Free percentage calculator to calculate percentages, percentage increase/decrease, and percentage of any number. Perfect for discounts, marks, and calculations.",
    keywords: ["percentage calculator", "calculate percentage", "percentage increase", "percentage decrease", "percentage of number", "discount calculator", "mark percentage", "percentage over target calculator", "percentage above target", "actual vs target percentage"],
    ogTitle: "Percentage Calculator - Calculate Percentages Easily | ToolZoneX",
    ogDescription: "Calculate percentages, percentage increase/decrease, and percentage of any number.",
    schemaName: "Percentage Calculator",
    schemaDescription: "Calculate percentages easily.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How do I calculate percentage over or under a target value?", answer: "Use calculator #2 ('X is what % of Y?') with X as your actual value and Y as your target — the result shows actual as a percentage of target, where anything above 100% means you exceeded the target and below 100% means you fell short. For example, actual sales of 120 against a target of 100 gives 120%, i.e. 20 percentage points over target." }, { question: "What's the difference between percentage change and percentage points?", answer: "Percentage change measures relative change (e.g., 20% higher), while percentage points measure the raw difference between two percentages (e.g., going from 20% to 25% is a 5 percentage point change)." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
