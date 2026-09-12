import AssessmentIcon from '@mui/icons-material/Assessment';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/marks-percentage-calculator",
    navName: "Marks Percentage Calculator",
    navDescription: "Percentage & grade from marks across subjects.",
    name: "Marks Percentage Calculator",
    description: "Calculate your overall percentage and grade band from marks obtained and maximum marks across one or more subjects.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AssessmentIcon fontSize="large" color="primary"/>,
    seoTitle: "Marks Percentage Calculator - Marks to Percentage & Grade",
    seoDescription: "Free marks percentage calculator to work out your overall percentage and grade band from marks obtained and maximum marks across multiple subjects.",
    keywords: ["marks percentage calculator", "marks to percentage calculator", "exam percentage calculator", "total marks percentage", "percentage calculator for students"],
    ogTitle: "Marks Percentage Calculator - Marks to Percentage & Grade | ToolZoneX",
    ogDescription: "Work out your overall percentage and grade band from marks obtained and maximum marks.",
    schemaName: "Marks Percentage Calculator",
    schemaDescription: "Calculate overall percentage and grade band from marks obtained and maximum marks across subjects.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Is this the same as averaging each subject's percentage?", answer: "Only if every subject has the same maximum marks. When subjects have different maximum marks (e.g. one out of 100 and another out of 50), this calculator correctly weights by total marks rather than simply averaging each subject's individual percentage, which would distort the result." }, { question: "What grading scale does the grade band use?", answer: "The grade band shown (A+ down to F) uses a common general-purpose scale: 90%+ is A+, 80-89% is A, 70-79% is B+, 60-69% is B, 50-59% is C, 40-49% is D, and below 40% is F. Your school or exam board may use a different scale, so treat this as a general reference rather than an official grade." }, { question: "Can I use this for a single subject only?", answer: "Yes — remove the extra rows so only one remains, enter the marks obtained and maximum marks for that one subject, and the calculator will show that subject's individual percentage." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
