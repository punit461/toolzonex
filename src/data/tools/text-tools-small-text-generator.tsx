import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/small-text-generator",
    navName: "Small Text Generator",
    navDescription: "Generate tiny superscript and small-cap text.",
    name: "Small Text Generator - Generate Tiny Text Online",
    description: "Convert text to tiny superscript and small-cap Unicode characters. Copy and paste styled text into social media bios, usernames, and messages.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Small Text Generator - Generate Tiny Text Online",
    seoDescription: "Free online small text generator. Convert any text to tiny superscript and small-cap Unicode characters. Copy and paste into social media.",
    keywords: ["small text generator", "tiny text", "small font generator", "small letters"],
    ogTitle: "Small Text Generator - Generate Tiny Text Online | ToolZoneX",
    ogDescription: "Convert text to tiny superscript and small-cap Unicode characters. Copy and paste styled text anywhere.",
    schemaName: "Small Text Generator",
    schemaDescription: "Convert text to tiny superscript and small-cap Unicode characters.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
