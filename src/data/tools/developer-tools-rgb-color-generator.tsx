import ColorLensIcon from '@mui/icons-material/ColorLens';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/rgb-color-generator",
    navName: "RGB Color Generator",
    navDescription: "Generate random RGB color palettes.",
    name: "RGB Color Generator",
    description: "Instantly generate a palette of 5 random rgb() colors with one-click copy for each. Free online RGB color generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ColorLensIcon fontSize="large" color="primary"/>,
    seoTitle: "RGB Color Generator - Random RGB Color Palette Online",
    seoDescription: "Free online RGB color generator. Instantly generate a palette of 5 random rgb(r, g, b) colors, each with its own swatch and one-click copy button.",
    keywords: ["rgb color generator", "random rgb color", "rgb color palette generator", "rgb code generator", "generate rgb color"],
    ogTitle: "RGB Color Generator - Random RGB Color Palette Online | ToolZoneX",
    ogDescription: "Instantly generate a palette of 5 random RGB colors.",
    schemaName: "RGB Color Generator",
    schemaDescription: "Instantly generate a palette of 5 random rgb() colors with one-click copy.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from a general random color generator?", answer: "This tool focuses purely on the rgb() CSS function format and generates a palette of 5 colors at once, framed as a dev-tool utility for grabbing ready-to-paste values quickly." }, { question: "Why use RGB instead of hex?", answer: "RGB syntax is handy when you need to layer transparency with rgba(), or when working in contexts (like some canvas or animation code) that expect separate red, green, and blue channel values." }, { question: "Are the colors truly random?", answer: "Yes — each of the red, green, and blue channels is chosen independently and uniformly from 0 to 255." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
