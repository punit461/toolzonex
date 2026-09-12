import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/xml-viewer",
    navName: "XML Viewer",
    navDescription: "View & format XML with syntax highlighting.",
    name: "XML Viewer - View & Format XML Online",
    description: "Paste XML and instantly view it with syntax highlighting, color-coded tags, and a collapsible tree structure. Copy formatted output with one click.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "XML Viewer - View & Format XML Online",
    seoDescription: "Free online XML viewer with syntax highlighting and collapsible tree view. Paste XML to instantly pretty-print, color-code, and format your XML documents.",
    keywords: ["XML viewer", "XML formatter", "XML pretty print", "view XML online", "XML syntax highlight", "XML tree viewer", "format XML online"],
    ogTitle: "XML Viewer - View & Format XML Online | ToolZoneX",
    ogDescription: "Paste XML and instantly view it with syntax highlighting and a collapsible tree structure. Free online XML viewer.",
    schemaName: "XML Viewer",
    schemaDescription: "View and format XML with syntax highlighting and collapsible tree structure.",
    applicationCategory: "DeveloperApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
