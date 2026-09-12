import LinkIcon from '@mui/icons-material/Link';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/slug-generator",
    navName: "Slug Generator",
    navDescription: "Create URL-friendly slugs from text.",
    name: "Slug Generator",
    description: "Convert any text into a clean, URL-friendly slug instantly. Free online slug generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <LinkIcon fontSize="large" color="primary"/>,
    seoTitle: "Slug Generator - Create URL Friendly Slugs Online",
    seoDescription: "Free online slug generator. Type or paste text and instantly get a clean, lowercase, hyphen-separated URL slug.",
    keywords: ["slug generator", "url slug generator", "seo slug generator", "make slug from text", "url friendly text"],
    ogTitle: "Slug Generator - Create URL Friendly Slugs | ToolZoneX",
    ogDescription: "Convert any text into a clean, URL-friendly slug instantly.",
    schemaName: "Slug Generator",
    schemaDescription: "Convert any text into a clean, URL-friendly slug instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
