import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/bubble-text-generator",
    navName: "Bubble Text Generator",
    navDescription: "Hollow & filled circled Unicode bubble letters.",
    name: "Bubble Text Generator",
    description: "Convert text into hollow (ⓐⓑⓒ) or filled (🅰🅱🅲) circled Unicode bubble letters, with a one-click copy button.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <BubbleChartIcon fontSize="large" color="primary"/>,
    seoTitle: "Bubble Text Generator - Hollow & Filled Circled Letters",
    seoDescription: "Free bubble text generator. Convert your text into hollow circled letters (ⓐⓑⓒ) or filled bubble letters (🅰🅱🅲) and copy instantly.",
    keywords: ["bubble text generator", "circled text generator", "bubble letters generator", "circle text generator", "bubble font generator"],
    ogTitle: "Bubble Text Generator - Hollow & Filled Circled Letters | ToolZoneX",
    ogDescription: "Convert your text into hollow or filled circled Unicode bubble letters instantly.",
    schemaName: "Bubble Text Generator",
    schemaDescription: "Convert text into hollow (ⓐⓑⓒ) or filled (🅰🅱🅲) circled Unicode bubble letters, with a one-click copy button.",
    applicationCategory: "TextApplication",
    currency: undefined,
    faqs: [{ question: "Why do lowercase letters and numbers look hollow even in Filled mode?", answer: "Unicode only defines \"Negative Circled\" (filled) glyphs for the 26 uppercase Latin letters A-Z. There's no equivalent filled character for lowercase letters or digits, so this tool automatically falls back to the hollow circled version for any character without a filled equivalent." }, { question: "Will bubble text work everywhere I paste it?", answer: "In most modern apps and browsers, yes — these are standard Unicode characters. Some older systems, fonts, or apps with limited Unicode/emoji support may not render every glyph correctly, so it's worth previewing on the platform you plan to use it on." }, { question: "Is this the same as the site's Fancy Text Generator?", answer: "This tool is a focused, single-purpose bubble-letter generator with both hollow and filled styles side by side. Our Fancy Text Generator offers a broader set of Unicode text styles (Bold, Italic, Script, Fraktur, Double-Struck, Small Caps, and Circled) if you want more variety in one place." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
