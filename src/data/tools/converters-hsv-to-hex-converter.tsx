import ColorLensIcon from '@mui/icons-material/ColorLens';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/hsv-to-hex-converter",
    navName: "HSV to HEX Converter",
    navDescription: "Convert HSV colors to hex.",
    name: "HSV to HEX Converter",
    description: "Convert HSV (Hue, Saturation, Value) color values to a hex color code instantly, with sliders and a live color preview.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ColorLensIcon fontSize="large" color="primary"/>,
    seoTitle: "HSV to HEX Converter - Free Online Color Tool",
    seoDescription: "Convert HSV color values to a hex code instantly with interactive sliders and a live color preview. Free hsv to hex converter.",
    keywords: ["hsv to hex", "hsv to hex converter", "hsv to hex color converter", "convert hsv to hex", "color converter hsv to hex"],
    ogTitle: "HSV to HEX Converter - Free Online Color Tool | ToolZoneX",
    ogDescription: "Convert HSV color values to a hex code instantly.",
    schemaName: "HSV to HEX Converter",
    schemaDescription: "Convert HSV (Hue, Saturation, Value) color values to a hex color code instantly using the standard HSV-to-RGB conversion formula.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is HSV different from HSL?", answer: "Both use a hue angle plus two other components, but HSV's components are Saturation and Value (brightness relative to the brightest channel), while HSL uses Saturation and Lightness (where 50% lightness is the purest color and 100% is pure white). HSV maps more directly onto the color pickers found in many graphics editors." }, { question: "Why might the hex output not exactly match a color I saw elsewhere?", answer: "RGB channels are whole numbers from 0-255, while HSV values are continuous, so converting HSV to RGB (and then to hex) can introduce very small rounding differences — usually invisible to the eye but occasionally off by a shade of 1 in a channel." }, { question: "What happens at 0% Saturation or 0% Value?", answer: "At 0% Saturation, the Hue has no effect and the result is always a shade of gray (from black at 0% Value to white at 100% Value). At 0% Value, the result is always pure black regardless of Hue or Saturation." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
