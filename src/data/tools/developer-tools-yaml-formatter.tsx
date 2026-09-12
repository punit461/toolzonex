import DataObjectIcon from '@mui/icons-material/DataObject';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/yaml-formatter",
    navName: "YAML Formatter",
    navDescription: "Format and indent YAML cleanly.",
    name: "YAML Formatter",
    description: "Format ugly or minified YAML into clean, consistently indented output. Free online YAML formatter.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <DataObjectIcon fontSize="large" color="primary"/>,
    seoTitle: "YAML Formatter - Pretty Print & Indent YAML Online",
    seoDescription: "Free online YAML formatter. Paste raw YAML and instantly get clean, two-space indented output with real-time formatting and copy support.",
    keywords: ["yaml formatter", "format yaml", "yaml pretty print", "indent yaml", "yaml beautifier"],
    ogTitle: "YAML Formatter - Pretty Print & Indent YAML Online | ToolZoneX",
    ogDescription: "Format ugly YAML into clean, consistently indented output instantly.",
    schemaName: "YAML Formatter",
    schemaDescription: "Format YAML into clean, consistently indented output.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
