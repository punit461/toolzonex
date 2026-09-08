import SchoolIcon from '@mui/icons-material/School';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/study-hours-planner-calculator",
    navName: "Study Hours Planner Calculator",
    navDescription: "Split available study time across subjects.",
    name: "Study Hours Planner Calculator",
    description: "Plan study time by splitting available hours before an exam or deadline evenly across your subjects or courses.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SchoolIcon fontSize="large" color="primary"/>,
    seoTitle: "Study Hours Planner Calculator - Study Time Per Subject",
    seoDescription: "Free study hours planner calculator. Enter subjects, days remaining, and hours per day to plan study time per subject.",
    keywords: ["study hours planner calculator", "study time calculator", "exam study planner", "hours per subject calculator", "study schedule calculator"],
    ogTitle: "Study Hours Planner Calculator - Study Time Per Subject | ToolZoneX",
    ogDescription: "Plan study time by splitting available hours before an exam or deadline evenly across your subjects.",
    schemaName: "Study Hours Planner Calculator",
    schemaDescription: "Calculate total available study hours as days remaining times hours per day, then divide evenly across the number of subjects.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Should I really split time evenly across all subjects?", answer: "An even split is a reasonable starting point, but it's worth adjusting based on which subjects are harder for you, carry more weight in your final grade, or need more practice — treat the even split as a baseline plan to fine-tune, not a strict rule." }, { question: "What if I don't know exactly how many days remain?", answer: "Just count the days between today and your exam or deadline, excluding or including the exam day itself as you prefer, then enter that as your days remaining." }, { question: "How many study hours per day is realistic?", answer: "This varies a lot by person, but sustained focused studying for more than 4-6 hours a day becomes hard for most people without diminishing returns. Build in breaks, and be honest about how much focused time you can actually manage." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
