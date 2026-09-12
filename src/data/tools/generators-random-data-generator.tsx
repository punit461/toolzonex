import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-data-generator",
    navName: "Random Data",
    navDescription: "Generate fake names & addresses.",
    name: "Random Data Generator",
    description: "Generate fake names, addresses, emails, and phone numbers for testing and mockups. Free online mock data generator.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Data Generator - Fake Name & Address Maker Online",
    seoDescription: "Generate fake names, addresses, emails, and phone numbers for testing and mockups. Free online mock data generator.",
    keywords: ["random data generator", "fake name generator", "mock data generator", "fake address generator", "test data generator"],
    ogTitle: "Random Data Generator - Fake Name & Address Maker Online | ToolZoneX",
    ogDescription: "Generate fake names, addresses, emails, and phone numbers for testing and mockups.",
    schemaName: "Random Data Generator",
    schemaDescription: "Generate fake names, addresses, emails, and phone numbers for testing and mockups.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
