import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/fake-company-generator",
    navName: "Fake Company Generator",
    navDescription: "Random fictional company names.",
    name: "Fake Company Generator",
    description: "Generate random, fictional company names by combining prefix and suffix word lists, for testing and mockups.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <BusinessCenterIcon fontSize="large" color="primary"/>,
    seoTitle: "Fake Company Generator - Random Fictional Company Names",
    seoDescription: "Free fake company generator. Generate random, fictional company names for software testing, mockups, and demo data.",
    keywords: ["fake company generator", "fake company name generator", "random company name generator", "fictional business name generator", "test company name generator"],
    ogTitle: "Fake Company Generator - Random Fictional Company Names | ToolZoneX",
    ogDescription: "Generate random, fictional company names for testing and mockups.",
    schemaName: "Fake Company Generator",
    schemaDescription: "Generate random, fictional company names by combining prefix and suffix word lists.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Are these real companies?", answer: "No — every name is a random combination of generic prefix and suffix words chosen purely for how plausible they sound. Any resemblance to a real, existing company is coincidental, and names should not be used to imply an endorsement or affiliation with any real business." }, { question: "Can I use a generated name for my actual business?", answer: "You're free to use one as inspiration, but always check trademark databases and domain availability before adopting any name for a real company — this tool doesn't check for existing businesses with the same or similar name." }, { question: "How many unique combinations are possible?", answer: "With roughly 30 prefixes and 14 suffixes, there are several hundred possible combinations, so repeated clicks will occasionally repeat a name, especially after generating many batches." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
