import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/extract-email-addresses",
    navName: "Extract Email Addresses",
    navDescription: "Pull all emails from text, live.",
    name: "Extract Email Addresses from Text",
    description: "Extract every email address from any text or document, live as you type, with copy-all and download support.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <AlternateEmailIcon fontSize="large" color="primary"/>,
    seoTitle: "Extract Email Addresses from Text - Free Online Tool",
    seoDescription: "Extract every email address from any text or document, live as you type. Free online tool with copy-all and download support.",
    keywords: ["extract email addresses from text", "extract emails from text", "find emails in text", "email extractor text tool"],
    ogTitle: "Extract Email Addresses from Text - Free Online Tool | ToolZoneX",
    ogDescription: "Extract every email address from any text or document, live as you type.",
    schemaName: "Extract Email Addresses",
    schemaDescription: "Extract every email address from any text or document, live as you type, with copy-all and download support.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Email Extractor under Tools?", answer: "This page lives under Text Tools and uses a simpler, always-live layout with no extract button — the list appears as soon as you paste — focused specifically on pulling emails out of text or document content you're working with." }, { question: "Does it validate that the emails are real?", answer: "No — it extracts anything matching a valid email address pattern from the text; it doesn't check whether the address actually exists or can receive mail." }, { question: "Does it remove duplicate email addresses?", answer: "Yes — only unique addresses are listed, even if the same email appears multiple times in the pasted text." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
