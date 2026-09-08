import SchoolIcon from '@mui/icons-material/School';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/cgpa-calculator",
    navName: "CGPA Calculator",
    navDescription: "Weighted CGPA from subject credits & grade points.",
    name: "CGPA Calculator",
    description: "Calculate your cumulative CGPA from subject credit hours and grade points, on a 10-point or 4-point scale.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SchoolIcon fontSize="large" color="primary"/>,
    seoTitle: "CGPA Calculator - Calculate Cumulative Grade Point Average",
    seoDescription: "Free CGPA calculator to work out your cumulative grade point average from subject credit hours and grade points, on a 10-point or 4-point scale.",
    keywords: ["cgpa calculator", "calculate cgpa", "cumulative gpa calculator", "cgpa to percentage", "credit weighted average calculator", "grade point average calculator"],
    ogTitle: "CGPA Calculator - Calculate Cumulative Grade Point Average | ToolZoneX",
    ogDescription: "Work out your cumulative CGPA from subject credit hours and grade points.",
    schemaName: "CGPA Calculator",
    schemaDescription: "Calculate cumulative CGPA from subject credit hours and grade points.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What's the difference between CGPA and SGPA?", answer: "SGPA (Semester Grade Point Average) covers only the subjects in a single semester, while CGPA is the cumulative, credit-weighted average across all semesters completed so far. Once you have every semester's SGPA, CGPA is the credit-weighted average of those semesters." }, { question: "How do I convert CGPA to a percentage?", answer: "Most Indian universities on a 10-point scale use the approximation Percentage = CGPA × 9.5, though the exact multiplier varies by institution — check your university's official conversion formula before relying on it for anything official." }, { question: "Can I use this if my institution uses a 4-point scale?", answer: "Yes — just enter each subject's grade point on your institution's actual scale (e.g. out of 4 instead of out of 10) and select the matching scale above; the weighted-average formula works the same regardless of the maximum scale." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
