import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/remove-special-characters",
    navName: "Remove Special Characters",
    navDescription: "Strip symbols, keep letters and numbers.",
    name: "Remove Special Characters",
    description: "Remove all non-alphanumeric characters from text, with toggleable exceptions to keep spaces, line breaks, or basic punctuation.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove Special Characters from Text Online",
    seoDescription: "Remove all non-alphanumeric characters from text, with toggleable exceptions to keep spaces, line breaks, or basic punctuation. Free and instant.",
    keywords: ["remove special characters", "strip symbols from text", "remove non alphanumeric characters", "clean text symbols", "remove symbols online"],
    ogTitle: "Remove Special Characters from Text Online | ToolZoneX",
    ogDescription: "Remove all non-alphanumeric characters from text, with toggleable exceptions.",
    schemaName: "Remove Special Characters",
    schemaDescription: "Remove all non-alphanumeric characters from text, with toggleable exceptions to keep spaces, line breaks, or basic punctuation.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this remove accented letters like é or ñ?", answer: "Yes — only plain ASCII letters (a-z, A-Z) and digits (0-9) are kept by default, so accented and non-Latin characters are treated as special characters and removed." }, { question: "Can I keep punctuation like periods and commas?", answer: "Yes — tick \"Keep basic punctuation\" to preserve periods, commas, exclamation marks, question marks, colons, semicolons, quotes, parentheses, and hyphens while still removing other symbols." }, { question: "Does it update as I type?", answer: "Yes — there's no button to click. The cleaned result recalculates instantly whenever you edit the text or toggle one of the \"keep\" options." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
