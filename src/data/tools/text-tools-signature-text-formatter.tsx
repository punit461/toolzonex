import BadgeIcon from '@mui/icons-material/Badge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/signature-text-formatter",
    navName: "Signature Text Formatter",
    navDescription: "Format a plain-text email signature block.",
    name: "Signature Text Formatter",
    description: "Generate a formatted plain-text email signature block from name, title, company, phone, email, and website, in a Compact or Full layout.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <BadgeIcon fontSize="large" color="primary"/>,
    seoTitle: "Signature Text Formatter - Plain-Text Email Signatures",
    seoDescription: "Free signature text formatter. Build a plain-text email signature block from your name, title, company, and contact info, in Compact or Full layout.",
    keywords: ["signature text formatter", "email signature generator", "plain text signature maker", "signature block generator", "email signature formatter"],
    ogTitle: "Signature Text Formatter - Plain-Text Email Signatures | ToolZoneX",
    ogDescription: "Build a formatted plain-text email signature block in seconds.",
    schemaName: "Signature Text Formatter",
    schemaDescription: "Generate a formatted plain-text email signature block from name, title, company, phone, email, and website, in a Compact or Full layout.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does this create an HTML signature with logos or images?", answer: "No — this tool generates plain text only. For a signature with logos, colors, or clickable links, you'll need to add that formatting separately inside your email client's signature editor." }, { question: "Do I have to fill in every field?", answer: "No — every field is optional. Any field left blank is automatically skipped, so the signature only includes the information you actually provide." }, { question: "What's the difference between Compact and Full styles?", answer: "Full puts every field on its own line for a traditional, spaced-out look. Compact condenses the same information onto fewer lines using separators, which works well for signatures with tighter space constraints." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
