import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-grid-generator",
    navName: "CSS Grid Generator",
    navDescription: "Visually generate CSS Grids.",
    name: "CSS Grid Generator",
    description: "Visually generate CSS Grid layouts. Define columns, rows, and gaps, and copy the CSS code instantly.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ChangeHistoryIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Grid Generator - Grid Layout Tool Online",
    seoDescription: "Visually generate CSS Grid layouts. Define columns, rows, and gaps, and copy the CSS code instantly.",
    keywords: ["css grid generator", "css grid", "grid playground", "css layout generator", "display grid"],
    ogTitle: "CSS Grid Generator - Grid Layout Tool Online | ToolZoneX",
    ogDescription: "Visually generate CSS Grid layouts. Define columns, rows, and gaps, and copy the CSS code instantly.",
    schemaName: "CSS Grid Generator",
    schemaDescription: "Visually generate CSS Grid layouts. Define columns, rows, and gaps, and copy the CSS code instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
