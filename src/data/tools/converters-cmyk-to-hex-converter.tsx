import ColorLensIcon from '@mui/icons-material/ColorLens';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/cmyk-to-hex-converter",
    navName: "CMYK to HEX Converter",
    navDescription: "Convert CMYK colors to HEX.",
    name: "CMYK to HEX Converter",
    description: "Convert CMYK percentages directly to a HEX color code, via the standard CMYK to RGB to HEX conversion.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ColorLensIcon fontSize="large" color="primary"/>,
    seoTitle: "CMYK to HEX Converter - Free Online Color Tool",
    seoDescription: "Convert CMYK percentages directly to a HEX color code with this free cmyk to hex converter. Get a web-ready hex code from print CMYK ink percentages.",
    keywords: ["cmyk to hex", "cmyk to hex converter", "cmyk to hex color converter", "convert cmyk to hex", "cmyk hex converter", "cmyk to hex code"],
    ogTitle: "CMYK to HEX Converter - Free Online Color Tool | ToolZoneX",
    ogDescription: "Convert CMYK percentages directly to a HEX color code.",
    schemaName: "CMYK to HEX Converter",
    schemaDescription: "Convert CMYK percentages directly to a HEX color code using the standard CMYK to RGB to HEX conversion.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the CMYK to RGB Converter?", answer: "The CMYK to RGB Converter stops at RGB values (like rgb(34, 150, 242)) — useful when you need individual red, green, and blue numbers. This CMYK to HEX Converter takes that same conversion one step further and outputs a ready-to-use hex code (like #2296F2) instead, which is the format most needed for CSS, HTML, and web design work." }, { question: "Why might the on-screen hex color look different from the printed CMYK color?", answer: "CMYK printing depends on ink, paper stock, and printer or press calibration, none of which this formula accounts for. The conversion gives a mathematically consistent approximation, not a color-managed print preview, so always confirm important brand colors with a physical proof." }, { question: "What's the formula behind a CMYK to HEX conversion?", answer: "CMYK is first converted to RGB using R = 255×(1−C)×(1−K), G = 255×(1−M)×(1−K), and B = 255×(1−Y)×(1−K) (with C, M, Y, K as fractions of 1), then each RGB channel (0-255) is converted to a 2-digit hexadecimal number and joined with a # in front." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
