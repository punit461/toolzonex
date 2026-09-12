import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/flip-text",
    navName: "Flip Text",
    navDescription: "Flip text upside down or reverse it.",
    name: "Flip Text Generator - Upside Down Text Online",
    description: "Flip text upside down using Unicode characters or reverse it character by character. Copy and paste the result into social media, messages, and more.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <SwapHorizIcon fontSize="large" color="primary"/>,
    seoTitle: "Flip Text Generator - Upside Down Text Online",
    seoDescription: "Free online flip text generator. Create upside-down text and reversed text using Unicode characters. Copy and paste anywhere.",
    keywords: ["flip text", "upside down text", "reverse text", "backwards text"],
    ogTitle: "Flip Text Generator - Upside Down Text Online | ToolZoneX",
    ogDescription: "Flip text upside down or reverse it with Unicode characters. Free online text generator.",
    schemaName: "Flip Text Generator",
    schemaDescription: "Flip text upside down using Unicode characters or reverse it character by character.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
