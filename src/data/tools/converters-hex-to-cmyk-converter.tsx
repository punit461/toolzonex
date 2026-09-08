import ColorLensIcon from '@mui/icons-material/ColorLens';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/hex-to-cmyk-converter",
    navName: "Hex to CMYK",
    navDescription: "Convert HEX colors to CMYK.",
    name: "Hex to CMYK Converter",
    description: "Convert HEX color codes to CMYK percentages instantly by decoding to RGB and applying the standard RGB to CMYK formula.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ColorLensIcon fontSize="large" color="primary"/>,
    seoTitle: "Hex to CMYK Converter - Free Online Color Tool",
    seoDescription: "Convert HEX color codes to CMYK percentages instantly with this free hex to cmyk converter. Get print-ready cyan, magenta, yellow, and black values.",
    keywords: ["hex to cmyk", "hex to cmyk converter", "hex to cmyk color converter", "convert hex to cmyk", "hex cmyk converter"],
    ogTitle: "Hex to CMYK Converter - Free Online Color Tool | ToolZoneX",
    ogDescription: "Convert HEX color codes to CMYK percentages instantly.",
    schemaName: "Hex to CMYK Converter",
    schemaDescription: "Convert HEX color codes to CMYK percentages instantly by decoding to RGB and applying the standard RGB to CMYK formula.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why isn't there a direct hex-to-CMYK formula?", answer: "Hex codes are just a compact way of writing RGB values in hexadecimal — they don't carry any separate CMYK information. Converting to CMYK always goes through RGB first, using the RGB-to-CMYK formula shown above." }, { question: "Will the printed color exactly match what I see on screen?", answer: "Not necessarily — RGB (screen, additive light) and CMYK (print, subtractive ink) are different color models covering different color ranges (gamuts), so the conversion is an approximation. Actual printed results also vary by printer, paper, and ink profile, so proofing a physical sample is recommended for color-critical print work." }, { question: "Does this tool support 3-character shorthand hex codes?", answer: "Yes — shorthand hex codes like #03F are automatically expanded to their full 6-character form (like #0033FF) before converting, so both formats work." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
