import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/sgpa-calculator",
    navName: "SGPA Calculator",
    navDescription: "Weighted SGPA for a single semester.",
    name: "SGPA Calculator",
    description: "Calculate your semester GPA (SGPA) from a single semester's subject credit hours and grade points.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AutoStoriesIcon fontSize="large" color="primary"/>,
    seoTitle: "SGPA Calculator - Calculate Semester Grade Point Average",
    seoDescription: "Free SGPA calculator to work out your semester grade point average from subject credit hours and grade points, on a 10-point or 4-point scale.",
    keywords: ["sgpa calculator", "calculate sgpa", "semester gpa calculator", "semester grade point average", "sgpa to percentage"],
    ogTitle: "SGPA Calculator - Calculate Semester Grade Point Average | ToolZoneX",
    ogDescription: "Work out your semester GPA (SGPA) from subject credit hours and grade points.",
    schemaName: "SGPA Calculator",
    schemaDescription: "Calculate semester GPA (SGPA) from subject credit hours and grade points.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Is SGPA the same as CGPA?", answer: "No — SGPA covers only one semester's subjects, while CGPA is the cumulative, credit-weighted average across all semesters completed so far. Use the CGPA Calculator once you have SGPA figures for multiple semesters." }, { question: "Does a low SGPA in one semester ruin my CGPA?", answer: "It lowers your CGPA proportionally to that semester's total credits relative to your overall credits, but it doesn't solely determine it — strong SGPAs in other semesters, especially higher-credit ones, can offset a single weak semester over time." }, { question: "Why is my SGPA weighted by credits instead of a simple average?", answer: "Credit hours reflect how much coursework and classroom time a subject represents, so a 4-credit subject is meant to count more toward your overall performance than a 1-credit subject — a simple, unweighted average would treat them as equally important." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
