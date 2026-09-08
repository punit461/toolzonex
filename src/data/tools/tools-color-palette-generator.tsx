import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/color-palette-generator",
    navName: "Color Palette Generator",
    navDescription: "Generate beautiful random colors.",
    name: "Color Palette Generator - Random Hex Colors",
    description: "Generate beautiful random color palettes for web design and art. One click to copy hex codes.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <ChangeHistoryIcon fontSize="large" color="primary"/>,
    seoTitle: "Color Palette Generator - Random Hex Colors",
    seoDescription: "Generate beautiful random color palettes for web design and art. One click to copy hex codes.",
    keywords: ["color palette generator", "random colors", "hex code generator", "color scheme generator", "website colors"],
    ogTitle: "Color Palette Generator - Random Hex Colors | ToolZoneX",
    ogDescription: "Generate beautiful random color palettes for web design and art. One click to copy hex codes.",
    schemaName: "Color Palette Generator",
    schemaDescription: "Generate beautiful random color palettes for web design and art.",
    applicationCategory: "DesignApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
