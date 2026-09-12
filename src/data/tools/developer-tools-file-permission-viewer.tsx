import TerminalIcon from '@mui/icons-material/Terminal';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/file-permission-viewer",
    navName: "File Permission Viewer",
    navDescription: "Parse and explain a Unix ls -l permission string.",
    name: "File Permission Viewer",
    description: "Parse a Unix-style permission string (like from ls -l output) and explain the file type and read/write/execute permissions in plain English, plus the octal equivalent.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <TerminalIcon fontSize="large" color="primary"/>,
    seoTitle: "File Permission Viewer - Explain Unix ls -l Permissions",
    seoDescription: "Free file permission viewer. Paste a Unix ls -l permission string and get a plain-English breakdown plus the numeric equivalent.",
    keywords: ["file permission viewer", "unix permission checker", "ls -l permissions explained", "parse file permissions online", "permission string decoder"],
    ogTitle: "File Permission Viewer - Explain Unix ls -l Permissions | ToolZoneX",
    ogDescription: "Parse a Unix-style permission string and explain it in plain English, plus the octal equivalent.",
    schemaName: "File Permission Viewer",
    schemaDescription: "Parse a Unix-style permission string (like from ls -l output) and explain the file type and read/write/execute permissions in plain English, plus the octal equivalent.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the CHMOD Generator?", answer: "Our CHMOD Generator converts between numeric, symbolic, and checkbox representations for SETTING permissions you want to apply to a file. This File Permission Viewer does the reverse — it PARSES AND EXPLAINS a permission string you already encountered (for example, copied from real ls -l output), including the leading file-type character, which the CHMOD Generator doesn't cover at all." }, { question: "What does the leading character before the permissions mean?", answer: "It identifies the file type: a dash for a regular file, d for a directory, l for a symbolic link, and less common types like c (character device), b (block device), p (named pipe), and s (socket)." }, { question: "What do lowercase or uppercase s and t in the execute position mean?", answer: "Those represent special permission bits layered on top of execute: a lowercase s or t means the special bit (setuid, setgid, or sticky) is set AND the execute bit is also set, while an uppercase S or T means the special bit is set but execute is NOT set for that category." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
