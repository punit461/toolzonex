import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/html-to-bbcode",
    navName: "HTML to BBCode",
    navDescription: "Convert HTML markup to BBCode.",
    name: "HTML to BBCode Converter",
    description: "Convert HTML markup into equivalent BBCode forum syntax instantly.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "HTML to BBCode Converter - Convert HTML to Forum Markup",
    seoDescription: "Free HTML to BBCode converter. Paste HTML markup and convert tags like <strong>, <em>, <a>, and <blockquote> to equivalent BBCode instantly.",
    keywords: ["html to bbcode", "html to bbcode converter", "convert html to bbcode", "bbcode converter", "html to forum markup", "html bbcode converter"],
    ogTitle: "HTML to BBCode Converter - Convert HTML to Forum Markup | ToolZoneX",
    ogDescription: "Convert HTML markup into equivalent BBCode instantly.",
    schemaName: "HTML to BBCode Converter",
    schemaDescription: "Convert HTML markup into equivalent BBCode forum syntax instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Which HTML tags are supported?", answer: "<strong>/<b>, <em>/<i>, <u>, <s>/<strike>, <a>, <img>, <blockquote>, <ul>/<li>, inline color styles, and <code> all convert to their BBCode equivalents." }, { question: "Does this handle complex or deeply nested HTML?", answer: "Simple, common markup converts reliably, but complex HTML with extensive inline styles, classes, or deep nesting may not convert perfectly — check the BBCode output before posting it." }, { question: "Does this tool also convert BBCode back to HTML?", answer: "This page converts HTML to BBCode only. Use our separate BBCode to HTML converter if you need to go the opposite direction." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
