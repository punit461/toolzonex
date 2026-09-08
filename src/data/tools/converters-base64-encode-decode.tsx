import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/base64-encode-decode",
    navName: "Base64 Encode/Decode",
    navDescription: "Encode/decode base64 strings.",
    name: "Base64 Encode and Decode",
    description: "Easily encode plain text to Base64 or decode Base64 strings to plain text. Free online Base64 converter.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Base64 Encode and Decode - Free Online Converter",
    seoDescription: "Easily encode plain text to Base64 or decode Base64 strings to plain text. Free online Base64 converter supporting UTF-8.",
    keywords: ["base64 encoder", "base64 decoder", "encode to base64", "decode base64", "online base64 tool"],
    ogTitle: "Base64 Encode and Decode - Free Online Converter | ToolZoneX",
    ogDescription: "Easily encode plain text to Base64 or decode Base64 strings to plain text.",
    schemaName: "Base64 Encode and Decode",
    schemaDescription: "Easily encode plain text to Base64 or decode Base64 strings to plain text.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
