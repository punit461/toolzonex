import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/salary-increment-calculator",
    navName: "Salary Increment",
    navDescription: "Calculate salary hike percentage.",
    name: "Salary Increment Calculator",
    description: "Calculate your new CTC and monthly gross salary after an appraisal or job switch, the arrears for a late increment, and a year-by-year salary projection.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "Salary Increment Calculator - New CTC, Arrears & Projection",
    seoDescription: "Free salary increment calculator: find your new CTC and monthly salary after a hike, the arrears for a late increment, and your salary year by year.",
    keywords: ["salary increment calculator", "CTC calculator", "take home salary", "salary hike", "salary arrears calculator", "increment arrears calculation", "salary projection calculator", "annual increment calculator", "ctc increment calculator", "ctc percentage calculator", "increment calculator"],
    ogTitle: "Salary Increment Calculator - New CTC, Arrears & Projection | ToolZoneX",
    ogDescription: "Calculate your new CTC after an increment, arrears for a late hike, and a year-by-year salary projection.",
    schemaName: "Salary Increment Calculator",
    schemaDescription: "Calculate new CTC and monthly salary after an increment, salary arrears, and a multi-year salary projection.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "How do I calculate my CTC increment?", answer: "Enter your current CTC and the increment percentage offered — this CTC increment calculator multiplies your current CTC by the increment percentage to get the increment amount, then adds it back to give your new CTC and its monthly equivalent." }, { question: "How is increment percentage on CTC calculated?", answer: "Increment percentage = (New CTC − Current CTC) ÷ Current CTC × 100. If you know both your old and new CTC and want to find the percentage rather than the new amount, subtract the two, divide by the old CTC, and multiply by 100." }, { question: "How do I calculate CTC after an increment with arrears?", answer: "Work out the new CTC first (Current CTC × (1 + Increment % / 100)), then multiply the monthly increase by the number of months the increment was pending. For a CTC of ₹14,67,800 with a 10% increment paid six months late, the new CTC is ₹16,14,580, the monthly increase is ₹12,232 and the arrears are ₹73,390." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
    bingIndexable: true,
};

export default tool;
