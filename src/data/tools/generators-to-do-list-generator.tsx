import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/to-do-list-generator",
    navName: "To-Do List Generator",
    navDescription: "A quick session-only to-do list.",
    name: "To-Do List Generator",
    description: "Create a quick session-only to-do list — add items, check them off, and delete them, with no account or saving required.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CheckCircleIcon fontSize="large" color="primary"/>,
    seoTitle: "To-Do List Generator - Free Quick Online Checklist",
    seoDescription: "Free to-do list generator. Add tasks, check them off, and delete them in a simple session-only checklist — no account or sign-up needed.",
    keywords: ["to do list generator", "online to do list", "quick checklist maker", "simple to do list", "free to do list tool"],
    ogTitle: "To-Do List Generator - Free Quick Online Checklist | ToolZoneX",
    ogDescription: "Create a quick session-only to-do list with no sign-up needed.",
    schemaName: "To-Do List Generator",
    schemaDescription: "Create a quick session-only to-do list — add items, check them off, and delete them, with no account or saving required.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this list save if I close the page?", answer: "No — this is a quick scratch-pad list only. It lives in your browser tab for the current session and is not saved, synced, or backed up anywhere, so it will be gone if you refresh or close the page. For a saved or synced to-do app, use dedicated task management software instead." }, { question: "Is there a limit to how many items I can add?", answer: "No practical limit — add as many items as you need for your current session." }, { question: "Can I reorder items?", answer: "Not currently — items appear in the order you add them. Remove and re-add an item if you want to move it, or simply keep adding new items as priorities shift." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
