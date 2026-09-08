import PaletteIcon from '@mui/icons-material/Palette';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-color-palette-generator",
    navName: "Random Color Palette Generator",
    navDescription: "Generate a harmonious 5-color palette.",
    name: "Random Color Palette Generator",
    description: "Generate a harmonious 5-color palette using hue-rotation math around a random base color, with one-click hex code copying.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <PaletteIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Color Palette Generator - Harmonious Hex Colors",
    seoDescription: "Free random color palette generator. One click generates a harmonious 5-color palette using hue-rotation math, with copyable hex codes.",
    keywords: ["random color palette generator", "harmonious color palette generator", "color scheme generator", "random hex color palette", "generate color palette"],
    ogTitle: "Random Color Palette Generator - Harmonious Hex Colors | ToolZoneX",
    ogDescription: "Generate a harmonious 5-color palette with one click.",
    schemaName: "Random Color Palette Generator",
    schemaDescription: "Generate a harmonious 5-color palette using hue-rotation math around a random base color, with one-click hex code copying.",
    applicationCategory: "DesignApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the site's other Color Palette Generator?", answer: "This tool builds each palette from hue-rotation math around a single random base color, so the 5 colors are always visually related (analogous and complementary hues). Our other Color Palette Generator produces fully independent random hex colors and includes additional browsing/library features — use this one when you specifically want a quick, coherent, ready-to-use palette with one click." }, { question: "Can I lock a color and regenerate the rest?", answer: "This tool generates a fresh 5-color palette each time as a simple, single-click tool — use the copy button to save any colors you like before generating a new set." }, { question: "What is a complementary color?", answer: "Complementary colors sit opposite each other on the color wheel (180° apart), and pairing them typically creates strong visual contrast — which is why this generator includes a complementary pair alongside colors closer to the base hue for balance." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
