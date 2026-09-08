import PaletteIcon from '@mui/icons-material/Palette';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/rgb-to-hsl-converter",
    navName: "RGB to HSL Converter",
    navDescription: "Convert RGB colors to HSL.",
    name: "RGB to HSL Converter",
    description: "Convert RGB color values to HSL (Hue, Saturation, Lightness) instantly, with a color picker and live preview.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <PaletteIcon fontSize="large" color="primary"/>,
    seoTitle: "RGB to HSL Converter - Free Online Color Tool",
    seoDescription: "Convert RGB color values to HSL instantly with interactive sliders and a color picker. Free rgb to hsl converter with a live color preview.",
    keywords: ["rgb to hsl", "rgb to hsl converter", "rgb to hsl color converter", "convert rgb to hsl", "color converter rgb to hsl", "hsl color picker"],
    ogTitle: "RGB to HSL Converter - Free Online Color Tool | ToolZoneX",
    ogDescription: "Convert RGB color values to HSL instantly.",
    schemaName: "RGB to HSL Converter",
    schemaDescription: "Convert RGB color values to HSL (Hue, Saturation, Lightness) instantly using the standard conversion formula.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why use HSL instead of RGB in CSS?", answer: "HSL separates a color's hue from its intensity and brightness, making it much easier to create variations of the same color (like a lighter or more muted version) by adjusting just one value, instead of recalculating all three RGB channels." }, { question: "What do the H, S, and L values mean?", answer: "Hue (H) is the color's position on a 360° color wheel (0° = red, 120° = green, 240° = blue). Saturation (S) is how vivid versus gray the color is, from 0% (gray) to 100% (fully saturated). Lightness (L) is how light or dark it is, from 0% (black) to 100% (white), with 50% being the purest version of the hue." }, { question: "Can I use the color picker instead of entering RGB numbers?", answer: "Yes — the native color picker lets you visually choose a color, and the R, G, B sliders and HSL output update automatically to match your selection." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
