import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/markdown-preview",
    navName: "Markdown Preview",
    navDescription: "Render Markdown to HTML in real time.",
    name: "Markdown Preview",
    description: "Type Markdown and see it rendered as HTML in real time. Free online Markdown preview and editor.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "Markdown Preview - Render Markdown to HTML Online",
    seoDescription: "Free online Markdown preview and editor. Type Markdown on one side and instantly see the rendered HTML on the other.",
    keywords: ["markdown preview", "markdown editor", "markdown to html", "render markdown", "markdown viewer"],
    ogTitle: "Markdown Preview - Render Markdown to HTML | ToolZoneX",
    ogDescription: "Type Markdown and see it rendered as HTML in real time.",
    schemaName: "Markdown Preview",
    schemaDescription: "Render Markdown to HTML in real time.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
