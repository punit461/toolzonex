import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/line-break-inserter",
    navName: "Line Break Inserter",
    navDescription: "Insert line breaks by character, word count, or <br>.",
    name: "Line Break Inserter",
    description: "Insert a line break every N characters (word-boundary-aware) or every N words, or convert every existing newline into an HTML <br> tag.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FormatLineSpacingIcon fontSize="large" color="primary"/>,
    seoTitle: "Line Break Inserter - Wrap Text or Convert to <br> Tags",
    seoDescription: "Free online line break inserter. Break text every N characters or words, or convert newlines into HTML <br> tags.",
    keywords: ["line break inserter", "insert line breaks online", "text wrap tool", "convert newline to br tag", "word wrap generator"],
    ogTitle: "Line Break Inserter - Wrap Text or Convert to <br> Tags | ToolZoneX",
    ogDescription: "Insert line breaks every N characters or words, or convert newlines into HTML <br> tags.",
    schemaName: "Line Break Inserter",
    schemaDescription: "Insert a line break every N characters (word-boundary-aware) or every N words, or convert every existing newline into an HTML <br> tag.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Will \"Every N Characters\" ever break in the middle of a word?", answer: "No — it looks for the nearest word boundary at or before the character limit, so a line may end up slightly shorter than N characters rather than splitting a word." }, { question: "What happens to existing line breaks in \"Every N Characters\" or \"Every N Words\" mode?", answer: "Those two modes treat the input as one continuous stream of words, so existing line breaks are effectively removed and replaced by the new break pattern." }, { question: "Does \"Newlines to <br>\" affect blank lines?", answer: "Yes — every newline character, including ones between blank lines, is followed by a <br> tag, matching how browsers render explicit line breaks in HTML." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
