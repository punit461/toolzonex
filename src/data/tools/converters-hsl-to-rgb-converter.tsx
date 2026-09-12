import PaletteIcon from '@mui/icons-material/Palette';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/hsl-to-rgb-converter",
    navName: "HSL to RGB Converter",
    navDescription: "Convert HSL colors to RGB.",
    name: "HSL to RGB Converter",
    description: "Convert HSL (Hue, Saturation, Lightness) color values to RGB instantly, with sliders and a live color preview.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <PaletteIcon fontSize="large" color="primary"/>,
    seoTitle: "HSL to RGB Converter - Free Online Color Tool",
    seoDescription: "Convert HSL color values to RGB instantly with interactive sliders and a live color preview. Free hsl to rgb converter.",
    keywords: ["hsl to rgb", "hsl to rgb converter", "hsl to rgb color converter", "convert hsl to rgb", "color converter hsl to rgb"],
    ogTitle: "HSL to RGB Converter - Free Online Color Tool | ToolZoneX",
    ogDescription: "Convert HSL color values to RGB instantly.",
    schemaName: "HSL to RGB Converter",
    schemaDescription: "Convert HSL (Hue, Saturation, Lightness) color values to RGB instantly using the standard conversion formula.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why convert from HSL to RGB instead of just using HSL directly?", answer: "Most image formats, canvas APIs, and many older tools store and expect colors as RGB channels rather than HSL, so once you've dialed in a color's hue, saturation, and lightness, you often need the equivalent RGB values to plug into that system." }, { question: "Is the conversion exact, or does it round?", answer: "RGB channels are whole numbers from 0-255, while HSL is continuous, so converting HSL to RGB (and back) can introduce very small rounding differences. For typical design work these differences are imperceptible." }, { question: "Can I get the hex code too?", answer: "Yes — the resulting RGB values are also shown as a hex color code alongside a live preview swatch, so you can copy whichever format you need." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
