import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/hex-to-rgb",
    navName: "HEX to RGB",
    navDescription: "Convert HEX colors to RGB.",
    name: "HEX to RGB Converter",
    description: "Convert HEX color codes to RGB or RGBA formats instantly. Free online color conversion tool for web developers.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ChangeHistoryIcon fontSize="large" color="primary"/>,
    seoTitle: "HEX to RGB Converter - Free Online Color Tool",
    seoDescription: "Convert HEX color codes to RGB or RGBA instantly with this free hex to rgb color converter. Paste any hexadecimal color code — 3, 6, or 8 characters — to get RGB and sRGB values for web developers and designers.",
    keywords: ["hex to rgb", "hex converter", "color code converter", "rgb generator", "hex to rgba", "hex to rgb color", "hex code to rgb", "rgb hex", "hex to rgb color converter", "hex naar rgb", "color converter hex to rgb", "convert hexa to rgb", "convert hex color to rgb", "hexadecimal color to rgb", "hex colour to rgb", "hex into rgb", "hex to srgb", "hexadecimal color code to rgb", "hex code for rgb color"],
    ogTitle: "HEX to RGB Converter - Free Online Color Tool | ToolZoneX",
    ogDescription: "Convert HEX color codes to RGB or RGBA formats instantly.",
    schemaName: "HEX to RGB Converter",
    schemaDescription: "Convert HEX color codes to RGB or RGBA formats instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why would I use RGB instead of HEX?", answer: "RGB(A) lets you specify transparency directly, which plain HEX codes can't do without an extra alpha value (HEX8)." }, { question: "How do I convert a HEX color code to RGB?", answer: "Type or paste the HEX code (with or without the leading #) into the field above — the RGB and RGBA values are calculated and shown instantly, with one-click copy buttons for each." }, { question: "Is hex to RGB the same as hex to sRGB?", answer: "Yes. On the web, \"RGB\" almost always means sRGB — the standard color space used by CSS, HTML, and most displays — so converting a hex code to RGB and converting it to sRGB give you identical numbers." }, { question: "Does this tool work for \"hex naar rgb\" or other non-English searches?", answer: "Yes — hex color codes and RGB values are the same everywhere, so whether you search hex naar rgb (Dutch), hex colour to rgb (UK spelling), or hexadecimal color code to rgb, you just paste the hex code and get the same RGB output. No translation needed." }, { question: "Does it support 3-character shorthand or 8-character hex codes with alpha?", answer: "Yes — it accepts 3-character shorthand hex (e.g. #03F), standard 6-character hex (e.g. #0033FF), and 8-character hex with an alpha channel (e.g. #0033FFCC), automatically expanding shorthand codes before converting." }, { question: "What's the difference between the RGB and RGBA output?", answer: "RGB gives the red, green, and blue channel values only. RGBA adds a fourth alpha value for opacity, taken from an 8-character hex code if one is entered — useful when you need a color code for RGB with transparency in CSS." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
