import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/html-entity-encode-decode",
    navName: "HTML Entity Encoder",
    navDescription: "Encode/decode HTML entities.",
    name: "HTML Entity Encode and Decode",
    description: "Easily encode special characters into HTML entities or decode them back to plain text. Free online developer tool.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "HTML Entity Encode and Decode - Free Online Converter",
    seoDescription: "Easily encode special characters into HTML entities or decode them back to plain text. Free online developer tool.",
    keywords: ["html entity encode", "html entity decode", "encode html online", "decode html characters", "character encoder"],
    ogTitle: "HTML Entity Encode and Decode - Free Online Converter | ToolZoneX",
    ogDescription: "Easily encode special characters into HTML entities or decode them back to plain text.",
    schemaName: "HTML Entity Encode and Decode",
    schemaDescription: "Easily encode special characters into HTML entities or decode them back to plain text.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
