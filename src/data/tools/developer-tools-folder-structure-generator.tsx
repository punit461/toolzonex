import AccountTreeIcon from '@mui/icons-material/AccountTree';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/folder-structure-generator",
    navName: "Folder Structure Generator",
    navDescription: "Generate an ASCII tree and mkdir/touch shell script.",
    name: "Folder Structure Generator",
    description: "Describe a folder tree with indented text or pick a project preset, then get a visual ASCII tree and a copyable mkdir -p / touch shell script to create it.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <AccountTreeIcon fontSize="large" color="primary"/>,
    seoTitle: "Folder Structure Generator - ASCII Tree & Shell Script",
    seoDescription: "Free folder structure generator. Describe a project's folder tree or pick a preset, and get an ASCII tree plus a mkdir -p / touch shell script.",
    keywords: ["folder structure generator", "project structure generator", "directory tree generator", "mkdir script generator", "ascii folder tree"],
    ogTitle: "Folder Structure Generator - ASCII Tree & Shell Script | ToolZoneX",
    ogDescription: "Generate an ASCII folder tree and a shell script to create it.",
    schemaName: "Folder Structure Generator",
    schemaDescription: "Describe a folder tree with indented text or pick a project preset, then get a visual ASCII tree and a copyable mkdir -p / touch shell script to create it.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How does the tool know if a line is a folder or a file?", answer: "Any line ending in a forward slash (\"/\") is treated as a folder; every other line is treated as a file. Nesting depth is determined by how many leading spaces or tabs a line has compared to the line above it." }, { question: "Will the generated shell script actually work?", answer: "Yes — it uses mkdir -p for every folder (which also creates any missing parent folders) and touch for every file, so pasting it into a terminal in your target directory recreates the exact structure." }, { question: "Can I customize a preset after selecting it?", answer: "Not directly in preset mode — switch to \"Describe Structure\" and paste in a preset's layout as a starting point, then edit the text freely from there." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
