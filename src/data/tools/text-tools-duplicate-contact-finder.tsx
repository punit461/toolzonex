import FindReplaceIcon from '@mui/icons-material/FindReplace';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/duplicate-contact-finder",
    navName: "Duplicate Contact Finder",
    navDescription: "Flag contacts sharing the same phone or email.",
    name: "Duplicate Contact Finder - Match by Phone or Email",
    description: "Paste a list of contacts and find likely duplicates that share the same phone number or email address, even when names differ.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FindReplaceIcon fontSize="large" color="primary"/>,
    seoTitle: "Duplicate Contact Finder - Match by Phone or Email",
    seoDescription: "Free duplicate contact finder. Paste a contact list and flag entries sharing the same phone number or email address.",
    keywords: ["duplicate contact finder", "find duplicate contacts", "merge duplicate contacts", "contact list deduplication", "duplicate phone number finder"],
    ogTitle: "Duplicate Contact Finder - Match by Phone or Email | ToolZoneX",
    ogDescription: "Find likely duplicate contacts sharing the same phone number or email.",
    schemaName: "Duplicate Contact Finder",
    schemaDescription: "Paste a list of contacts and find likely duplicates that share the same phone number or email address, even when names differ.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does the tool catch duplicates with different name spellings?", answer: "Yes — matching is based only on phone number and email address, not on the name, so \"Sara Lee\" and \"Sarah Lee\" sharing the same email will still be flagged as a likely duplicate." }, { question: "How are phone numbers compared?", answer: "All non-digit characters (spaces, dashes, dots, parentheses) are stripped before comparing, so \"555-123-4567\" and \"(555) 123-4567\" are correctly treated as the same number." }, { question: "Is my contact list uploaded or saved anywhere?", answer: "No — everything is processed entirely in your browser using client-side JavaScript, and nothing is sent to a server or saved beyond the current page session." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
