import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/fancy-text-generator",
    navName: "Fancy Text Generator",
    navDescription: "Bold, script, fraktur & other styled Unicode text.",
    name: "Fancy Text Generator",
    description: "Turn plain text into fancy Unicode text styles — Bold, Italic, Script, Fraktur, Double-Struck, Small Caps, and Circled — each ready to copy and paste.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <AutoAwesomeIcon fontSize="large" color="primary"/>,
    seoTitle: "Fancy Text Generator - Stylish Unicode Text Fonts",
    seoDescription: "Free fancy text generator. Turn plain text into Bold, Italic, Script, Fraktur, Double-Struck, Small Caps, and Circled Unicode text styles for bios and social media.",
    keywords: ["fancy text generator", "stylish text generator", "unicode text generator", "cool font generator", "bold text generator", "small caps generator", "circled text generator", "bubble text generator"],
    ogTitle: "Fancy Text Generator - Stylish Unicode Text Fonts | ToolZoneX",
    ogDescription: "Turn plain text into Bold, Italic, Script, Fraktur, Double-Struck, Small Caps, and Circled Unicode text styles.",
    schemaName: "Fancy Text Generator",
    schemaDescription: "Turn plain text into multiple fancy Unicode text styles, each ready to copy and paste.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Will this fancy text work everywhere I paste it?", answer: "In most modern apps and browsers, yes — since these are standard Unicode characters. Some older systems, certain fonts, or platforms with limited Unicode support may show missing-character boxes instead of the styled glyphs, so it's worth previewing on the platform you plan to use it on." }, { question: "Is this the same as real bold or italic formatting?", answer: "No — real bold/italic formatting (like in a word processor) uses styling metadata on regular letters, while this tool substitutes entirely different Unicode characters that only look bold or italic. Screen readers and search engines generally don't recognize these characters as actual bold or italic text, and some may not read them correctly at all, so avoid using them for important accessible content." }, { question: "Why do some Small Caps letters look like normal lowercase letters?", answer: "Unicode doesn't define a true small-capital character for every letter of the alphabet. Where no dedicated small-caps character exists (such as \"x\"), the regular lowercase letter is used instead as the closest available fallback." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
