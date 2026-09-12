import DataObjectIcon from '@mui/icons-material/DataObject';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/yaml-viewer",
    navName: "YAML Viewer",
    navDescription: "Explore YAML as a collapsible tree.",
    name: "YAML Viewer - Interactive Tree Explorer",
    description: "Parse any YAML document and explore it as a collapsible, syntax-colored tree instead of scanning raw indentation.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <DataObjectIcon fontSize="large" color="primary"/>,
    seoTitle: "YAML Viewer - Interactive Tree Explorer for YAML Files",
    seoDescription: "Paste any YAML document and explore it as a collapsible tree — expand and collapse nested mappings and sequences instantly. Free online developer tool.",
    keywords: ["yaml viewer", "yaml tree viewer", "yaml explorer", "view yaml online", "yaml tree explorer"],
    ogTitle: "YAML Viewer - Interactive Tree Explorer | ToolZoneX",
    ogDescription: "Parse YAML and explore it as a collapsible, syntax-colored tree.",
    schemaName: "YAML Viewer - Interactive Tree Explorer",
    schemaDescription: "Parse any YAML document and explore it as a collapsible, syntax-colored tree instead of scanning raw indentation.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the YAML Formatter?", answer: "The YAML Formatter focuses on re-indenting messy YAML text back into consistent, readable YAML. This viewer parses the YAML and renders it as an interactive, collapsible tree instead — the same exploration-focused interaction as our JSON Tree Viewer — so you can expand only the parts you need rather than reading reformatted text top to bottom." }, { question: "Does it work with large YAML documents?", answer: "Yes — everything runs in your browser, and collapsing large branches you don't need makes it easy to navigate even sizeable documents without the page becoming sluggish." }, { question: "Is my YAML data uploaded anywhere?", answer: "No — parsing and rendering happen entirely client-side in your browser. Your data is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
