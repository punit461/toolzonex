import HandshakeIcon from '@mui/icons-material/Handshake';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/apology-generator",
    navName: "Apology Generator",
    navDescription: "Generate a sincere, editable apology message.",
    name: "Apology Generator",
    description: "Choose a context and optionally describe what happened to generate a sincere, editable apology message you can copy and adjust before sending.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <HandshakeIcon fontSize="large" color="primary"/>,
    seoTitle: "Apology Generator - Write a Sincere Apology Message",
    seoDescription: "Free online apology generator. Choose a context and generate a sincere, editable apology message for personal or professional situations.",
    keywords: ["apology generator", "how to write an apology", "sincere apology message generator", "professional apology email generator", "apology text generator"],
    ogTitle: "Apology Generator - Write a Sincere Apology Message | ToolZoneX",
    ogDescription: "Choose a context and generate a sincere, editable apology message.",
    schemaName: "Apology Generator",
    schemaDescription: "Choose a context and optionally describe what happened to generate a sincere, editable apology message you can copy and adjust before sending.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Should I send the generated text exactly as-is?", answer: "It's best used as a starting draft — edit the text directly in the box to add your own voice and specific details before sending, since a truly sincere apology usually benefits from personal touches." }, { question: "Is this a joke or sarcastic apology generator?", answer: "No — this tool is intentionally designed to produce respectful, sincere-toned messages for genuine apologies, not humor or sarcasm." }, { question: "What if my situation doesn't fit neatly into one category?", answer: "Pick whichever context feels closest, then use the optional details field and direct editing to adjust the tone and specifics until it matches your actual situation." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
