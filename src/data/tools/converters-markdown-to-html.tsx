import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/markdown-to-html",
    navName: "Markdown to HTML",
    navDescription: "Convert MD to raw HTML.",
    name: "Markdown to HTML Converter",
    description: "Convert Markdown to raw HTML instantly. Free online parser with live web preview.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "Markdown to HTML Converter - Convert MD to HTML Online",
    seoDescription: "Convert Markdown to raw HTML instantly, online and free. Live web preview included -- no install needed.",
    keywords: ["markdown to html", "markdown converter", "parse markdown", "md to html", "online markdown editor", "convert md to html online", "markdown to html online", "markdown to html converter online"],
    ogTitle: "Markdown to HTML Converter - Convert MD to HTML Online | ToolZoneX",
    ogDescription: "Convert Markdown to raw HTML instantly, online and free.",
    schemaName: "Markdown to HTML Converter",
    schemaDescription: "Convert Markdown to raw HTML instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this support GitHub-flavored Markdown extras like tables?", answer: "It covers the core Markdown syntax (headings, bold/italic, links, lists, code) — extended syntax such as tables or task lists may not be converted." }, { question: "Is this markdown to html converter online free to use?", answer: "Yes — it's completely free, requires no sign-up, and runs entirely in your browser, so nothing you type is uploaded to a server." }, { question: "Can I convert md to html online without installing anything?", answer: "Yes — just paste or type your Markdown into the input box and click Convert to HTML. There's nothing to install; it works directly in this page." }, { question: "Can I preview how the HTML will look before copying it?", answer: "Yes — after converting, a live preview panel renders the generated HTML below the input and output boxes so you can check the formatting before you copy it." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
