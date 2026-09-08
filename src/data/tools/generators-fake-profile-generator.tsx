import BadgeIcon from '@mui/icons-material/Badge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/fake-profile-generator",
    navName: "Fake Profile Generator",
    navDescription: "Fictional test profiles for mockups.",
    name: "Fake Profile Generator - Fictional Test Data",
    description: "Generate an entirely fictional profile with a made-up name, age, email, and address for software testing and UI mockups only.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <BadgeIcon fontSize="large" color="primary"/>,
    seoTitle: "Fake Profile Generator - Fictional Test Data Only",
    seoDescription: "Generate an entirely fictional profile with a made-up name, age, email, and address for software testing and UI mockups. Not real personal data.",
    keywords: ["fake profile generator", "fictional test data generator", "fake data generator for testing", "mock profile generator"],
    ogTitle: "Fake Profile Generator - Fictional Test Data Only | ToolZoneX",
    ogDescription: "Generate an entirely fictional profile for software testing and UI mockups. Not real personal data.",
    schemaName: "Fake Profile Generator",
    schemaDescription: "Generate an entirely fictional profile with a made-up name, age, email, and address for software testing and UI mockups only.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is this real information about a real person?", answer: "No. Every name, email, and address is randomly assembled from generic placeholder word lists purely for testing and mockup purposes. It does not describe any actual person." }, { question: "Can I use this data for anything besides testing?", answer: "This tool is built specifically for software testing, UI mockups, and design prototypes. It should not be used to impersonate anyone or misrepresent fictional data as real information." }, { question: "Will the fictional email actually receive mail?", answer: "No — the domains used (like example.test) are reserved placeholder domains set aside so they can never be registered or used for real email delivery." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
