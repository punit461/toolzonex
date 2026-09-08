import PaletteIcon from '@mui/icons-material/Palette';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/hex-color-generator",
    navName: "Hex Color Generator",
    navDescription: "Generate random hex color palettes.",
    name: "Hex Color Generator",
    description: "Instantly generate a palette of 5 random hex colors with one-click copy for each. Free online hex color generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <PaletteIcon fontSize="large" color="primary"/>,
    seoTitle: "Hex Color Generator - Random Hex Color Palette Online",
    seoDescription: "Free online hex color generator. Instantly generate a palette of 5 random hex colors, each with its own swatch and one-click copy button.",
    keywords: ["hex color generator", "random hex color", "hex color palette generator", "random color generator", "generate hex code"],
    ogTitle: "Hex Color Generator - Random Hex Color Palette Online | ToolZoneX",
    ogDescription: "Instantly generate a palette of 5 random hex colors.",
    schemaName: "Hex Color Generator",
    schemaDescription: "Instantly generate a palette of 5 random hex colors with one-click copy.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from a general random color generator?", answer: "This tool is focused purely on the hex format and generates a palette of 5 colors at once, framed as a quick dev-tool utility for grabbing placeholder colors rather than a single-color randomizer." }, { question: "Are the colors truly random?", answer: "Yes — each channel is chosen uniformly at random across the full 24-bit RGB color space (0 to 16,777,215), giving every hex value an equal chance of appearing." }, { question: "Can I get the same color twice in one palette?", answer: "It's possible but extremely unlikely, since each color is picked independently from over 16 million possible values." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
