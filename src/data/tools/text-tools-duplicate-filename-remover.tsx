import FindReplaceIcon from '@mui/icons-material/FindReplace';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/duplicate-filename-remover",
    navName: "Duplicate Filename Remover",
    navDescription: "Auto-rename duplicate filenames with numbered suffixes.",
    name: "Duplicate Filename Remover",
    description: "Paste a list of filenames and automatically resolve duplicates by appending a numbered suffix like \" (1)\" to repeated occurrences, preserving each file's extension.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FindReplaceIcon fontSize="large" color="primary"/>,
    seoTitle: "Duplicate Filename Remover - Auto-Resolve Repeated Names",
    seoDescription: "Free duplicate filename remover. Paste a filename list and automatically resolve duplicates with numbered suffixes while preserving extensions.",
    keywords: ["duplicate filename remover", "resolve duplicate filenames", "rename duplicate files", "filename suffix generator", "duplicate file rename tool"],
    ogTitle: "Duplicate Filename Remover - Auto-Resolve Repeated Names | ToolZoneX",
    ogDescription: "Automatically resolve duplicate filenames with numbered suffixes.",
    schemaName: "Duplicate Filename Remover",
    schemaDescription: "Paste a list of filenames and automatically resolve duplicates by appending a numbered suffix like \" (1)\" to repeated occurrences, preserving each file's extension.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Duplicate File Name Checker?", answer: "The Duplicate File Name Checker only identifies and flags which filenames are duplicated, without changing anything. This tool actually resolves the duplicates by renaming each repeated occurrence with a numbered suffix, giving you a ready-to-use, all-unique list." }, { question: "Does it rename the first occurrence of a repeated name?", answer: "No — the first occurrence always keeps its original name; only the second, third, and later occurrences get a numbered suffix appended." }, { question: "What happens with a file that has no extension, like a folder name?", answer: "The numbered suffix is simply appended to the end of the name — since there's no extension to preserve, nothing special happens with the dot placement." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
