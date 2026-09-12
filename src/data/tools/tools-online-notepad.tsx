import NoteAltIcon from '@mui/icons-material/NoteAlt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/online-notepad",
    navName: "Online Notepad",
    navDescription: "Free notepad with auto-save & word count.",
    name: "Online Notepad",
    description: "A free, secure online notepad with auto-save. Take quick notes, count words, and download as text.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <NoteAltIcon fontSize="large" color="primary"/>,
    seoTitle: "Online Notepad - Simple Text Editor",
    seoDescription: "Free online notepad for quick text editing and note-taking. Simple browser-based text editor with save and download functionality.",
    keywords: ["online notepad", "text editor", "note taking", "online text editor", "simple notepad", "web notepad", "text editor online", "quick notes"],
    ogTitle: "Online Notepad - Simple Text Editor | ToolZoneX",
    ogDescription: "Free online notepad for quick text editing and note-taking. Simple browser-based text editor with save and download functionality.",
    schemaName: "Online Notepad",
    schemaDescription: "Free online notepad for quick text editing and note-taking. Simple browser-based text editor with save and download functionality.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
