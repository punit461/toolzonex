import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/remove-punctuation",
    navName: "Remove Punctuation",
    navDescription: "Strip all punctuation from text.",
    name: "Remove Punctuation",
    description: "Strip all punctuation characters from text instantly, live as you type, while keeping letters, numbers, and spaces intact.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove Punctuation from Text Online",
    seoDescription: "Strip all punctuation characters from text instantly, while keeping letters, numbers, and spaces intact. Free online tool, no sign-up.",
    keywords: ["remove punctuation", "strip punctuation from text", "remove punctuation online", "delete punctuation marks"],
    ogTitle: "Remove Punctuation from Text Online | ToolZoneX",
    ogDescription: "Strip all punctuation characters from text instantly.",
    schemaName: "Remove Punctuation",
    schemaDescription: "Strip all punctuation characters from text instantly, live as you type, while keeping letters, numbers, and spaces intact.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does it remove spaces or line breaks too?", answer: "No — only punctuation and symbol characters are removed. Spaces, line breaks, letters, and numbers are all left in place." }, { question: "Will apostrophes in contractions be removed?", answer: "Yes — apostrophes are treated as punctuation, so \"I'm\" becomes \"Im\" and \"don't\" becomes \"dont\"." }, { question: "Does this update as I type?", answer: "Yes — there's no button to click. The result recalculates instantly as you edit the input text." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
