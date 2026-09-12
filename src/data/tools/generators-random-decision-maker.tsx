import CasinoIcon from '@mui/icons-material/Casino';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-decision-maker",
    navName: "Random Decision Maker",
    navDescription: "Pick a random option, or Yes/No.",
    name: "Random Decision Maker",
    description: "List your options and let this tool pick one at random, or leave it blank for a quick Yes/No decision.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CasinoIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Decision Maker - Free Yes/No & List Picker Tool",
    seoDescription: "Can't decide? List your options and let this free tool pick one at random, or leave it blank for a quick Yes/No decision. Session history included.",
    keywords: ["random decision maker", "decision maker tool", "yes or no generator", "random choice picker", "cant decide tool"],
    ogTitle: "Random Decision Maker - Free Yes/No & List Picker Tool | ToolZoneX",
    ogDescription: "List your options and let this tool pick one at random.",
    schemaName: "Random Decision Maker",
    schemaDescription: "List your options and let this tool pick one at random, or leave it blank for a quick Yes/No decision.",
    applicationCategory: "EntertainmentApplication",
    currency: "INR",
    faqs: [{ question: "Is the decision truly random?", answer: "Yes — every option in your list has an equal chance of being picked, using your browser's random number generator to make the selection." }, { question: "Does it remember my past decisions after I close the page?", answer: "No — the recent decisions list is kept only for your current session in the browser tab. Refreshing or closing the page clears it; nothing is saved or sent to a server." }, { question: "What happens if I don't enter any options?", answer: "The tool automatically falls back to a simple Yes/No decision mode, so you can use it as a quick coin flip alternative without typing anything first." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
