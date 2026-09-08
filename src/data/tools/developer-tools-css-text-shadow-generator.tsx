import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-text-shadow-generator",
    navName: "CSS Text Shadow Generator",
    navDescription: "Build CSS text-shadow effects visually.",
    name: "CSS Text Shadow Generator",
    description: "Adjust offset, blur, and color sliders to build a CSS text-shadow value with a live preview. Free online CSS text shadow generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <FormatColorTextIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Text Shadow Generator - Free Online Text Shadow Maker",
    seoDescription: "Free online CSS text-shadow generator. Adjust offset, blur radius, and color sliders with a live preview on sample text and one-click copy.",
    keywords: ["css text shadow generator", "text-shadow css generator", "css text shadow maker", "text glow css generator", "css shadow effect"],
    ogTitle: "CSS Text Shadow Generator - Free Online Text Shadow Maker | ToolZoneX",
    ogDescription: "Build a CSS text-shadow value visually with a live preview.",
    schemaName: "CSS Text Shadow Generator",
    schemaDescription: "Adjust offset, blur, and color sliders to build a CSS text-shadow value with a live preview.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Can I stack multiple text shadows?", answer: "Yes — text-shadow accepts a comma-separated list of shadow definitions, which is how effects like a solid outline or neon glow are typically built. This generator produces one shadow layer at a time, which you can duplicate and combine manually." }, { question: "How do I make a glow effect instead of a drop shadow?", answer: "Set offset-x and offset-y both to 0 and increase the blur radius with a bright or saturated color — this spreads the shadow evenly around the text instead of offsetting it." }, { question: "Is my data uploaded anywhere?", answer: "No — the CSS is generated and previewed entirely client-side in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
