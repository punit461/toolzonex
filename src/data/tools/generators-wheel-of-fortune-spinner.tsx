import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/wheel-of-fortune-spinner",
    navName: "Wheel of Fortune",
    navDescription: "Spin wheel decision maker.",
    name: "Wheel of Fortune Spinner - Random Decision Maker",
    description: "Create a custom spinning wheel to randomly pick names, prizes, or make decisions. Free online random wheel spinner.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ChangeHistoryIcon fontSize="large" color="primary"/>,
    seoTitle: "Wheel of Fortune Spinner - Random Decision Maker Online",
    seoDescription: "Create a custom spinning wheel to randomly pick names, prizes, or make decisions. Free online random wheel spinner.",
    keywords: ["wheel of fortune", "spinning wheel generator", "random decision maker", "picker wheel", "random name picker", "wheel of fortune wheel generator", "wheel of fortune picker", "spin the wheel generator", "random wheel picker", "custom spinning wheel maker"],
    ogTitle: "Wheel of Fortune Spinner - Random Decision Maker Online | ToolZoneX",
    ogDescription: "Create a custom spinning wheel to randomly pick names, prizes, or make decisions.",
    schemaName: "Wheel of Fortune Spinner",
    schemaDescription: "Create a custom spinning wheel to randomly pick names, prizes, or make decisions.",
    applicationCategory: "EntertainmentApplication",
    currency: "INR",
    faqs: [{ question: "Is the spin result truly random?", answer: "Yes — the wheel lands on a random segment each spin, giving every option an equal chance proportional to its slice size." }, { question: "Is this a wheel of fortune generator or a picker wheel?", answer: "Both — you generate a custom wheel from your own list of options, and each spin acts as a random picker that selects one entry from that wheel. Use it to build a wheel for names, prizes, decisions, or anything else you need to pick at random." }, { question: "How many options can I add to the wheel?", answer: "Up to 24 items, with a minimum of 2 needed to spin. Each item becomes an equally-sized slice unless you add more or fewer entries, which resizes the slices automatically." }, { question: "Can I save or share my wheel?", answer: "The wheel is built entirely in your browser for the current session — add your list, spin as many times as you like, and remove or edit entries between spins." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
