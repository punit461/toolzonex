import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/url-encode-decode",
    navName: "URL Encode/Decode",
    navDescription: "URL encode or decode text.",
    name: "URL Encode and Decode",
    description: "Easily URL encode plain text or decode URL encoded strings back to plain text. Free online developer tool.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "URL Encode and Decode - Free Online Converter",
    seoDescription: "Easily URL encode plain text or decode URL encoded strings back to plain text. Free online developer tool.",
    keywords: ["url encode", "url decode", "encode url online", "decode url", "url component encoder"],
    ogTitle: "URL Encode and Decode - Free Online Converter | ToolZoneX",
    ogDescription: "Easily URL encode plain text or decode URL encoded strings back to plain text.",
    schemaName: "URL Encode and Decode",
    schemaDescription: "Easily URL encode plain text or decode URL encoded strings back to plain text.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
