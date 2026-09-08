import AccountTreeIcon from '@mui/icons-material/AccountTree';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-viewer",
    navName: "JSON Viewer",
    navDescription: "Explore JSON as a collapsible tree.",
    name: "JSON Viewer - Interactive Tree Explorer",
    description: "Paste any JSON and explore it as a collapsible, syntax-colored tree — expand and collapse nested objects and arrays to focus on what matters.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <AccountTreeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON Viewer - Interactive Collapsible Tree Explorer",
    seoDescription: "Free online JSON viewer. Paste JSON and explore it as a collapsible, syntax-colored tree with a raw formatted view and copy option.",
    keywords: ["json viewer", "json tree viewer", "json explorer", "view json online", "collapsible json viewer", "json tree structure"],
    ogTitle: "JSON Viewer - Interactive Collapsible Tree Explorer | ToolZoneX",
    ogDescription: "Paste any JSON and explore it as a collapsible, syntax-colored tree with a raw formatted view.",
    schemaName: "JSON Viewer",
    schemaDescription: "Explore JSON data as an interactive, collapsible tree with syntax-colored keys and values.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the JSON Formatter?", answer: "The JSON Formatter focuses on pretty-printing and minifying JSON as text. This viewer is built for exploration — it renders the same data as an interactive, collapsible tree so you can expand only the parts you need, though a raw formatted view is also available here." }, { question: "Does it work with large JSON documents?", answer: "Yes — everything runs in your browser, and collapsing large branches you don't need makes it easy to navigate even sizeable payloads without the page becoming sluggish." }, { question: "Is my JSON data uploaded anywhere?", answer: "No — parsing and rendering happen entirely client-side in your browser. Your data is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
