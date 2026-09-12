import VpnKeyIcon from '@mui/icons-material/VpnKey';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/password-list-organizer",
    navName: "Password List Organizer",
    navDescription: "Reformat a pasted list into a sorted, aligned table.",
    name: "Password List Organizer",
    description: "Paste a delimited site/username/password list and view it as a neatly aligned table sorted alphabetically by site — session-only, nothing is saved or transmitted.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <VpnKeyIcon fontSize="large" color="primary"/>,
    seoTitle: "Password List Organizer - Sort & Format a Password List Online",
    seoDescription: "Paste a delimited site, username, password list and view it as a sorted, aligned table. Session-only formatting tool — nothing is saved or stored.",
    keywords: ["password list organizer", "sort password list", "format password list", "password list formatter", "password table viewer"],
    ogTitle: "Password List Organizer - Sort & Format a Password List Online | ToolZoneX",
    ogDescription: "Paste a delimited site, username, password list and view it as a sorted, aligned table.",
    schemaName: "Password List Organizer",
    schemaDescription: "Paste a delimited site/username/password list and view it as a neatly aligned table sorted alphabetically by site — session-only, nothing is saved or transmitted.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does this tool store or save my passwords anywhere?", answer: "No — absolutely nothing is saved. It doesn't write to local storage, cookies, a database, or any server; the parsed table exists only in this browser tab's memory and vanishes the moment you refresh or close the page." }, { question: "Is this safe to use for real passwords?", answer: "This tool only reformats text that stays on your device during the current session — it never transmits data anywhere. That said, it is not a substitute for a dedicated, encrypted password manager application, which is the appropriate tool for actually storing and securing your passwords." }, { question: "What if my list uses a different format than site, username, password?", answer: "The tool always reads the first field as the site name, the second as the username, and the third as the password, based on your chosen delimiter — reorder your source list to match this structure before pasting if it differs." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
