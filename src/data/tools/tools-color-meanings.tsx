import PaletteIcon from '@mui/icons-material/Palette';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/color-meanings",
    navName: "Color Meanings",
    navDescription: "Browse colors and learn what they symbolize.",
    name: "Color Meanings",
    description: "Browse the list of colors and learn about the psychology and meaning behind each one.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <PaletteIcon fontSize="large" color="primary"/>,
    seoTitle: "Color Meanings - Color Psychology Guide",
    seoDescription: "Browse the list of colors and learn about color meanings and psychology for branding and design.",
    keywords: ["color meanings", "color psychology", "what colors mean", "color symbolism", "brand color guide"],
    ogTitle: "Color Meanings - Color Psychology Guide | ToolZoneX",
    ogDescription: "Browse the list of colors and learn about color meanings and psychology.",
    schemaName: "Color Meanings",
    schemaDescription: "Browse colors and learn about their meaning and psychology in branding and design.",
    applicationCategory: "DesignApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
