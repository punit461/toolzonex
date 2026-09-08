import DataObjectIcon from '@mui/icons-material/DataObject';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/unicode-block-viewer",
    navName: "Unicode Block Viewer",
    navDescription: "Browse Unicode blocks and their code point ranges.",
    name: "Unicode Block Viewer",
    description: "Select from around 38 well-known Unicode blocks to see their exact code point range, description, and a generated sample grid of characters.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <DataObjectIcon fontSize="large" color="primary"/>,
    seoTitle: "Unicode Block Viewer - Browse Unicode Blocks & Ranges",
    seoDescription: "Free online Unicode block viewer. Browse ~38 well-known Unicode blocks with their code point ranges and a sample character grid.",
    keywords: ["Unicode block viewer", "Unicode ranges", "Unicode block list", "code point range lookup", "Unicode reference tool"],
    ogTitle: "Unicode Block Viewer - Browse Unicode Blocks & Ranges | ToolZoneX",
    ogDescription: "Browse well-known Unicode blocks with their code point ranges and sample characters.",
    schemaName: "Unicode Block Viewer",
    schemaDescription: "Select from around 38 well-known Unicode blocks to see their exact code point range, description, and a generated sample grid of characters.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Unicode Character Lookup?", answer: "Unicode Character Lookup is for looking up details about ONE specific character or code point you already have. This Unicode Block Viewer instead shows entire code point RANGES/BLOCKS of the Unicode standard — for structural reference and browsing an entire script or category at once, not a single character." }, { question: "Are all characters in large blocks shown?", answer: "No — for very large blocks like CJK Unified Ideographs, only the first 100 characters in the range are sampled, since displaying tens of thousands of characters at once wouldn't be practical." }, { question: "Where do the sample characters come from?", answer: "They're generated programmatically from each block's numeric code point range using JavaScript's String.fromCodePoint, not a hand-typed list — so the sample accurately reflects the real Unicode range." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
