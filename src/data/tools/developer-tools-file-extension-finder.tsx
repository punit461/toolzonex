import DescriptionIcon from '@mui/icons-material/Description';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/file-extension-finder",
    navName: "File Extension Finder",
    navDescription: "Look up a file extension's type & MIME.",
    name: "File Extension Finder",
    description: "Look up a file extension to see its full type name, MIME type, and category from a curated list of common file extensions.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <DescriptionIcon fontSize="large" color="primary"/>,
    seoTitle: "File Extension Finder - Look Up File Type & MIME Type",
    seoDescription: "Free file extension finder. Type any file extension to instantly see its type name, MIME type, and category from a curated reference list.",
    keywords: ["file extension finder", "file extension lookup", "mime type finder", "what is this file extension", "file type lookup tool"],
    ogTitle: "File Extension Finder - Look Up File Type & MIME Type | ToolZoneX",
    ogDescription: "Look up any file extension to see its type name, MIME type, and category.",
    schemaName: "File Extension Finder",
    schemaDescription: "Look up a file extension to see its full type name, MIME type, and category from a curated list of common file extensions.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this tool inspect an actual file?", answer: "No — this is purely a name-based reference lookup against a curated list of extensions. If you want to identify a file by its actual byte content (which works even with the wrong or missing extension), use our File Type Identifier tool instead." }, { question: "What if my extension isn't listed?", answer: "The list covers around 80 of the most common file extensions. Very obscure or proprietary formats may not be included — a friendly \"not found\" message appears in that case." }, { question: "Can one extension have more than one possible file type?", answer: "In the real world, yes, occasionally — but this tool shows the single most common interpretation of each extension for simplicity." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
