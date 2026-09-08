import FindInPageIcon from '@mui/icons-material/FindInPage';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/file-type-identifier",
    navName: "File Type Identifier",
    navDescription: "Detect real file type from its bytes.",
    name: "File Type Identifier",
    description: "Detect a file's real type by reading its first bytes and matching against known magic-number signatures, entirely in your browser.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <FindInPageIcon fontSize="large" color="primary"/>,
    seoTitle: "File Type Identifier - Detect File Type by Byte Signature",
    seoDescription: "Free file type identifier. Upload a file and detect its real type from its byte signature (magic number), even if the extension is wrong or missing.",
    keywords: ["file type identifier", "file signature detector", "magic number file type", "detect file type online", "identify file type from bytes"],
    ogTitle: "File Type Identifier - Detect File Type by Byte Signature | ToolZoneX",
    ogDescription: "Detect a file's real type from its byte signature, entirely in your browser.",
    schemaName: "File Type Identifier",
    schemaDescription: "Detect a file's real type by reading its first bytes and matching against known magic-number signatures, entirely in your browser.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the File Extension Finder?", answer: "The File Extension Finder is a static name-to-type lookup table — you type an extension like \".docx\" and get its description. This File Type Identifier actually inspects the real bytes of an uploaded file, so it works correctly even when the extension is wrong, missing, or was deliberately changed." }, { question: "Is my file uploaded anywhere?", answer: "No — the file is read entirely client-side in your browser using the FileReader API. Nothing is sent to a server at any point." }, { question: "Why did my file show \"no known signature matched\"?", answer: "Some file types (like plain text, CSV, or certain proprietary formats) don't start with a distinctive byte pattern, or use a signature not included in this tool's reference table." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
