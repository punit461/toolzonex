import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/text-diff-tool",
    navName: "Text Diff Tool",
    navDescription: "Compare two texts to see differences.",
    name: "Text Diff Tool - Compare Text Online",
    description: "Compare two text documents online to see exact differences. Highlights added and removed words instantly.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Diff Tool - Compare Text Online",
    seoDescription: "Compare two text documents online to see exact differences. Highlights added and removed words instantly.",
    keywords: ["text diff", "compare text", "diff checker", "text difference finder", "diff tool online"],
    ogTitle: "Text Diff Tool - Compare Text Online | ToolZoneX",
    ogDescription: "Compare two text documents online to see exact differences. Highlights added and removed words instantly.",
    schemaName: "Text Diff Tool",
    schemaDescription: "Compare two text documents online to see exact differences.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
