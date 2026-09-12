import ChecklistIcon from '@mui/icons-material/Checklist';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/household-task-list-generator",
    navName: "Household Task List Generator",
    navDescription: "Build a household task list from common tasks by room.",
    name: "Household Task List Generator",
    description: "Build a household task list by checking common tasks organized by room — Kitchen, Bathroom, Bedroom, Living Room, Outdoor, and General — plus your own custom tasks.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ChecklistIcon fontSize="large" color="primary"/>,
    seoTitle: "Household Task List Generator - Build a Chore Checklist",
    seoDescription: "Free household task list generator. Build a task list from common household chores organized by room, plus your own custom tasks.",
    keywords: ["household task list generator", "household chore list", "home task checklist", "chore list by room", "household to-do list generator"],
    ogTitle: "Household Task List Generator - Build a Chore Checklist | ToolZoneX",
    ogDescription: "Build a household task list from common chores organized by room, plus custom tasks.",
    schemaName: "Household Task List Generator",
    schemaDescription: "Build a household task list by checking common tasks organized by room — Kitchen, Bathroom, Bedroom, Living Room, Outdoor, and General — plus your own custom tasks.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I add tasks that aren't in the pre-set categories?", answer: "Yes — use the \"Add Custom Task\" field to add anything, and it will appear in the Other section of your final list." }, { question: "Is my checklist saved for next time?", answer: "No — the list resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere." }, { question: "Can I copy the list to share with my household?", answer: "Yes — click the Copy button to copy your full grouped list as plain text, ready to paste into a group chat, note, or shared document." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
