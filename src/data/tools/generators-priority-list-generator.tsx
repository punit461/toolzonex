import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/priority-list-generator",
    navName: "Priority List Generator",
    navDescription: "Sort tasks into High, Medium, and Low priority groups.",
    name: "Priority List Generator - Sort Tasks by Priority",
    description: "Add tasks with a High, Medium, or Low priority level and get them automatically sorted and grouped by priority, highest first.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <PriorityHighIcon fontSize="large" color="primary"/>,
    seoTitle: "Priority List Generator - Sort Tasks by Priority",
    seoDescription: "Free online priority list generator. Add tasks with High, Medium, or Low priority and get an instantly sorted, grouped task list.",
    keywords: ["priority list generator", "task priority sorter", "to-do list priority generator", "priority matrix maker", "sort tasks by priority online"],
    ogTitle: "Priority List Generator - Sort Tasks by Priority | ToolZoneX",
    ogDescription: "Add tasks with a priority level and get them automatically sorted and grouped, highest first.",
    schemaName: "Priority List Generator",
    schemaDescription: "Add tasks with a High, Medium, or Low priority level and get them automatically sorted and grouped by priority, highest first.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Can I change a task's priority after adding it?", answer: "Yes — just change the dropdown next to any task at any time, and the sorted list on the right updates instantly." }, { question: "What happens to a task with no description?", answer: "Blank task rows are ignored in the sorted output on the right, so you can leave placeholder rows without cluttering your final list." }, { question: "Is there a limit to how many tasks I can add?", answer: "No — click Add Task as many times as you need; there's no fixed limit on the number of rows." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
