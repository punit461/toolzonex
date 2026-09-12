import CasinoIcon from '@mui/icons-material/Casino';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/lucky-number-calculator",
    navName: "Lucky Number Calculator",
    navDescription: "Life path, name & personality numbers.",
    name: "Lucky Number Calculator",
    description: "Calculate your numerology life path, name, and personality numbers from your birth date and full name.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CasinoIcon fontSize="large" color="primary"/>,
    seoTitle: "Lucky Number Calculator - Numerology Life Path & Name Numbers",
    seoDescription: "Free lucky number calculator. Discover your numerology life path, expression, and personality numbers from your birth date and name, with meanings for each number.",
    keywords: ["lucky number calculator", "numerology calculator", "life path number", "name number", "expression number", "personality number"],
    ogTitle: "Lucky Number Calculator - Numerology Numbers | ToolZoneX",
    ogDescription: "Calculate your life path, name, and personality numbers with meanings.",
    schemaName: "Lucky Number Calculator",
    schemaDescription: "Calculate numerology life path, name, and personality numbers.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is a master number?", answer: "Master numbers 11 and 22 are not reduced further in numerology because they are thought to carry heightened spiritual potential. 11 represents intuition and inspiration, while 22 represents manifesting grand visions." }, { question: "Is numerology scientific?", answer: "Numerology is a belief system, not a science. It is best treated as a fun, introspective tool rather than a source of factual predictions." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
