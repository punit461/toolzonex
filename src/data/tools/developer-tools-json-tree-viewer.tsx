import AccountTreeIcon from '@mui/icons-material/AccountTree';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-tree-viewer",
    navName: "JSON Tree Viewer",
    navDescription: "Search & explore JSON as a tree.",
    name: "JSON Tree Viewer with Search",
    description: "Explore JSON as a collapsible tree and search for any key or value, with matching branches auto-expanded and highlighted.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <AccountTreeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON Tree Viewer with Search - Free Online Developer Tool",
    seoDescription: "Paste any JSON and explore it as a collapsible tree, then search for a specific key or value — matching branches auto-expand and highlight instantly. Free online tool.",
    keywords: ["json tree viewer", "json search", "json explorer", "json tree search", "find key in json", "json viewer with search"],
    ogTitle: "JSON Tree Viewer with Search - Free Online Developer Tool | ToolZoneX",
    ogDescription: "Explore JSON as a collapsible tree and search for any key or value instantly.",
    schemaName: "JSON Tree Viewer with Search",
    schemaDescription: "Explore JSON as a collapsible tree and search for any key or value, with matching branches auto-expanded and highlighted.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the plain JSON Viewer?", answer: "The JSON Viewer is a general-purpose collapsible tree explorer. This tool adds a search box on top of that same tree so you can filter for a specific key or value by typing — matching branches auto-expand and matches are highlighted, which the plain viewer doesn't do." }, { question: "Is the search case-sensitive?", answer: "No — the search matches keys and values as a case-insensitive substring, so searching \"email\" also finds \"Email\" or \"EMAIL\"." }, { question: "Is my JSON data uploaded anywhere?", answer: "No — parsing, searching, and rendering all happen entirely client-side in your browser. Your data is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
