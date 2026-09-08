import PaletteIcon from '@mui/icons-material/Palette';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/color-palette-extractor-text",
    navName: "Color Palette Extractor (Text)",
    navDescription: "Extract every color value from pasted text or code.",
    name: "Color Palette Extractor (Text)",
    description: "Scan any pasted text or code for hex codes, rgb()/rgba(), and hsl()/hsla() color values, and see them as a deduplicated list with swatch previews.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <PaletteIcon fontSize="large" color="primary"/>,
    seoTitle: "Color Palette Extractor (Text) - Find All Colors in Code",
    seoDescription: "Free online color palette extractor. Paste CSS or any text and instantly find every hex, rgb, and hsl color value it contains.",
    keywords: ["color palette extractor", "extract colors from text", "extract colors from CSS", "find hex colors in text", "color scanner tool"],
    ogTitle: "Color Palette Extractor (Text) - Find All Colors in Code | ToolZoneX",
    ogDescription: "Paste text or code and instantly find every color value it contains.",
    schemaName: "Color Palette Extractor (Text)",
    schemaDescription: "Scan any pasted text or code for hex codes, rgb()/rgba(), and hsl()/hsla() color values, and see them as a deduplicated list with swatch previews.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Which color formats does it detect?", answer: "Hex codes (3, 4, 6, or 8 digits, with the leading #), rgb() and rgba() function calls, and hsl() and hsla() function calls — the most common formats used in CSS and design documents." }, { question: "Are duplicate colors removed?", answer: "Yes — if the same exact color value appears multiple times in the pasted text, it's only listed once in the results." }, { question: "Does it detect named CSS colors like \"red\" or \"cornflowerblue\"?", answer: "No — this tool specifically looks for hex, rgb/rgba, and hsl/hsla patterns using regular expressions, not plain color name words. Use the CSS Color Name Finder tool to work with named colors." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
