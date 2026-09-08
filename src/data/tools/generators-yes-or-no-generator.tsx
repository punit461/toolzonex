import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/yes-or-no-generator",
    navName: "Yes or No Generator",
    navDescription: "Random yes/no decision as a coin flip.",
    name: "Yes or No Generator",
    description: "Get a random yes or no answer to any question. Free online yes or no generator with a fun results history.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CheckCircleIcon fontSize="large" color="primary"/>,
    seoTitle: "Yes or No Generator - Random Yes No Decision",
    seoDescription: "Free online yes or no generator. Ask a question, click, and get a random YES or NO answer instantly. Includes occasional MAYBE and a results history.",
    keywords: ["yes or no generator", "yes no generator", "random yes or no", "yes or no wheel", "yes no picker", "decision maker"],
    ogTitle: "Yes or No Generator - Random Answer | ToolZoneX",
    ogDescription: "Get a random yes or no answer to any question with one click.",
    schemaName: "Yes or No Generator",
    schemaDescription: "Generate a random yes or no answer to a question.",
    applicationCategory: "EntertainmentApplication",
    currency: "INR",
    faqs: [{ question: "Is the result truly random?", answer: "Yes — each result uses the browser's random number generator with an equal 50/50 chance of YES or NO, plus a small chance of MAYBE for fun. There is no pattern or bias." }, { question: "Can I use it for important decisions?", answer: "It is meant for low-stakes dilemmas and fun — which movie to watch, what to eat, or settling a coin flip. Treat it as a tie-breaker, not financial or medical advice." }, { question: "What is the MAYBE result?", answer: "About 5% of the time the generator returns MAYBE, inspired by classic magic-8-ball style answers. Re-roll for a definite yes or no if you prefer." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
