import ColorLensIcon from '@mui/icons-material/ColorLens';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/color-wheel",
    navName: "Color Wheel",
    navDescription: "Generate complementary, triadic & other color harmonies.",
    name: "Color Wheel",
    description: "Pick a base color and generate complementary, analogous, triadic, and other color harmonies instantly.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <ColorLensIcon fontSize="large" color="primary"/>,
    seoTitle: "Color Wheel - Generate Color Harmonies",
    seoDescription: "Easily generate a custom color palette with our interactive color wheel. Explore complementary, analogous, triadic and other harmonies.",
    keywords: ["color wheel", "color harmony generator", "complementary colors", "triadic colors", "analogous colors"],
    ogTitle: "Color Wheel - Generate Color Harmonies | ToolZoneX",
    ogDescription: "Easily generate a custom color palette with our interactive color wheel.",
    schemaName: "Color Wheel",
    schemaDescription: "Generate complementary, analogous, and other color harmonies from a base color.",
    applicationCategory: "DesignApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
