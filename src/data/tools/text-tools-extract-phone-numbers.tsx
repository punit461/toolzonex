import CallIcon from '@mui/icons-material/Call';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/extract-phone-numbers",
    navName: "Extract Phone Numbers",
    navDescription: "Pull phone numbers out of text.",
    name: "Extract Phone Numbers",
    description: "Extract phone numbers from any text, email, or document. Free online phone number extractor with copy support.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <CallIcon fontSize="large" color="primary"/>,
    seoTitle: "Extract Phone Numbers from Text - Online Extractor",
    seoDescription: "Free online phone number extractor. Paste text with US/international phone numbers and get a clean, deduplicated list with count and copy support.",
    keywords: ["extract phone numbers", "phone number extractor", "pull phone numbers from text", "extract numbers from text", "find phone numbers in text", "phone regex extractor"],
    ogTitle: "Extract Phone Numbers - Clean List | ToolZoneX",
    ogDescription: "Pull every phone number out of pasted text into a clean, copyable list.",
    schemaName: "Extract Phone Numbers",
    schemaDescription: "Extract phone numbers from text into a clean list.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What number formats does it find?", answer: "Common US and international formats: +1 555 123 4567, (555) 123-4567, 555-123-4567, and 555.123.4567. Formats with country codes and extensions are supported." }, { question: "Does it remove duplicates?", answer: "Yes — identical numbers are collapsed to one entry, and the count reflects the unique numbers found. Toggle off dedupe if you want every occurrence." }, { question: "What can I use it for?", answer: "Cleaning CRM imports, auditing marketing lists, checking a document for contact details, and validating that numbers in data are extractable before migration." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
