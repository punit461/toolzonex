import EditIcon from '@mui/icons-material/Edit';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/markdown-editor",
    navName: "Markdown Editor",
    navDescription: "Write markdown with live HTML preview.",
    name: "Markdown Editor - Live Preview Online",
    description: "Write markdown and see a live HTML preview side by side. Supports headings, bold, italic, links, code blocks, lists, and more. Free, runs in your browser.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <EditIcon fontSize="large" color="primary"/>,
    seoTitle: "Markdown Editor - Live Preview Online",
    seoDescription: "Free online markdown editor with live HTML preview. Write markdown on the left, see the rendered result on the right. Client-side only.",
    keywords: ["markdown editor", "markdown preview", "online markdown", "markdown to html"],
    ogTitle: "Markdown Editor - Live Preview Online | ToolZoneX",
    ogDescription: "Write markdown and see a live HTML preview side by side. Free online markdown editor with instant rendering.",
    schemaName: "Markdown Editor",
    schemaDescription: "Write markdown and see a live HTML preview side by side.",
    applicationCategory: "DeveloperApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
