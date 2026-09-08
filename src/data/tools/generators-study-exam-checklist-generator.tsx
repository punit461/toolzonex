import SchoolIcon from '@mui/icons-material/School';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/study-exam-checklist-generator",
    navName: "Study/Exam Checklist Generator",
    navDescription: "Track subjects to review plus a general exam-prep checklist.",
    name: "Study/Exam Checklist Generator",
    description: "Track subjects or topics to review before an exam alongside a general, pre-populated exam-prep checklist covering notes, practice, sleep, and materials.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <SchoolIcon fontSize="large" color="primary"/>,
    seoTitle: "Study/Exam Checklist Generator - Exam Prep & Revision Checklist",
    seoDescription: "Free study and exam checklist generator. Track subjects to review plus a general exam-prep checklist covering notes, practice, and exam-day materials.",
    keywords: ["study checklist generator", "exam checklist generator", "exam revision checklist", "study planner", "exam prep checklist"],
    ogTitle: "Study/Exam Checklist Generator - Exam Prep & Revision Checklist | ToolZoneX",
    ogDescription: "Track subjects to review plus a general exam-prep checklist.",
    schemaName: "Study/Exam Checklist Generator",
    schemaDescription: "Track subjects or topics to review before an exam alongside a general, pre-populated exam-prep checklist covering notes, practice, sleep, and materials.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why combine subject tracking and general prep in one tool?", answer: "Exam readiness has two sides — knowing the material and being logistically prepared — so this tool covers both a Study Checklist and an Exam Revision Checklist in a single page rather than two near-identical ones." }, { question: "Can I track as many subjects as I need?", answer: "Yes — click Add Subject / Topic as many times as you like; there's no fixed limit on how many rows you can add." }, { question: "Is my progress saved between visits?", answer: "No — it resets on reload since everything is generated fresh in your browser, so copy your summary if you want to track progress across study sessions." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
