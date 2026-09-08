import PhoneIcon from '@mui/icons-material/Phone';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/fake-phone-generator",
    navName: "Fake Phone Generator",
    navDescription: "Fictional phone numbers for testing.",
    name: "Fake Phone Generator",
    description: "Generate fictional, non-dialable phone numbers in US, UK, India, or generic international formats for testing and mock data.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <PhoneIcon fontSize="large" color="primary"/>,
    seoTitle: "Fake Phone Generator - Fictional Test Phone Numbers",
    seoDescription: "Free fake phone generator. Generate fictional, non-dialable phone numbers in US, UK, India, or international formats for software testing and mock data.",
    keywords: ["fake phone generator", "fake phone number generator", "fictional phone number generator", "test phone number generator", "random phone number for testing"],
    ogTitle: "Fake Phone Generator - Fictional Test Phone Numbers | ToolZoneX",
    ogDescription: "Generate fictional, non-dialable phone numbers for testing and mock data.",
    schemaName: "Fake Phone Generator",
    schemaDescription: "Generate fictional, non-dialable phone numbers in US, UK, India, or generic international formats for testing and mock data.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Are these real, dialable phone numbers?", answer: "No. They are generated for testing, mock-data, and development purposes only. The US format specifically uses the \"555\" central-office code, which NANPA has permanently reserved for fictional use precisely so that numbers like these can never be assigned to a real subscriber. Other formats use similarly non-issued patterns, but should still only be used for testing, not presented as real contact information." }, { question: "Why does the US format always use 555?", answer: "The North American Numbering Plan reserves the 555 exchange (555-0100 through 555-0199 specifically, though this generator uses the wider 555-XXXX range for variety) so that film, television, and software testing can use realistic-looking phone numbers without any risk of reaching or impersonating a real person's line." }, { question: "Can I generate more than 5 numbers at once?", answer: "Click Generate again for a fresh batch of 5 — each click produces a completely new, independent set of fictional numbers in your chosen format." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
