import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/fake-address-generator",
    navName: "Fake Address Generator",
    navDescription: "Generate random US addresses.",
    name: "Fake Address Generator",
    description: "Generate realistic-looking but fictitious US addresses instantly. Free online fake address generator.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <HomeRepairServiceIcon fontSize="large" color="primary"/>,
    seoTitle: "Fake Address Generator - Random US Address Generator",
    seoDescription: "Free online fake address generator. Create realistic-looking fictitious US addresses with street, city, state, and zip.",
    keywords: ["fake address generator", "random address generator", "address generator", "random us address", "mock address", "test address generator"],
    ogTitle: "Fake Address Generator - Random US Address | ToolZoneX",
    ogDescription: "Generate realistic-looking but fictitious US addresses instantly.",
    schemaName: "Fake Address Generator",
    schemaDescription: "Generate realistic-looking but fictitious US addresses instantly.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
