import PersonAddIcon from '@mui/icons-material/PersonAdd';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/fake-name-generator",
    navName: "Fake Name Generator",
    navDescription: "Generate random fictional identities.",
    name: "Fake Name Generator - Generate Random Identities",
    description: "Generate random fictional identities with name, age, address, email, and phone number. Free online fake name generator.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <PersonAddIcon fontSize="large" color="primary"/>,
    seoTitle: "Fake Name Generator - Generate Random Identities Online",
    seoDescription: "Free online fake name generator. Click to create random fictional identities with name, age, address, email, and phone number.",
    keywords: ["fake name generator", "random name generator", "random identity generator", "fake person generator", "test data generator"],
    ogTitle: "Fake Name Generator - Generate Random Identities Online | ToolZoneX",
    ogDescription: "Generate random fictional identities with name, age, address, email, and phone number.",
    schemaName: "Fake Name Generator",
    schemaDescription: "Generate random fictional identities with name, age, address, email, and phone number.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Are these real people?", answer: "No — every identity is randomly generated from lists of common names and locations. None of the generated information corresponds to a real individual." }, { question: "Can I generate multiple identities at once?", answer: "Click the Generate button repeatedly to create as many identities as you need. Each click produces a fresh, independent result." }, { question: "Is the data statistically realistic?", answer: "The names are drawn from the most common American names, cities and states are real US locations, and zip codes are random 5-digit numbers." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
