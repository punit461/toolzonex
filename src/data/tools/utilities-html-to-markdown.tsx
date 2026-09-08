import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/html-to-markdown",
    navName: "HTML to Markdown",
    navDescription: "Convert HTML to Markdown in real time.",
    name: "HTML to Markdown Converter",
    description: "Convert HTML to clean Markdown in real time. Handles headings, bold, italic, links, images, lists, code, and blockquotes.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "HTML to Markdown Converter - Real-Time Conversion",
    seoDescription: "Free HTML to Markdown converter. Paste HTML and get clean Markdown instantly — handles headings, bold, italic, links, images, lists, code, and blockquotes.",
    keywords: ["html to markdown", "html to md", "markdown converter", "convert html to markdown", "html to markdown converter", "html to md converter"],
    ogTitle: "HTML to Markdown Converter - Real-Time Conversion | ToolZoneX",
    ogDescription: "Convert HTML to clean Markdown in real time — handles headings, bold, italic, links, images, lists, code, and blockquotes.",
    schemaName: "HTML to Markdown Converter",
    schemaDescription: "Convert HTML to Markdown in real time, handling common structural tags.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this handle all HTML tags?", answer: "It handles the most common structural tags (headings, bold, italic, links, images, lists, code, blockquotes). Complex or custom HTML tags are stripped to their text content." }, { question: "Will the output be perfectly formatted?", answer: "For simple to moderately complex HTML, the output is clean and usable. For highly nested or complex HTML, you may need to manually adjust the Markdown formatting." }, { question: "Does it preserve images?", answer: "Yes — img tags with src and alt attributes are converted to ![alt](src) Markdown syntax." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
