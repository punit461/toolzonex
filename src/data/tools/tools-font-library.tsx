import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/font-library",
    navName: "Font Library",
    navDescription: "Find the perfect font for your next design project.",
    name: "Font Library",
    description: "Find the perfect font for your next design project from a searchable Google Fonts library.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Font Library - Browse & Preview Google Fonts",
    seoDescription: "Find the perfect font for your next design project. Search, filter, and preview a curated library of Google Fonts.",
    keywords: ["font library", "google fonts browser", "font preview tool", "typeface finder", "font pairing"],
    ogTitle: "Font Library - Browse & Preview Google Fonts | ToolZoneX",
    ogDescription: "Find the perfect font for your next design project.",
    schemaName: "Font Library",
    schemaDescription: "Search, filter, and preview a curated library of Google Fonts.",
    applicationCategory: "DesignApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
