import ColorLensIcon from '@mui/icons-material/ColorLens';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/hex-to-hsv-converter",
    navName: "HEX to HSV Converter",
    navDescription: "Convert hex colors to HSV.",
    name: "HEX to HSV Converter",
    description: "Convert a hex color code to HSV (Hue, Saturation, Value) instantly, with a live color preview.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ColorLensIcon fontSize="large" color="primary"/>,
    seoTitle: "HEX to HSV Converter - Free Online Color Tool",
    seoDescription: "Convert hex color codes to HSV instantly with a color picker and live preview. Free hex to hsv converter.",
    keywords: ["hex to hsv", "hex to hsv converter", "hex to hsv color converter", "convert hex to hsv", "color converter hex to hsv"],
    ogTitle: "HEX to HSV Converter - Free Online Color Tool | ToolZoneX",
    ogDescription: "Convert hex color codes to HSV instantly.",
    schemaName: "HEX to HSV Converter",
    schemaDescription: "Convert a hex color code to HSV (Hue, Saturation, Value) instantly using the standard RGB-to-HSV conversion formula.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is HSV different from HSL?", answer: "Both describe color using a hue angle plus two other components, but HSV's second and third components are Saturation and Value (brightness relative to the brightest channel), while HSL uses Saturation and Lightness (where 50% lightness is the purest color and 100% is always white). HSV maps more directly onto how color pickers in graphics software like Photoshop typically work." }, { question: "Why does the Value stay high even for dark-looking colors?", answer: "Value in HSV only measures the brightest of the three RGB channels, not overall perceived brightness — a fully saturated dark red can still have a high Value because its red channel is high, even though the color looks dark overall due to low green and blue." }, { question: "Can I use the color picker instead of typing a hex code?", answer: "Yes — the native color picker lets you visually choose a color, and the hex input and HSV output update automatically to match your selection." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
