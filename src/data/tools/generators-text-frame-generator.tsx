import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/text-frame-generator",
    navName: "Text Frame Generator",
    navDescription: "Wrap text in a decorative border or box.",
    name: "Text Frame Generator - Decorative Text Borders",
    description: "Wrap single or multi-line text in a properly padded and aligned decorative border, choosing from single-line, double-line, asterisk, or hash box styles.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <AspectRatioIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Frame Generator - Decorative Text Borders & Boxes",
    seoDescription: "Free online text frame generator. Wrap your text in a decorative border using single-line, double-line, asterisk, or hash styles.",
    keywords: ["text frame generator", "text box generator", "text border generator", "ascii box generator", "copy paste text frame"],
    ogTitle: "Text Frame Generator - Decorative Text Borders & Boxes | ToolZoneX",
    ogDescription: "Wrap text in a decorative, properly aligned border using single-line, double-line, asterisk, or hash styles.",
    schemaName: "Text Frame Generator",
    schemaDescription: "Wrap single or multi-line text in a properly padded and aligned decorative border, choosing from single-line, double-line, asterisk, or hash box styles.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Can I frame multiple lines at once?", answer: "Yes — enter as many lines as you like; every line is padded to match the width of the longest line so the border stays perfectly aligned." }, { question: "Will the border display correctly everywhere?", answer: "It requires a monospace font that preserves spacing exactly, such as a code block, plain text editor, or terminal — rich-text editors that use a proportional font may misalign it." }, { question: "What is the difference between this and a \"text box\" generator?", answer: "They describe the same idea — this tool covers both, wrapping your text in a padded, aligned decorative border regardless of whether you call it a frame or a box." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
