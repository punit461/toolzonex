import NoteAltIcon from '@mui/icons-material/NoteAlt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/journal-prompt-generator",
    navName: "Journal Prompt Generator",
    navDescription: "Get a random reflective journal question.",
    name: "Journal Prompt Generator - Random Reflective Questions",
    description: "Generate a single random reflective journal question from a curated list of over 60 prompts, perfect for inspiring a quick journaling session.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <NoteAltIcon fontSize="large" color="primary"/>,
    seoTitle: "Journal Prompt Generator - Free Random Reflection Questions",
    seoDescription: "Free journal prompt generator. Get a random reflective question to inspire your next journaling session — no sign-up required.",
    keywords: ["journal prompt generator", "random journal prompts", "reflective writing prompts", "daily journal question generator", "self reflection prompts"],
    ogTitle: "Journal Prompt Generator - Free Random Reflection Questions | ToolZoneX",
    ogDescription: "Get a random reflective journal question to inspire your writing.",
    schemaName: "Journal Prompt Generator",
    schemaDescription: "Generate a single random reflective journal question from a curated list of over 60 prompts.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Journal/Daily Reflection Template?", answer: "The Journal/Daily Reflection Template is a structured, multi-field form with fixed sections — gratitude, a highlight, a lesson learned, and tomorrow's focus — that you fill in every time. This Journal Prompt Generator is simpler: it generates a single random reflective question for inspiration, with no structured template or multiple fields to complete." }, { question: "Can I get the same prompt twice?", answer: "Yes — each click is an independent random pick from the full list, so repeats are possible, especially over many clicks." }, { question: "Does the tool save my journal entries?", answer: "No — this tool only generates the prompt itself; it doesn't include a writing area or save anything, so write your response in your own notebook, notes app, or document." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
