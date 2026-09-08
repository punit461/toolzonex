import GradientIcon from '@mui/icons-material/Gradient';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/gradient-library",
    navName: "Gradient Library",
    navDescription: "Browse curated, ready-to-use CSS gradients.",
    name: "Gradient Library",
    description: "Find the perfect gradient for your project from a curated, filterable collection.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <GradientIcon fontSize="large" color="primary"/>,
    seoTitle: "Gradient Library - Curated CSS Gradients",
    seoDescription: "Find the perfect gradient for your project from a curated, filterable collection of ready-to-use CSS gradients.",
    keywords: ["gradient library", "css gradients", "gradient examples", "gradient presets", "background gradient ideas"],
    ogTitle: "Gradient Library - Curated CSS Gradients | ToolZoneX",
    ogDescription: "Find the perfect gradient for your project from a curated, filterable collection.",
    schemaName: "Gradient Library",
    schemaDescription: "Browse a curated collection of ready-to-use CSS gradients.",
    applicationCategory: "DesignApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
