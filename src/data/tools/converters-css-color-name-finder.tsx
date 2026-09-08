import ColorLensIcon from '@mui/icons-material/ColorLens';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/css-color-name-finder",
    navName: "CSS Color Name Finder",
    navDescription: "Find a CSS named color by name or hex code.",
    name: "CSS Color Name Finder",
    description: "Search the complete list of roughly 140 CSS3 named colors by name, or enter a hex code to find the exact or closest matching named color.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ColorLensIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Color Name Finder - Search Named CSS Colors",
    seoDescription: "Free online CSS color name finder. Search all ~140 CSS3 named colors by name, or enter a hex code to find the closest matching name.",
    keywords: ["CSS color name finder", "CSS named colors list", "hex to color name", "find CSS color name", "named colors CSS3"],
    ogTitle: "CSS Color Name Finder - Search Named CSS Colors | ToolZoneX",
    ogDescription: "Search all CSS3 named colors by name, or find the closest name for a hex code.",
    schemaName: "CSS Color Name Finder",
    schemaDescription: "Search the complete list of roughly 140 CSS3 named colors by name, or enter a hex code to find the exact or closest matching named color.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How many named colors does this cover?", answer: "The complete standard CSS3 extended color list — roughly 140 names, from aliceblue through yellowgreen, including near-duplicates like gray/grey pairs." }, { question: "What happens if I enter a hex code with no exact named match?", answer: "The tool calculates the color distance (in RGB space) between your hex code and every named color, and returns the single closest one, clearly labeled \"closest match\" rather than an exact one." }, { question: "Can I search by hex code without the \"#\" symbol?", answer: "Yes — the tool recognizes a 6-digit hex value whether or not it starts with a \"#\"." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
