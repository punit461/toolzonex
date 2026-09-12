import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/box-shadow-generator",
    navName: "Box Shadow Generator",
    navDescription: "Create CSS drop shadows.",
    name: "Box Shadow Generator",
    description: "Generate beautiful CSS box shadows visually. Customize offset, blur, and spread, and copy the CSS code instantly.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ChangeHistoryIcon fontSize="large" color="primary"/>,
    seoTitle: "Box Shadow Generator - CSS Drop Shadow Tool",
    seoDescription: "Generate beautiful CSS box shadows visually. Customize offset, blur, and spread, and copy the CSS code instantly.",
    keywords: ["box shadow generator", "css drop shadow", "css shadow generator", "box-shadow", "css visualizer"],
    ogTitle: "Box Shadow Generator - CSS Drop Shadow Tool | ToolZoneX",
    ogDescription: "Generate beautiful CSS box shadows visually. Customize offset, blur, and spread, and copy the CSS code instantly.",
    schemaName: "Box Shadow Generator",
    schemaDescription: "Generate beautiful CSS box shadows visually. Customize offset, blur, and spread, and copy the CSS code instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
