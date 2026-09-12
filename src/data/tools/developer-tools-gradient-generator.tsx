import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/gradient-generator",
    navName: "Gradient Generator",
    navDescription: "Generate CSS linear gradients.",
    name: "Gradient Generator",
    description: "Create beautiful CSS linear gradients visually. Pick colors, adjust angles, and copy the CSS background code instantly.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ChangeHistoryIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Gradient Generator - Beautiful Linear Gradients",
    seoDescription: "Create beautiful CSS linear gradients visually. Pick colors, adjust angles, and copy the CSS background code instantly.",
    keywords: ["css gradient generator", "linear gradient", "gradient maker", "css background", "color gradient"],
    ogTitle: "CSS Gradient Generator - Beautiful Linear Gradients | ToolZoneX",
    ogDescription: "Create beautiful CSS linear gradients visually. Pick colors, adjust angles, and copy the CSS background code instantly.",
    schemaName: "CSS Gradient Generator",
    schemaDescription: "Create beautiful CSS linear gradients visually. Pick colors, adjust angles, and copy the CSS background code instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
