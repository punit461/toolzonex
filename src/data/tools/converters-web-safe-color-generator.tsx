import GridOnIcon from '@mui/icons-material/GridOn';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/web-safe-color-generator",
    navName: "Web Safe Color Generator",
    navDescription: "Browse the classic 216-color web-safe palette.",
    name: "Web Safe Color Generator",
    description: "Browse all 216 classic web-safe colors as clickable swatches, with each hex code shown and copied to your clipboard on click.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <GridOnIcon fontSize="large" color="primary"/>,
    seoTitle: "Web Safe Color Generator - Browse the 216 Web Safe Colors",
    seoDescription: "Free online web safe color generator. Browse and copy hex codes from the classic 216-color web-safe palette.",
    keywords: ["web safe color generator", "216 web safe colors", "web safe color palette", "legacy web colors", "web safe hex codes"],
    ogTitle: "Web Safe Color Generator - Browse the 216 Web Safe Colors | ToolZoneX",
    ogDescription: "Browse and copy hex codes from the classic 216-color web-safe palette.",
    schemaName: "Web Safe Color Generator",
    schemaDescription: "Browse all 216 classic web-safe colors as clickable swatches, with each hex code shown and copied to your clipboard on click.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is the web-safe palette still relevant today?", answer: "Not really for practical design purposes — it was created to solve a display limitation from older 256-color monitors that essentially no longer exist. Modern screens display millions of colors accurately, so this palette is now mostly a historical curiosity, though it does still show up in retro-styled design work." }, { question: "Why exactly 216 colors?", answer: "Six possible values per channel (00, 33, 66, 99, CC, FF) across three channels gives 6 × 6 × 6 = 216 combinations, which is why the web-safe palette has exactly that many colors." }, { question: "Does clicking a swatch copy the color automatically?", answer: "Yes — clicking any swatch both displays its hex code and copies it straight to your clipboard, ready to paste elsewhere." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
