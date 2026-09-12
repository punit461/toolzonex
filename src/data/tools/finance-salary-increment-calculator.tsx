import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/salary-increment-calculator",
    navName: "Salary Increment",
    navDescription: "Calculate salary hike percentage.",
    name: "Salary Increment Calculator",
    description: "Calculate your new CTC and monthly gross salary after an appraisal or job switch.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "Salary Increment Calculator - CTC & Take-Home Salary",
    seoDescription: "Free salary increment calculator to calculate your new CTC and monthly take-home salary after an increment. Understand how raises affect your income.",
    keywords: ["salary increment calculator", "CTC calculator", "take home salary", "salary hike", "income tax after increment", "in-hand salary calculator", "ctc increment calculator", "ctc percentage calculator", "increment calculator"],
    ogTitle: "Salary Increment Calculator - CTC & Take-Home Salary | ToolZoneX",
    ogDescription: "Calculate your new salary after increment and take-home amount.",
    schemaName: "Salary Increment Calculator",
    schemaDescription: "Calculate new CTC and monthly take-home after increment.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "How do I calculate my CTC increment?", answer: "Enter your current CTC and the increment percentage offered — this CTC increment calculator multiplies your current CTC by the increment percentage to get the increment amount, then adds it back to give your new CTC and its monthly equivalent." }, { question: "How is increment percentage on CTC calculated?", answer: "Increment percentage = (New CTC − Current CTC) ÷ Current CTC × 100. If you know both your old and new CTC and want to find the percentage rather than the new amount, subtract the two, divide by the old CTC, and multiply by 100." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
