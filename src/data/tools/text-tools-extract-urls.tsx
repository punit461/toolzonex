import LinkIcon from '@mui/icons-material/Link';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/extract-urls",
    navName: "Extract URLs",
    navDescription: "Pull all links from text, live.",
    name: "Extract URLs from Text",
    description: "Extract every URL from any text or document, live as you type, displayed as clickable links with copy-all and download support.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <LinkIcon fontSize="large" color="primary"/>,
    seoTitle: "Extract URLs from Text - Free Online Link Extractor",
    seoDescription: "Extract every URL from any text or document, live as you type. Free online tool with clickable links, copy-all, and download support.",
    keywords: ["extract urls from text", "extract links from text", "find urls in text", "link extractor text tool"],
    ogTitle: "Extract URLs from Text - Free Online Link Extractor | ToolZoneX",
    ogDescription: "Extract every URL from any text or document, live as you type.",
    schemaName: "Extract URLs",
    schemaDescription: "Extract every URL from any text or document, live as you type, displayed as clickable links with copy-all and download support.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the URL Extractor under Tools?", answer: "This page lives under Text Tools and is built around a simpler, always-live workflow with no extract button — just paste and the list appears — aimed specifically at pulling links out of text or document content you're working with, rather than a general-purpose extraction utility." }, { question: "Does it remove duplicate URLs?", answer: "Yes — only unique URLs are listed, even if the same link appears multiple times in the text." }, { question: "Does it catch links without \"http://\"?", answer: "Yes — links starting with \"www.\" are also detected. When you click one, it opens with \"https://\" added automatically." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
