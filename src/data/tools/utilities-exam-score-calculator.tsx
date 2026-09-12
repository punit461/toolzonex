import GradeIcon from '@mui/icons-material/Grade';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/exam-score-calculator",
    navName: "Exam Score Calculator",
    navDescription: "Overall percentage and weighted average across exams.",
    name: "Exam Score Calculator - Overall & Weighted Grade",
    description: "Combine multiple exams or sections into an overall percentage and a weighted average grade.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GradeIcon fontSize="large" color="primary"/>,
    seoTitle: "Exam Score Calculator - Overall & Weighted Grade",
    seoDescription: "Free exam score calculator. Add marks and totals for multiple exams or sections, with optional weights, to get your overall percentage and weighted average.",
    keywords: ["exam score calculator", "weighted grade calculator", "overall percentage calculator", "test score calculator", "weighted average grade calculator"],
    ogTitle: "Exam Score Calculator - Overall & Weighted Grade | ToolZoneX",
    ogDescription: "Calculate your overall exam percentage and weighted average grade.",
    schemaName: "Exam Score Calculator",
    schemaDescription: "Combine multiple exams or sections into an overall percentage and a weighted average grade.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What's the difference between overall percentage and weighted average?", answer: "Overall percentage simply adds up all marks obtained and divides by all marks possible, treating every mark equally. Weighted average instead uses each row's percentage score combined according to its assigned weight — the number that typically matches your syllabus grading scheme." }, { question: "Do the weights need to add up to 100?", answer: "No — the formula divides by the sum of the weights you enter, so it works correctly even if your weights don't total exactly 100 (for example, if you leave out unfinished components)." }, { question: "What if I don't care about weighting?", answer: "Just ignore the weight field or set all weights equal — the \"Overall Percentage\" result already gives you a straightforward, unweighted combined score across every row." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
