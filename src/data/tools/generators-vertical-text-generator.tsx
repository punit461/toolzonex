import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/vertical-text-generator",
    navName: "Vertical Text",
    navDescription: "Convert text to vertical format.",
    name: "Vertical Text Generator - Stack Text Vertically",
    description: "Convert your text into vertical aesthetic formats for social media and chats instantly.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Vertical Text Generator - Stack Text Vertically",
    seoDescription: "Convert your text into vertical aesthetic formats for social media and chats instantly.",
    keywords: ["vertical text generator", "stack text", "vertical letters", "aesthetic text vertical", "text column generator", "vertical text copy and paste"],
    ogTitle: "Vertical Text Generator - Stack Text Vertically | ToolZoneX",
    ogDescription: "Convert your text into vertical aesthetic formats for social media and chats instantly.",
    schemaName: "Vertical Text Generator",
    schemaDescription: "Convert your text into vertical aesthetic formats for social media and chats instantly.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I copy and paste the vertical text anywhere?", answer: "Yes — click \"Copy\" on the result panel and it's ready for vertical text copy and paste into Instagram bios, TikTok captions, Discord, or any text field that accepts plain text." }, { question: "Will this work on any platform?", answer: "Yes — the output is plain text with line breaks, so it works anywhere text can be pasted, including social media bios and chat apps." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
