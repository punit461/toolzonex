import PaletteIcon from '@mui/icons-material/Palette';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/rgb-to-cmyk-converter",
    navName: "RGB to CMYK",
    navDescription: "Convert RGB colors to CMYK.",
    name: "RGB to CMYK Converter",
    description: "Convert RGB color values to CMYK percentages instantly using the standard RGB to CMYK formula.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <PaletteIcon fontSize="large" color="primary"/>,
    seoTitle: "RGB to CMYK Converter - Free Online Color Tool",
    seoDescription: "Convert RGB color values (0-255) to CMYK percentages instantly with this free rgb to cmyk converter. Get accurate print-ready cyan, magenta, yellow, and black values.",
    keywords: ["rgb to cmyk", "rgb to cmyk converter", "rgb to cmyk color converter", "convert rgb to cmyk", "rgb cmyk converter", "color converter rgb to cmyk", "rgb to cmyk formula"],
    ogTitle: "RGB to CMYK Converter - Free Online Color Tool | ToolZoneX",
    ogDescription: "Convert RGB color values to CMYK percentages instantly.",
    schemaName: "RGB to CMYK Converter",
    schemaDescription: "Convert RGB color values to CMYK percentages instantly using the standard RGB to CMYK formula.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why does RGB to CMYK need a formula instead of a direct table?", answer: "RGB and CMYK represent color using entirely different models — additive light versus subtractive ink — so there's no one-to-one mapping. The formula approximates the closest CMYK values, though actual printed colors can vary by printer and ink profile." }, { question: "What's the formula used for RGB to CMYK conversion?", answer: "K = 1 − max(R', G', B'), where R', G', B' are the RGB values divided by 255. Then C = (1 − R' − K) / (1 − K), M = (1 − G' − K) / (1 − K), and Y = (1 − B' − K) / (1 − K), each expressed as a percentage." }, { question: "Does this tool also convert CMYK back to RGB?", answer: "This page converts RGB to CMYK only. Use our separate CMYK to RGB converter if you need to go the opposite direction." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
