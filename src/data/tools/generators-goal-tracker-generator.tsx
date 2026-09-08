import FlagIcon from '@mui/icons-material/Flag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/goal-tracker-generator",
    navName: "Goal Tracker Generator",
    navDescription: "Track progress toward multiple numeric goals.",
    name: "Goal Tracker Generator",
    description: "Add goals with a description, target value, and current progress to see a progress bar and percentage-complete for each one.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <FlagIcon fontSize="large" color="primary"/>,
    seoTitle: "Goal Tracker Generator - Track Progress Toward Your Goals",
    seoDescription: "Free online goal tracker generator. Add goals with a target and current progress to see a live progress bar and percentage complete.",
    keywords: ["goal tracker generator", "goal progress tracker", "savings goal tracker", "goal percentage calculator", "progress bar goal tracker"],
    ogTitle: "Goal Tracker Generator - Track Progress Toward Your Goals | ToolZoneX",
    ogDescription: "Add goals with a target and current progress to see a live progress bar and percentage complete.",
    schemaName: "Goal Tracker Generator",
    schemaDescription: "Add goals with a description, target value, and current progress to see a progress bar and percentage-complete for each one.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Habit Tracker Generator?", answer: "The Habit Tracker Generator is a daily yes/no checkbox GRID for tracking habit consistency across many days — it doesn't use numeric targets at all. This Goal Tracker Generator tracks cumulative numeric PROGRESS toward a quantifiable target over time, like saving a specific dollar amount or reading a specific number of books — a fundamentally different tracking model." }, { question: "Does my progress get saved?", answer: "No — this tool uses client-side state only, with no persistence. Your goals and progress reset when you reload the page, so it's best used for a quick snapshot rather than long-term tracking." }, { question: "Can a goal go over 100%?", answer: "The progress bar itself caps visually at 100%, but the percentage-complete text will show the true value if your current progress exceeds your target." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
