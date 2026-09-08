import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/quote-formatter",
    navName: "Quote Formatter",
    navDescription: "Format text as a blockquote, curly quotes, or attribution.",
    name: "Quote Formatter - Blockquote, Curly Quotes & Attribution",
    description: "Format text as a Markdown blockquote, wrap it in smart curly quotes, or format it with an attribution line in classic quote style.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FormatQuoteIcon fontSize="large" color="primary"/>,
    seoTitle: "Quote Formatter - Blockquote, Curly Quotes & Attribution",
    seoDescription: "Free online quote formatter. Format text as a Markdown blockquote, curly quotes, or a quote with attribution in one click.",
    keywords: ["quote formatter", "markdown blockquote generator", "curly quotes converter", "quote attribution generator", "smart quotes online"],
    ogTitle: "Quote Formatter - Blockquote, Curly Quotes & Attribution | ToolZoneX",
    ogDescription: "Format text as a Markdown blockquote, curly quotes, or a quote with attribution.",
    schemaName: "Quote Formatter",
    schemaDescription: "Format text as a Markdown blockquote, wrap it in smart curly quotes, or format it with an attribution line in classic quote style.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does Markdown Blockquote work on multi-line text?", answer: "Yes — every line, including blank lines, gets its own \"> \" prefix, which is the standard way to blockquote a multi-line passage in Markdown." }, { question: "What if I leave the author name blank in Attribution Format?", answer: "The output falls back to \"Unknown\" as the attribution so the format stays consistent even without a specified author." }, { question: "Does Smart / Curly Quotes convert quotation marks inside the text too?", answer: "No — it only wraps the entire block of text in a single pair of curly quotes; any straight quotes already inside your text are left as typed." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
