import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/text-to-binary",
    navName: "Text to Binary",
    navDescription: "Encode text into binary.",
    name: "Text to Binary Converter",
    description: "Easily convert plain text into binary code or decode binary back to text.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Text to Binary Converter - Encode Text to Binary Online",
    seoDescription: "Easily convert plain text into binary code or decode binary back to text. Free online binary encoding tool.",
    keywords: ["text to binary", "binary to text", "binary encoder", "binary generator", "convert text to binary"],
    ogTitle: "Text to Binary Converter - Encode Text to Binary Online | ToolZoneX",
    ogDescription: "Easily convert plain text into binary code or decode binary back to text.",
    schemaName: "Text to Binary Converter",
    schemaDescription: "Easily convert plain text into binary code or decode binary back to text.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
