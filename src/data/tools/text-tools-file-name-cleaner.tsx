import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/file-name-cleaner",
    navName: "File Name Cleaner",
    navDescription: "Sanitize messy file names into safe, clean ones.",
    name: "File Name Cleaner",
    description: "Sanitize a file name or a list of file names by stripping invalid characters, replacing spaces, trimming stray dots/spaces, and optionally lowercasing.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <CleaningServicesIcon fontSize="large" color="primary"/>,
    seoTitle: "File Name Cleaner - Sanitize Messy File Names Online",
    seoDescription: "Sanitize a file name or a list of file names by stripping invalid characters and replacing spaces. Free online file name cleaner.",
    keywords: ["file name cleaner", "sanitize file name", "clean file names", "remove invalid characters filename", "file name sanitizer"],
    ogTitle: "File Name Cleaner - Sanitize Messy File Names Online | ToolZoneX",
    ogDescription: "Sanitize a file name or a list of file names by stripping invalid characters and replacing spaces.",
    schemaName: "File Name Cleaner",
    schemaDescription: "Sanitize a file name or a list of file names by stripping invalid characters, replacing spaces, trimming stray dots/spaces, and optionally lowercasing.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Which characters get removed?", answer: "The characters that are invalid or problematic on common operating systems: < > : \" / \\ | ? *. These are stripped out entirely rather than replaced, since there's no universally safe substitute for most of them." }, { question: "Does this rename the actual file?", answer: "No — this tool only generates a cleaned version of the text you provide; you still need to rename the actual file yourself using the cleaned name it outputs." }, { question: "What happens to the file extension?", answer: "The extension is treated as part of the name and cleaned the same way as the rest — if you use the lowercase toggle, the extension is lowercased too, which is usually desirable for consistency." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
