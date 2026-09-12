import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-reverser",
    navName: "Text Reverser",
    navDescription: "Reverse text, words, or letters.",
    name: "Text Reverser",
    description: "Reverse text backwards, reverse words, or flip lines upside down. Free online text reversal tool.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Reverser - Reverse Text, Words, and Lines Online",
    seoDescription: "Reverse text backwards, reverse words, or flip lines upside down. Free online text reversal tool to mirror your text instantly.",
    keywords: ["text reverser", "reverse text", "flip text", "mirror text", "reverse words", "backwards text generator"],
    ogTitle: "Text Reverser - Reverse Text, Words, and Lines Online | ToolZoneX",
    ogDescription: "Reverse text backwards, reverse words, or flip lines upside down. Free online text reversal tool.",
    schemaName: "Text Reverser",
    schemaDescription: "Reverse text backwards, reverse words, or flip lines upside down. Free online text reversal tool.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
