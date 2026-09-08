import GradeIcon from '@mui/icons-material/Grade';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/school-grade-calculator",
    navName: "School Grade Calculator",
    navDescription: "Percentage-to-letter-grade lookup.",
    name: "School Grade Calculator - Percentage to Letter Grade",
    description: "Convert a percentage score into its corresponding letter grade using a standard grading scale.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GradeIcon fontSize="large" color="primary"/>,
    seoTitle: "School Grade Calculator - Percentage to Letter Grade",
    seoDescription: "Free school grade calculator. Enter a percentage score to instantly find the corresponding letter grade on a standard A-F grading scale.",
    keywords: ["school grade calculator", "percentage to letter grade calculator", "grade calculator", "letter grade calculator", "what letter grade is this percentage"],
    ogTitle: "School Grade Calculator - Percentage to Letter Grade | ToolZoneX",
    ogDescription: "Convert a percentage score into its corresponding letter grade using a standard grading scale.",
    schemaName: "School Grade Calculator",
    schemaDescription: "Convert a percentage score into its corresponding letter grade using a standard A-F grading scale.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does every school use this exact scale?", answer: "No — this reflects a commonly used standard US grading scale, but individual schools, districts, universities, and countries often use their own variations (some don't use +/- grades at all, some shift the cutoffs by a few points). Always check your specific school or instructor's syllabus for the scale that actually applies to you." }, { question: "How is this different from the Final Grade Calculator?", answer: "This tool is a straightforward lookup — you already have a percentage and just want the matching letter grade. The Final Grade Calculator works backward, solving algebraically for the score you'd need on a remaining assignment or exam to hit a target overall grade." }, { question: "Do other countries use letter grades the same way?", answer: "No — many countries use entirely different scales, such as numeric grades out of 10 or 20, GPA-only systems, or pass/fail marks. This tool follows the common US-style A-F letter grade convention." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
