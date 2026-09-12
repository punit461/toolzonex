import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/line-numbering",
    navName: "Line Numbering",
    navDescription: "Add line numbers to text.",
    name: "Line Numbering",
    description: "Automatically add line numbers to text or lists. Free online utility for coding or document formatting.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Line Numbering - Add Numbers to Text Lines Online",
    seoDescription: "Automatically add line numbers to text or lists. Free online utility for coding, document formatting, and text manipulation.",
    keywords: ["line numbering", "add numbers to lines", "number text lines", "list numbering tool", "auto number list", "line number calculator", "add line number"],
    ogTitle: "Line Numbering - Add Numbers to Text Lines Online | ToolZoneX",
    ogDescription: "Automatically add line numbers to text or lists. Free online utility.",
    schemaName: "Line Numbering",
    schemaDescription: "Automatically add line numbers to text or lists.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Is this the same as a line number calculator?", answer: "Yes — people search for a \"line number calculator\" when they want sequential numbers added to a list or document; this tool does exactly that, working out and inserting the correct number for every line automatically." }, { question: "How do I add line numbers to my text?", answer: "Paste your text into the box, choose your numbering options (skip empty lines, dot or no dot after the number), and click \"Add Line Numbers\" — every line gets numbered instantly." }, { question: "Can I number only non-empty lines?", answer: "Yes — enable \"skip empty lines\" and blank lines are left as-is without incrementing the counter." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
