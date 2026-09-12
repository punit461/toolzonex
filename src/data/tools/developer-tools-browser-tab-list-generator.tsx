import LanguageIcon from '@mui/icons-material/Language';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/browser-tab-list-generator",
    navName: "Browser Tab List Generator",
    navDescription: "Turn pasted tab URLs into an organized list by domain.",
    name: "Browser Tab List Generator",
    description: "Paste a list of URLs, one per line, and get each one labeled with its extracted domain name in an organized, shareable text list.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <LanguageIcon fontSize="large" color="primary"/>,
    seoTitle: "Browser Tab List Generator - Organize URLs by Domain",
    seoDescription: "Free browser tab list generator. Paste tab URLs and get an organized list labeled by domain, ready to save or share.",
    keywords: ["browser tab list generator", "save browser tabs as list", "tab url organizer", "url domain extractor", "browser session list"],
    ogTitle: "Browser Tab List Generator - Organize URLs by Domain | ToolZoneX",
    ogDescription: "Paste tab URLs and get an organized list labeled by domain.",
    schemaName: "Browser Tab List Generator",
    schemaDescription: "Paste a list of URLs, one per line, and get each one labeled with its extracted domain name in an organized, shareable text list.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What happens if a line isn't a valid URL?", answer: "It's shown labeled \"invalid URL\" instead of a domain, so you can spot and fix malformed entries in your pasted list." }, { question: "Do I need to include \"https://\" for every URL?", answer: "No — if a line is missing a protocol, the tool assumes \"https://\" automatically before extracting the domain, so plain addresses like \"example.com/page\" still work." }, { question: "Does this tool actually open or close browser tabs?", answer: "No — it only reformats a pasted list of URLs into an organized text list; it has no access to your actual browser tabs." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
