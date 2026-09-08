import LinkIcon from '@mui/icons-material/Link';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/url-extractor",
    navName: "URL Extractor",
    navDescription: "Extract URLs and links from any text.",
    name: "URL Extractor",
    description: "Extract all URLs and links from text. Find and copy all hyperlinks instantly.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <LinkIcon fontSize="large" color="primary"/>,
    seoTitle: "URL Extractor - Extract Links from Text",
    seoDescription: "Extract all URLs from any text. Free online URL extractor tool to find, copy, and open links quickly.",
    keywords: ["URL extractor", "extract links", "find URLs", "link extractor", "URL finder", "copy links", "URL parser", "link scanner"],
    ogTitle: "URL Extractor - Extract Links from Text | ToolZoneX",
    ogDescription: "Extract all URLs from any text. Free online URL extractor tool to find, copy, and open links quickly.",
    schemaName: "URL Extractor",
    schemaDescription: "Extract all URLs from any text. Free online URL extractor tool to find, copy, and open links quickly.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
