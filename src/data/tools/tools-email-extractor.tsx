import EmailIcon from '@mui/icons-material/Email';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/email-extractor",
    navName: "Email Extractor",
    navDescription: "Extract email addresses from any text.",
    name: "Email Extractor",
    description: "Extract all email addresses from any text. Free online tool to find and copy email addresses quickly.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <EmailIcon fontSize="large" color="primary"/>,
    seoTitle: "Email Extractor - Extract Emails from Text",
    seoDescription: "Extract all email addresses from any text. Free online email extractor tool to find and copy email addresses quickly.",
    keywords: ["email extractor", "extract emails", "find email addresses", "email finder", "copy emails", "email parser", "email scanner"],
    ogTitle: "Email Extractor - Extract Emails from Text | ToolZoneX",
    ogDescription: "Extract all email addresses from any text. Free online email extractor tool to find and copy email addresses quickly.",
    schemaName: "Email Extractor",
    schemaDescription: "Extract all email addresses from any text. Free online email extractor tool to find and copy email addresses quickly.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
