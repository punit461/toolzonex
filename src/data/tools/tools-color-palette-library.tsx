import PaletteIcon from '@mui/icons-material/Palette';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/color-palette-library",
    navName: "Color Palette Library",
    navDescription: "Browse curated color palettes for inspiration.",
    name: "Color Palette Library",
    description: "Browse an expansive list of color palettes and find inspiration for your next project.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <PaletteIcon fontSize="large" color="primary"/>,
    seoTitle: "Color Palette Library - Curated Palettes",
    seoDescription: "Browse an expansive list of color palettes and find inspiration for your next design project.",
    keywords: ["color palette library", "color palette ideas", "curated color palettes", "design color inspiration", "color scheme examples"],
    ogTitle: "Color Palette Library - Curated Palettes | ToolZoneX",
    ogDescription: "Browse an expansive list of color palettes and find inspiration for your next project.",
    schemaName: "Color Palette Library",
    schemaDescription: "Browse a curated collection of color palettes filterable by style.",
    applicationCategory: "DesignApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
