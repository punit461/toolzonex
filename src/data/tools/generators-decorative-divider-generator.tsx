import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/decorative-divider-generator",
    navName: "Decorative Divider Generator",
    navDescription: "Build a styled text section divider.",
    name: "Decorative Divider Generator - Styled Section Breaks",
    description: "Generate a decorative text divider from preset styles like solid blocks, dots, tildes, double lines, or dashes, with a configurable repeat count and optional center ornament.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <HorizontalRuleIcon fontSize="large" color="primary"/>,
    seoTitle: "Decorative Divider Generator - Styled Text Section Breaks",
    seoDescription: "Free online decorative divider generator. Build a styled text section break from preset patterns with a configurable length and center ornament.",
    keywords: ["decorative divider generator", "text divider generator", "section break generator", "fancy line separator", "copy paste text divider"],
    ogTitle: "Decorative Divider Generator - Styled Text Section Breaks | ToolZoneX",
    ogDescription: "Build a styled text divider from preset patterns with a configurable length and optional center ornament.",
    schemaName: "Decorative Divider Generator",
    schemaDescription: "Generate a decorative text divider from preset styles like solid blocks, dots, tildes, double lines, or dashes, with a configurable repeat count and optional center ornament.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What does the repeat count control?", answer: "It sets how many times the chosen style's unit is repeated, which determines the overall length of the divider — a higher count produces a longer line." }, { question: "What happens if I add a center ornament?", answer: "The ornament character is inserted at the midpoint of the repeated divider, giving the line a focal point without changing its overall style." }, { question: "Can I use more than one character as the ornament?", answer: "Yes, up to 5 characters, though a single symbol like ✦ or ❖ usually looks cleanest centered in a divider." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
