import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/bbcode-to-html",
    navName: "BBCode to HTML",
    navDescription: "Convert BBCode markup to HTML.",
    name: "BBCode to HTML Converter",
    description: "Convert BBCode forum markup into equivalent HTML instantly.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "BBCode to HTML Converter - Convert Forum Markup Online",
    seoDescription: "Free BBCode to HTML converter. Paste BBCode markup like [b], [i], [url], and [quote] tags and convert it to equivalent HTML instantly.",
    keywords: ["bbcode to html", "bbcode to html converter", "convert bbcode to html", "bbcode converter", "bbcode parser", "bbcode html converter"],
    ogTitle: "BBCode to HTML Converter - Convert Forum Markup Online | ToolZoneX",
    ogDescription: "Convert BBCode forum markup into equivalent HTML instantly.",
    schemaName: "BBCode to HTML Converter",
    schemaDescription: "Convert BBCode forum markup into equivalent HTML instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Which BBCode tags are supported?", answer: "[b], [i], [u], [s], [url], [img], [quote], [list] with [*] items, [color], [size], and [code] are all converted to their HTML equivalents." }, { question: "Does this handle nested tags?", answer: "Simple nesting such as bold text inside a quote generally works, but deeply nested or malformed BBCode may not convert perfectly — check the output before publishing it." }, { question: "Does this tool also convert HTML back to BBCode?", answer: "This page converts BBCode to HTML only. Use our separate HTML to BBCode converter if you need to go the opposite direction." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
