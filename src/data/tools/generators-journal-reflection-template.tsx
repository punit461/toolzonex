import NoteAltIcon from '@mui/icons-material/NoteAlt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/journal-reflection-template",
    navName: "Journal/Daily Reflection Template",
    navDescription: "Structured daily journal with gratitude, highlight & lessons.",
    name: "Journal/Daily Reflection Template",
    description: "Fill in a date, three gratitude items, today's highlight, what you learned, and tomorrow's focus to build a formatted, copyable daily journal entry.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <NoteAltIcon fontSize="large" color="primary"/>,
    seoTitle: "Journal/Daily Reflection Template - Gratitude & Highlights",
    seoDescription: "Free daily journal and reflection template. Fill in gratitude, a highlight, a lesson learned, and tomorrow's focus for a formatted entry.",
    keywords: ["journal template generator", "daily reflection template", "gratitude journal template", "daily journal prompt generator", "reflection journal maker"],
    ogTitle: "Journal/Daily Reflection Template - Gratitude & Highlights | ToolZoneX",
    ogDescription: "Build a structured, formatted daily journal entry with gratitude, highlights, and lessons learned.",
    schemaName: "Journal/Daily Reflection Template",
    schemaDescription: "Fill in a date, three gratitude items, today's highlight, what you learned, and tomorrow's focus to build a formatted, copyable daily journal entry.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Do I have to fill in all three gratitude items?", answer: "No — any left blank show as \"(blank)\" in the output, so feel free to fill in just one or two on days when that's all you have." }, { question: "Can I use this for both a gratitude journal and a daily reflection?", answer: "Yes — the template combines both formats in one entry, covering gratitude, a daily highlight, a lesson learned, and a forward-looking focus for tomorrow." }, { question: "Is my journal entry saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the entry before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
