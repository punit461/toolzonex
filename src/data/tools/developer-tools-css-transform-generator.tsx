import TuneIcon from '@mui/icons-material/Tune';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-transform-generator",
    navName: "CSS Transform Generator",
    navDescription: "Visually build a CSS transform declaration.",
    name: "CSS Transform Generator",
    description: "Visually build a CSS transform declaration with translate, rotate, scale, and skew controls, plus a live preview and transform-origin picker.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <TuneIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Transform Generator - Visual Transform Builder",
    seoDescription: "Visually build a CSS transform declaration with translate, rotate, scale, and skew controls, plus a live preview. Free online CSS tool.",
    keywords: ["css transform generator", "css transform builder", "css rotate generator", "css scale generator", "transform origin generator"],
    ogTitle: "CSS Transform Generator - Visual Transform Builder | ToolZoneX",
    ogDescription: "Visually build a CSS transform declaration with translate, rotate, scale, and skew controls.",
    schemaName: "CSS Transform Generator",
    schemaDescription: "Visually build a CSS transform declaration with translate, rotate, scale, and skew controls, plus a live preview and transform-origin picker.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What does transform-origin actually change?", answer: "It sets the fixed point that rotation and scaling pivot around — the default is the center of the element, but setting it to \"top left\" for example makes the element rotate and scale around its top-left corner instead." }, { question: "Can I combine multiple transforms at once?", answer: "Yes — this tool always outputs all six transform functions together in one declaration, so translate, rotate, scale, and skew all apply simultaneously, matching how the CSS transform property actually works." }, { question: "Will this work in all browsers?", answer: "The CSS transform property is supported in all modern browsers, though very old browsers may need vendor prefixes like -webkit-transform for full compatibility." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
