import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/checklist-generator",
    navName: "Checklist Generator",
    navDescription: "Turn a list of items into an interactive checklist.",
    name: "Checklist Generator",
    description: "Turn any list of items into an interactive checklist with checkboxes, and copy it as a Markdown task list.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CheckCircleIcon fontSize="large" color="primary"/>,
    seoTitle: "Checklist Generator - Turn Text into a Checklist Online",
    seoDescription: "Turn any list of items into an interactive checklist with checkboxes. Copy your list as a Markdown task list. Free online checklist maker.",
    keywords: ["checklist generator", "online checklist maker", "markdown checklist", "to-do list generator", "task list generator"],
    ogTitle: "Checklist Generator - Turn Text into a Checklist Online | ToolZoneX",
    ogDescription: "Turn any list of items into an interactive checklist with checkboxes.",
    schemaName: "Checklist Generator",
    schemaDescription: "Turn any list of items into an interactive checklist with checkboxes, and copy it as a Markdown task list.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does my checklist get saved?", answer: "No — this tool keeps everything in your browser's memory only for the current visit. Reloading the page or navigating away resets the list, so copy your progress out as Markdown if you need to keep it." }, { question: "Can I reorder items?", answer: "Not directly in the preview — reorder the lines in the text area on the left and the checklist below updates to match, though checked states are tracked by line position and may shift if you reorder." }, { question: "What does the copied Markdown look like?", answer: "It uses standard GitHub-flavored Markdown task-list syntax: - [ ] item for unchecked items and - [x] item for checked ones, which renders as clickable checkboxes on GitHub, Notion, and most Markdown viewers." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
