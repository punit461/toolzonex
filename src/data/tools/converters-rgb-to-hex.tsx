import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/rgb-to-hex",
    navName: "RGB to HEX",
    navDescription: "Convert RGB colors to HEX.",
    name: "RGB to HEX Converter",
    description: "Convert RGB and RGBA color codes to HEX format instantly. Free online color conversion tool with interactive sliders.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ChangeHistoryIcon fontSize="large" color="primary"/>,
    seoTitle: "RGB to HEX Converter - Free Online Color Tool",
    seoDescription: "Convert RGB and RGBA color codes to HEX format instantly with interactive sliders. Free rgb to hex converter — get the hex code for any RGB color value in one click.",
    keywords: ["rgb to hex", "rgb converter", "rgba to hex", "hex generator", "color code converter", "conversion rgb hex", "rgb converter hex", "rgb color from hex", "color code to rgb value", "rgb hex", "to rgb", "rgb to hex converter", "rgb to hex color", "rgb value to hex code"],
    ogTitle: "RGB to HEX Converter - Free Online Color Tool | ToolZoneX",
    ogDescription: "Convert RGB and RGBA color codes to HEX format instantly.",
    schemaName: "RGB to HEX Converter",
    schemaDescription: "Convert RGB and RGBA color codes to HEX format instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why do web developers use HEX instead of RGB?", answer: "HEX codes are more compact and are the standard format for colors in HTML and CSS stylesheets, though both represent the same color values." }, { question: "How do I convert RGB to a HEX color code?", answer: "Move the R, G, and B sliders (or type exact 0-255 values) above and the equivalent HEX code is generated instantly, with a one-click copy button — no manual conversion rgb hex math required." }, { question: "I searched for a color code to RGB value — is this the right tool?", answer: "If you already have RGB numbers and want the HEX code, yes — this rgb to hex converter does exactly that. If you have a hex code and want the RGB value instead, use our HEX to RGB converter, which converts in the opposite direction." }, { question: "Does this tool convert RGBA (with transparency) to HEX?", answer: "Yes — adjust the alpha (opacity) slider along with R, G, and B, and the tool appends the alpha channel as an extra two hex digits, producing an 8-character HEX8 code." }, { question: "What's the formula behind an RGB to HEX conversion?", answer: "Each of the R, G, and B values (0-255) is converted individually to a 2-digit base-16 (hexadecimal) number, then the three pairs are joined with a # in front. For example, RGB(255, 87, 51) becomes #FF5733." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
