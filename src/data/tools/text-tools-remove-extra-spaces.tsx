import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/remove-extra-spaces",
    navName: "Remove Extra Spaces",
    navDescription: "Collapse multiple spaces into one.",
    name: "Remove Extra Spaces",
    description: "Collapse multiple consecutive spaces into a single space, with an option to trim leading and trailing spaces.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove Extra Spaces from Text Online",
    seoDescription: "Collapse multiple consecutive spaces into a single space, with an option to trim leading and trailing spaces. Free and instant.",
    keywords: ["remove extra spaces", "collapse multiple spaces", "remove double spaces online", "fix spacing in text"],
    ogTitle: "Remove Extra Spaces from Text Online | ToolZoneX",
    ogDescription: "Collapse multiple consecutive spaces into a single space.",
    schemaName: "Remove Extra Spaces",
    schemaDescription: "Collapse multiple consecutive spaces into a single space, with an option to trim leading and trailing spaces.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this remove line breaks too?", answer: "No — only spaces and tabs within a line are collapsed. Line breaks are left in place so your paragraph structure stays intact." }, { question: "What does the trim option do?", answer: "With trimming enabled, any spaces at the very start or end of each line are also removed, in addition to collapsing multiple spaces within the line." }, { question: "Does it update as I type?", answer: "Yes — there's no button to click. The cleaned result recalculates instantly as you edit the text." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
