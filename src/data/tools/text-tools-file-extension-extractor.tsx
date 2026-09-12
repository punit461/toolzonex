import FindInPageIcon from '@mui/icons-material/FindInPage';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/file-extension-extractor",
    navName: "File Extension Extractor",
    navDescription: "Pull the extension out of a file name.",
    name: "File Extension Extractor",
    description: "Extract the extension from a file name or list of file names, correctly handling multi-dot names, with a summary count by extension.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FindInPageIcon fontSize="large" color="primary"/>,
    seoTitle: "File Extension Extractor - Extract Extensions from File Names",
    seoDescription: "Free online file extension extractor. Pull the extension out of any file name or list of file names, with a summary count by extension type.",
    keywords: ["file extension extractor", "extract file extension", "get file extension from name", "file extension parser", "list file extensions"],
    ogTitle: "File Extension Extractor - Extract Extensions from File Names | ToolZoneX",
    ogDescription: "Pull the extension out of any file name or list of file names.",
    schemaName: "File Extension Extractor",
    schemaDescription: "Extract the extension from a file name or list of file names, correctly handling multi-dot names, with a summary count by extension.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the File Extension Finder?", answer: "File Extension Finder looks up what an extension you already know MEANS — its file type and typical MIME type. This File Extension Extractor does the opposite: it PULLS the extension out of actual file names you provide, without explaining what that extension is used for." }, { question: "How are file names with multiple dots handled, like archive.tar.gz?", answer: "Only the text after the very last dot is treated as the extension, so archive.tar.gz correctly extracts \"gz\", not \"tar.gz\"." }, { question: "What happens if a file name has no dot at all?", answer: "It's shown as having no extension rather than causing an error, and it's grouped under \"(no extension)\" in the summary." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
